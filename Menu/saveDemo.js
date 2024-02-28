
Parse.serverURL = 'https://parseapi.back4app.com/';
Parse.initialize('9tj2uLK9UVu25sy9CBD8roZteXWMOZJ0xpS1jdQb', '3gaOSHVQfAmPGl4rQDIns55T0OLyiVIIc7w9rZ4W');
var username = localStorage.getItem('UserName');
function submitSurvey(event) {
  event.preventDefault();
  
  const gender = document.querySelector('input[name="gender"]:checked').value
  const age= document.querySelector('input[name="age"]').value
  const education= document.querySelector('input[name="education"]:checked').value
  const educationalField= document.querySelector('input[name="educationalField"]').value
  const experience= document.querySelector('input[name="experience"]:checked').value
  const race= document.querySelector('input[name="race"]:checked').value
  const Language= document.querySelector('input[name="Language"]').value
  const exp_riding= document.querySelector('input[name="exp_riding"]:checked').value
  const AI= document.querySelector('input[name="AI"]:checked').value
  


  
  const Survey = Parse.Object.extend('SurveyDemo');
  const survey = new Survey();
  survey.set('Name', username);
  survey.set('Gender', gender);
  survey.set('Age', age);
  survey.set('Education', education);
  survey.set('Field', educationalField);
  survey.set('Experience', experience);
  survey.set('Race', race);
  survey.set('Language', Language);
  survey.set('exp_riding', exp_riding);
  survey.set('AI', AI);

  
  survey.save().then(
    (result) => {
      console.log('Survey saved successfully:', result);
      alert('Survey submitted successfully!');
      window.location.href='menu4.html';
    },
    (error) => {
      console.error('Error saving data:', error);
      alert('Error submitting survey. Please try again.');
    }
  );
}
