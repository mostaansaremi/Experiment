
Parse.serverURL = 'https://parseapi.back4app.com/';
Parse.initialize('9tj2uLK9UVu25sy9CBD8roZteXWMOZJ0xpS1jdQb', '3gaOSHVQfAmPGl4rQDIns55T0OLyiVIIc7w9rZ4W');
var username = localStorage.getItem('UserName');
function updateRangeValue(elementId, value) {
  document.getElementById(elementId).innerText = value;
}

function submitSurvey(event) {
  event.preventDefault();
  
  const q1 = document.querySelector('input[name="q1"]:checked').value
  const q2 = document.querySelector('input[name="q2"]').value
  const q3 = document.querySelector('input[name="q3"]').value
  const q4 = document.querySelector('input[name="q4"]').value
  const q5 = document.querySelector('input[name="q5"]').value
  const q6 = document.querySelector('input[name="q6"]').value
  const q7 = document.querySelector('input[name="q7"]').value
  const q8 = document.querySelector('input[name="q8"]:checked').value
  const q9 = document.querySelector('input[name="q9"]:checked').value
  const q10 = document.querySelector('input[name="q10"]:checked').value
  const q11 = document.querySelector('input[name="q11"]:checked').value
  const q12 = document.querySelector('input[name="q12"]:checked').value
  const q13 = document.querySelector('input[name="q13"]:checked').value
  const q14 = document.querySelector('input[name="q14"]:checked').value
  const q15 = document.querySelector('input[name="q15"]:checked').value
  const q16 = document.querySelector('input[name="q16"]:checked').value
  const q17 = document.querySelector('input[name="q17"]:checked').value
  


  
  const Survey = Parse.Object.extend('SurveyWork');
  const survey = new Survey();
  survey.set('Name', username);
  survey.set('TYPE', "Trans")
  survey.set('q1', q1);
  survey.set('q2', q2);
  survey.set('q3', q3);
  survey.set('q4', q4);
  survey.set('q5', q5);
  survey.set('q6', q6);
  survey.set('q7', q7);
  survey.set('q8', q8);
  survey.set('q9', q9);
  survey.set('q10', q10);
  survey.set('q11', q11);
  survey.set('q12', q12);
  survey.set('q13', q13);
  survey.set('q14', q14);
  survey.set('q15', q15);
  survey.set('q16', q16);
  survey.set('q17', q17);
 

  
  survey.save().then(
    (result) => {
      console.log('Survey saved successfully:', result);
      alert('Survey submitted successfully!');
      window.location.href='exp4/exp4.html';
    },
    (error) => {
      console.error('Error saving data:', error);
      alert('Error submitting survey. Please try again.');
    }
  );
}
