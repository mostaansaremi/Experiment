
Parse.serverURL = 'https://parseapi.back4app.com/';
Parse.initialize('9tj2uLK9UVu25sy9CBD8roZteXWMOZJ0xpS1jdQb', '3gaOSHVQfAmPGl4rQDIns55T0OLyiVIIc7w9rZ4W');
var username = localStorage.getItem('UserName');
function updateRangeValue(elementId, value) {
  document.getElementById(elementId).innerText = value;
}

function submitSurveyNOAI(event) {
  event.preventDefault();
  const q1 = document.querySelector('input[name="q1"]').value
  const q2 = document.querySelector('input[name="q2"]').value
  const q3 = document.querySelector('input[name="q3"]').value
  const q4 = document.querySelector('input[name="q4"]').value
  const q5 = document.querySelector('input[name="q5"]').value
  const q6 = document.querySelector('input[name="q6"]').value
  
  


  
  const Survey = Parse.Object.extend('noAISurvey');
  const survey = new Survey();
  survey.set('Name', username);
  survey.set('TYPE', 'NoAI')
  survey.set('q1', q1);
  survey.set('q2', q2);
  survey.set('q3', q3);
  survey.set('q4', q4);
  survey.set('q5', q5);
  survey.set('q6', q6);

 

  
  survey.save().then(
    (result) => {
      console.log('Survey saved successfully:', result);
      alert('Survey submitted successfully!');
      window.location.href='exp2/exp2.html';
    },
    (error) => {
      console.error('Error saving data:', error);
      alert('Error submitting survey. Please try again.');
    }
  );
}
