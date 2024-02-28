var U;
var count2=0;
var scene_width = $(window).width();
var scene_height = $(window).height();
$("#StartScreen").width(scene_width);
$("#StartScreen").height(scene_height);
$("#wrapper").width(scene_width);
$("#wrapper").height(scene_height);

var __ENVIRONMENT__ = defineSpace("canvas1", scene_width, scene_heightx);

/****************************************** USER **********************************************************/
function user(username, password){
	var d = this;
	this.username = username||$('#username')[0].value||default_username;// only for development
	this.password = password||$('#password')[0].value||default_password;
	
	$.post('/getUser', {'username':this.username, 'password':this.password}, function(response){
		if(response === ""){
			$("#message").html("User doesn't exist or password wrong.");
			setTimeout(function() { $("#message").html(""); }, 1500);
			U = null;
		}
		else{
			$( "body" ).pagecontainer( "change", "#homepage" );
			d.id = response.id;
			d.name = response.name;
			d.bestscore = response.bestscore;
			
			if (d.bestscore>0){
				$("#myscore").html("My Best Score: "+ Math.round(1000-(d.bestscore/3600/1000/max_batt*1000))/10 + "%");
			}
			else{
				$("#myscore").html("My Best Score: --%");
			}
			drawLandscape();
		}
	});
}

/****************************************** GAME **********************************************************/
var scene = function(){
	__ENVIRONMENT__.call(this);

	var space = this.space;
	var boxOffset;
	space.iterations = 10;
	space.gravity = v(0, -400);
	space.sleepTimeThreshold = 100;
	
	
	this.addFloor(data, scene_widthx, xstep);
	this.addTerminal(scene_widthx-3*xstep);
	//for (var i=0; i<stationPosX.length; i++){this.addStation(stationPosX[i],0);}
	
	
	$('#canvasbg')[0].width = scene_width;
	$('#canvasbg')[0].height = 40;
	
	var addBar = function(pos)
	{
		var mass = 1/m2m; // 1kg
		var a = v(0,  10);
		var b = v(0, -10);
		
		var body = space.addBody(new cp.Body(mass, cp.momentForSegment(mass, a, b)));
		body.setPos(v.add(pos, boxOffset));
		
		var shape = space.addShape(new cp.SegmentShape(body, a, b, 1));
		shape.setElasticity(0);
		shape.setFriction(0.7);
		shape.group = 1; // use a group to keep the car parts from colliding
		return body;
	};

	var addWheel = function(pos)
	{
		var radius = 12;
		var mass = 20/m2m; // 20kg
		var body = space.addBody(new cp.Body(mass, cp.momentForCircle(mass, 0, radius, v(0,0))));
		body.setPos(v.add(pos, boxOffset));
		
		var shape = space.addShape(new cp.CircleShape(body, radius, v(0,0)));
		shape.setElasticity(0);
		shape.setFriction(1e1);
		shape.group = 1; // use a group to keep the car parts from colliding
		
		return body;
	};
	
	var addChassis = function(pos)
	{
		var mass = 1500/m2m; // 1500 kg 
		var width = 4/px2m; // --> 3.5m length
		var height = 1.8/px2m; // --> 1.0m height
		
		var body = space.addBody(new cp.Body(mass, cp.momentForBox(mass, width, height)));
		body.setPos(v.add(pos, boxOffset));
		
		var shape = space.addShape(new cp.BoxShape(body, width, height, v(0,0)));
		shape.setElasticity(0);
		shape.setFriction(0.7);
		shape.group = 1; // use a group to keep the car parts from colliding
		
		return body;
	};
	
	var posA = v( 50, 0);
	var posB = v(110, 0);
	boxOffset = v(100, 10);
	var POS_A = function() { return v.add(boxOffset, posA); };
	var POS_B = function() { return v.add(boxOffset, posB); };
	
	chassis = addChassis(v(80, 10));	
	motorbar1 = addBar(posA);
	motorbar2 = addBar(posB);
	motorbar3 = addBar(posA);
	motorbar4 = addBar(posB);
	wheel1 = addWheel(posA);
	wheel2 = addWheel(posB);
	
	joint1 = new cp.GrooveJoint(chassis, wheel1, v(-30, -10), v(-30, -20), v(0,0));
	joint2 = new cp.GrooveJoint(chassis, wheel2, v( 30, -10), v( 30, -20), v(0,0));
	space.addConstraint(joint1);
	space.addConstraint(joint2);
	space.addConstraint(new cp.DampedSpring(chassis, wheel1, v(-30, 0), v(0,0), 20, 10, 5)); // stiffness f/dx, damping f/v
	space.addConstraint(new cp.DampedSpring(chassis, wheel2, v( 30, 0), v(0,0), 20, 10, 5));
	space.addConstraint(new cp.PivotJoint(motorbar1, wheel1, POS_A()));
	space.addConstraint(new cp.PivotJoint(motorbar2, wheel2, POS_B()));
	space.addConstraint(new cp.PivotJoint(motorbar3, wheel1, POS_A()));
	space.addConstraint(new cp.PivotJoint(motorbar4, wheel2, POS_B()));
	motor1 = new cp.SimpleMotor(motorbar1, wheel1, 0);
	motor2 = new cp.SimpleMotor(motorbar2, wheel2, 0);
	space.addConstraint(motor1);
	space.addConstraint(motor2);
	
	// parameters
	max_rate1 = 1e7; // motor 1 rate
	max_rate2 = 1e7; // motor 2 rate
	acc_rate = 1e7; // instant rate increment
	w_limit_rate = 1;
	
	Jw1 = wheel1.i;
	Jw2 = wheel2.i;
	
	wheel1moment = 1e10;
	wheel2moment = 1e10;
	
	wheel1.setMoment(wheel1moment);
	wheel2.setMoment(wheel2moment);
	
	// limits
	speed_limit = 9200*pi/30/fr*(wheel1.shapeList[0].r)*t2t; // Max motor speed is 9000 but 9200 gives better results.
	wheel1.v_limit = speed_limit;
	wheel1.v_limit = speed_limit;
	wheel1.w_limit = speed_limit/wheel1.shapeList[0].r*1.5; // This 1.5 has to be here! (experimental)
	wheel2.w_limit = speed_limit/wheel1.shapeList[0].r*1.5; // (experimental)
	motorbar1.w_limit = wheel1.w_limit;
	motorbar2.w_limit = wheel2.w_limit;
};

