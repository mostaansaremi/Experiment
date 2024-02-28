
const bestAct = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  0, 0, -1, 0, -1, 0, 0, -1, 1, 0]

const Position= [0, 25, 51, 77, 103, 129, 155, 181, 207, 233, 259, 285, 311, 337, 363, 389, 415,
  441, 466, 492, 518, 544, 570, 596, 622, 648, 674, 700, 726, 752, 778, 804, 830, 856, 882, 908]



function findClosestIndex(value, arr) {
  let closestIndex = 0;
  let closestDiff = Math.abs(value - arr[0]);

  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(value - arr[i]);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIndex = i;
    }
  }

  return closestIndex;
}




function suggestion(closestIndex ) {
  var downArrowElement = document.getElementById("downArrow");
  var upArrowElement = document.getElementById("upArrow");
  var noArrowElement = document.getElementById("do-nothing");

  if (bestAct[closestIndex] == 1) {
    
    if (upArrowElement) {
      upArrowElement.style.color = "rgb(25, 171, 110)";
      downArrowElement.style.color = "black";
      noArrowElement.style.color = "black";

      
    }
  }
  if (bestAct[closestIndex] == -1) {
    
    if (downArrowElement) {
      downArrowElement.style.color = "rgb(236, 52, 52)";
      upArrowElement.style.color = "black";
      noArrowElement.style.color = "black";
    }
  }
  if (bestAct[closestIndex] == 0) {
    
    if (noArrowElement) {
      noArrowElement.style.color = "rgb(255, 255, 0)";
      upArrowElement.style.color = "black";
      downArrowElement.style.color = "black";
    }
  }
}