scene.prototype = Object.create(__ENVIRONMENT__.prototype);

scene.prototype.update = function (dt) {
    var steps = 1;
    dt = dt / steps;
    for (var i = 0; i < steps; i++) {
        this.space.step(dt);
    }
    
    cTime = Math.floor(counter/tstep);
    car_pos = Math.round(chassis.p.x*px2m); //-9.03
    car_pos9 = car_pos-9;
    vehSpeed = Math.round(Math.sqrt(Math.pow(chassis.vx,2)+Math.pow(chassis.vy,2))*px2m*2.23694);
    $("#timer").html(timeout-cTime);
    
    if(chassis.p.y<0){
    	demo.stop();
    	start_race = 0;
    	messagebox("Oops...",false);
    }
    if(start_race == 1){
    	$("#speedval").html("Speed: "+vehSpeed + 'mph');
    	if(acc_sig && !battempty){
        	$("#effval").html("Motor Efficiency: "+Math.round(motor2eff*100)+'%');
    	}
    	else{
        	$("#effval").html("Motor Efficiency: "+'--%');
    	}
        counter+=1;
        ////// Save Results /////////////
        if (car_pos >= car_posOld+10){
			car_posOld = car_pos;
			save_x.push(car_pos);
			save_v.push(vehSpeed);
			save_eff.push(Math.round(motor2eff*100));

		}
							
			
	    //////////// Success ////////////
        
	    if (car_pos>=maxdist){
			motor1.rate = 0;
			motor2.rate = 0;
			wheel1.setAngVel(0);
			wheel2.setAngVel(0);
			//wheel1.v_limit = Infinity;
			//wheel2.v_limit = Infinity;
			wheel1.setMoment(1e10);
			wheel2.setMoment(1e10);
			brake_sig = false;
			acc_sig = false;
	    	//$('#runner').runner('stop');
	    	start_race = 0;
	    	if (!battempty){
	    		messagebox("Congratulations!",true);
	    	}
	    	else{
	    		messagebox("Good job but try to save battery!",false);
	    	}
	    }
	    /////////////////////////////////

	    ///// Fail Check ////////////////
	    if ((chassis.p.x<10)){
	    	demo.stop();
	    	//$('#runner').runner('stop');
	    	start_race = 0;
	    	messagebox("Can't go back! Please restart.",false);
	    }
	    if (cTime>timeout){
			motor1.rate = 0;
			motor2.rate = 0;
			wheel1.setAngVel(0);
			wheel2.setAngVel(0);
			//wheel1.v_limit = Infinity;
			//wheel2.v_limit = Infinity;
			wheel1.setMoment(1e10);
			wheel2.setMoment(1e10);
			brake_sig = false;
			acc_sig = false;
	    	//$('#runner').runner('stop');
	    	start_race = 0;
	    	messagebox("Time out! Please restart.",false);
	    }
	    if (chassis.rot.x < 0){
	    	//$('#runner').runner('stop');
	    	start_race = 0;
	    	messagebox("The driver is too drunk!",false);
	    }
	    if (battstatus < 0.01){
	    	battempty = true;
	    	if ((Math.abs(chassis.vx)<=2) && (car_pos<maxdist)){
	    		start_race = 0;
		    	messagebox("The battery is messed up!",false);
	    	}
	    }
	    else {
	    	battempty = false;
	    }
		
		fricImpl = -1*fric*(chassis.m + wheel1.m + wheel2.m + motorbar1.m + motorbar2.m)*wheel1.shapeList[0].r/tstep*wheel1.w/(Math.abs(wheel1.w)+0.0001);
		wheel1.w += fricImpl*wheel1.i_inv;
		wheel2.w += fricImpl*wheel2.i_inv;
		var pBar = document.getElementById("pbar");
		pBar.value = (car_pos-9)/(maxdist-9)*100;
		
		battstatus = Math.round(1000-(consumption/3600/1000/max_batt*1000))/10;
		document.getElementById("battvalue").style.width= battstatus + "%";
    	$('#batttext').html(battstatus + "%");

			const Position= [0, 25, 51, 77, 103, 129, 155, 181, 207, 233, 259, 285, 311, 337, 363, 389, 415,
				441, 466, 492, 518, 544, 570, 596, 622, 648, 674, 700, 726, 752, 778, 804, 830, 856, 882, 908]

			
			var ClosestIndex=findClosestIndex(car_pos, Position);
			
			console.log("main Count:",count2);  
			suggestion(ClosestIndex,count2);
			 

			
			
		/////////////////////Motor Control/////////////////////////////////
		if (brake_sig) {
		 	motor1.rate = 0;
		 	motor2.rate = 0;
			wheel_speed = Math.abs(wheel1.w);
			if(wheel1.w<-1){
				motor1.rate = 1*Math.max(wheel1.w,-1.5)*max_rate1;
				motor2.rate = 1*Math.max(wheel1.w,-1.5)*max_rate1;
				consumption = updateConsumption(consumption);
				$("#effval").html("Motor Efficiency: "+Math.round(motor2eff*100)+'%');
			}
			else if (wheel1.w>3){
				motor1.rate = 2*Math.min(wheel1.w,2)*max_rate1;
				motor2.rate = 2*Math.min(wheel1.w,2)*max_rate1;
                consumption = -1*updateConsumption(-1*consumption);
				$("#effval").html("Motor Efficiency: "+"--%"); motor2eff = 0;
			}
			else{motor1.rate=0; motor2.rate = 0; wheel1.setAngVel(0); wheel2.setAngVel(0);}
			if (wheel_speed>1){
			}
			else{
				wheel1.setMoment(wheel1moment);
				wheel2.setMoment(wheel2moment);
			}
		}
		else if (acc_sig && !battempty) {
		    motor1.rate += acc_rate;
			motor2.rate += acc_rate;
			if(motor2.rate>max_rate1){motor2.rate=max_rate1;}
			if(motor1.rate>max_rate1){motor1.rate=max_rate1;}
			consumption = updateConsumption(consumption);
			$("#effval").html("Motor Efficiency: "+Math.round(motor2eff*100)+'%');
		}
		else {
			$("#effval").html("Motor Efficiency: "+"--%"); motor2eff = 0;motor1.rate = 0;motor2.rate = 0;
		}
	////////////////////////////////////////////////////////////////////////////
	
	lockScroll();
    }
    else {
    	battstatus = Math.round(1000-(consumption/3600/1000/max_batt*1000))/10;
		document.getElementById("battvalue").style.width= battstatus + "%";
    	$('#batttext').html(battstatus + "%");
        $("#speedval").html('Speed: 0mph');
        $("#effval").html("Motor Efficiency: "+"--%");
    };

};

//Run
demo = new scene();
demo.run();
var acc_keys = [];
var brake_keys = [];

$(document).on("pageinit",function(event){
	if($.isEmptyObject(U)){
		$( "body" ).pagecontainer( "change", "#homepage" ); // #regpage or #homepage
	}
	
	$.post("/getBestUser", {}, function(response){
		if(response.length==1){
			$("#title").html('EcoRacer (current winner: '+response[0]+')' );
		}
	});

    drawLandscape = function(){
		// draw the landscape
		var canvas = document.getElementById("canvasbg");
		var ctx = canvas.getContext('2d');
		ctx.lineWidth = 2;
		ctx.strokeStyle = "rgba(0,0,0, 1)";
		ctx.beginPath();
		ctx.moveTo(0,39);
		for (var i=1;i<data.length;i++){
			ctx.lineTo(i/(data.length-1)*scene_width,39-data[i]/100*39);
		}
		ctx.stroke();
		ctx.closePath();
	};

	$("#register").on('tap', function(event){
		event.preventDefault();
		if ($('#username')[0].value!='username' && $('#username')[0].value!=''
			&& $('#password')[0].value!='password' && $('#password')[0].value!=''){
			if (!isJqmGhostClick(event)){
				$.post('/signup', {'username': $('#username')[0].value, 'password': $('#password')[0].value}, 
						function(response){
							U = new user();
						});
			}			
		}
		else{
			$("#message").html("Username cannot be empty...");
			setTimeout(function() { $("#message").html(""); showRobots();}, 1500);
		}	
	});
	$("#login").on('tap', function(event){
		event.preventDefault();
		if ($('#username')[0].value!='username'){
			if (!isJqmGhostClick(event)){
				U = new user($('#username')[0].value, $('#password')[0].value);
			}
		}
		else{
			$("#message").html("Username cannot be empty...");
			setTimeout(function() { $("#message").html(""); showRobots();}, 1500);
		}
	});
	$(document).keypress(function(e) {
		if(!U){// if on login page
		    if(e.which == 13) {// log in
		    	if ($('#username')[0].value!='username' && $('#username')[0].value!=''){
					U = new user($('#username')[0].value, $('#password')[0].value);
				}
				else{
					$("#message").html("Username cannot be empty...");
					setTimeout(function() { $("#message").html(""); showRobots();}, 1500);
				}
		    }			
		}
	});
	$(document).on("keydown", function (event) {
		if (event.key === "ArrowRight") {
				acc_sig = true;
				start_race = tap_start;
				$("#acc").addClass('activated');
				if(Math.round(chassis.p.x)!=acc_keys[acc_keys.length-1]){
					acc_keys.push(Math.round(chassis.p.x));
				}
		} else if (event.key === "ArrowLeft") {
				brake_sig = true;
				$("#brake").addClass('activated');
				if(Math.round(chassis.p.x)!=acc_keys[acc_keys.length-1]){
					acc_keys.push(Math.round(chassis.p.x));
				}
		}
});

$(document).on("keyup", function (event) {
		if (event.key === "ArrowRight") {
				acc_sig = false;
				$("#acc").removeClass('activated');
				if(Math.round(chassis.p.x)!=acc_keys[acc_keys.length-1]){
					acc_keys.push(Math.round(chassis.p.x));
				}
				
		} else if (event.key === "ArrowLeft") {
				brake_sig = false;
				$("#brake").removeClass('activated');
				if(Math.round(chassis.p.x)!=acc_keys[acc_keys.length-1]){
					acc_keys.push(Math.round(chassis.p.x));
				}
				
		}
});

	$("#brake").addClass("enabled");
	$("#acc").addClass("enabled");
	$("#brake").on("touchstart",function(event){
		event.preventDefault();
		if($("#brake").hasClass("enabled")){
			brake_sig = true;
			$('#brake').addClass('activated');		
			if(Math.round(chassis.p.x)!=brake_keys[brake_keys.length-1]){
				brake_keys.push(Math.round(chassis.p.x));
			}
		}
	});
	$("#brake").mousedown(function(event){
		event.preventDefault();
		if($("#brake").hasClass("enabled")){
			brake_sig = true;
			$('#brake').addClass('activated');
			if(Math.round(chassis.p.x)!=brake_keys[brake_keys.length-1]){
				brake_keys.push(Math.round(chassis.p.x));
			}
		}
	});
	$("#acc").on("touchstart",function(event){
		event.preventDefault();
		if($("#acc").hasClass("enabled")){
			acc_sig = true;
			start_race = tap_start;
			$('#acc').addClass('activated');
			if(Math.round(chassis.p.x)!=acc_keys[acc_keys.length-1]){
				acc_keys.push(Math.round(chassis.p.x));
			}
		}
	});
	$("#acc").mousedown(function(event){
		event.preventDefault();
		if($("#acc").hasClass("enabled")){
			acc_sig = true;
			start_race = tap_start;
			$('#acc').addClass('activated');
			if(Math.round(chassis.p.x)!=acc_keys[acc_keys.length-1]){
				acc_keys.push(Math.round(chassis.p.x));
			}
		}
	});
	
	$("#brake").on("touchend",function(event){
		event.preventDefault();
		if($("#brake").hasClass("enabled")){
			brake_sig = false;
			$('#brake').removeClass('activated');
			motor1.rate = 0;
			motor2.rate = 0;
			wheel1.setAngVel(0);
			wheel2.setAngVel(0);
			//wheel1.v_limit = Infinity;
			//wheel2.v_limit = Infinity;
			wheel1.setMoment(wheel1moment);
			wheel2.setMoment(wheel2moment);
			brake_sig = false;
			acc_sig = false;
			if(Math.round(chassis.p.x)!=brake_keys[brake_keys.length-1]){
				brake_keys.push(Math.round(chassis.p.x));
			}
		}
	});
	$("#brake").mouseup(function(event){
		event.preventDefault();
		if($("#brake").hasClass("enabled")){
			brake_sig = false;
			$('#brake').removeClass('activated');
			motor1.rate = 0;
			motor2.rate = 0;
			wheel1.setAngVel(0);
			wheel2.setAngVel(0);
			//wheel1.v_limit = Infinity;
			//wheel2.v_limit = Infinity;
			wheel1.setMoment(wheel1moment);
			wheel2.setMoment(wheel2moment);
			brake_sig = false;
			acc_sig = false;
			if(Math.round(chassis.p.x)!=brake_keys[brake_keys.length-1]){
				brake_keys.push(Math.round(chassis.p.x));
			}
		}
	});
	$("#acc").on("touchend",function(event){
		event.preventDefault();
		if($("#acc").hasClass("enabled")){
			acc_sig = false;
			$('#acc').removeClass('activated');
			motor1.rate = 0;
			motor2.rate = 0;
			wheel1.setAngVel(0);
			wheel2.setAngVel(0);
			//wheel1.v_limit = Infinity;
			//wheel2.v_limit = Infinity;
			wheel1.setMoment(wheel1moment);
			wheel2.setMoment(wheel2moment);
			brake_sig = false;
			acc_sig = false;
			if(Math.round(chassis.p.x)!=acc_keys[acc_keys.length-1]){
				acc_keys.push(Math.round(chassis.p.x));
			}
		}
	});
	$("#acc").mouseup(function(event){
		event.preventDefault();
		if($("#acc").hasClass("enabled")){
			acc_sig = false;
			$('#acc').removeClass('activated');
			motor1.rate = 0;
			motor2.rate = 0;
			wheel1.setAngVel(0);
			wheel2.setAngVel(0);
			//wheel1.v_limit = Infinity;
			//wheel2.v_limit = Infinity;
			wheel1.setMoment(wheel1moment);
			wheel2.setMoment(wheel2moment);
			brake_sig = false;
			acc_sig = false;
			if(Math.round(chassis.p.x)!=acc_keys[acc_keys.length-1]){
				acc_keys.push(Math.round(chassis.p.x));
			}
		}
	});
	$("#ok").on("tap",function(event){
		event.preventDefault();
		if (!isJqmGhostClick(event)){
			$("#messagebox").hide();
			$("#scorebox").hide();
			$("#review").hide();
			restart();
		}
	});
	$("#restart").on("tap",function(event){
		event.preventDefault();
		if (!isJqmGhostClick(event)){
			$("#messagebox").hide();
			$("#scorebox").hide();
			$("#review").hide();
			restart();
		}
	});
	$("#review").on("tap",function(event){
		event.preventDefault();
		if (!isJqmGhostClick(event)){
			if(!historyDrawn){drawHistory();historyDrawn=true;}
			$("#history").show();
		}
	});
	$("#history").on("tap",function(event){
		event.preventDefault();
		if (!isJqmGhostClick(event)){
			$("#history").hide();
		}
	});
	
	
	$("#StartScreen").on("tap", function(event){
		event.preventDefault();
		if (!isJqmGhostClick(event)){
			if ($(window).width()>$(window).height()){
				$("#StartScreen").hide(500, function(){
					$("#brake").removeClass("locked");
					$("#acc").removeClass("locked");
					tap_start = 1;
					start_race = 1;
					wheel1moment = Jw1;
					wheel2moment = Jw2;
					wheel1.setMoment(wheel1moment);
					wheel2.setMoment(wheel2moment);
					getBestScore();
				});
			}
			else{
				$('#landscape').show();
				lockScroll();
			}
		}
	});
	
	$("#designbutton").on("tap", function(){
		if (!isJqmGhostClick(event)){
			$("#design").show();
			initialize_design();
		}
	});
	$("#resetbutton").on("tap",function(event){
		if (!isJqmGhostClick(event)){
			restart();
		}
	});
	$("#designed").on("tap", function(){
		if (!isJqmGhostClick(event)){
			$("#design").hide();
			$("#canvas_gear").empty();
			restart();
		}
	});	
});

demo.canvas.style.position = "absolute";
demo.canvas.style.left = "0px";



$(window).resize(function(){
	scene_width = $(window).width();
	scene_height = $(window).height();
	$("#StartScreen").width(scene_width);
	$("#StartScreen").height(scene_height);
	$("#wrapper").width(scene_width);
	$("#wrapper").height(scene_height);
	$('#canvasbg')[0].width = scene_width;
	$('#canvasbg')[0].height = 40;
	w = demo.width = demo.canvas.width = scene_width;
});


