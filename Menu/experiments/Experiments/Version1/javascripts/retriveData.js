const BACK4APP_APP_ID = '9tj2uLK9UVu25sy9CBD8roZteXWMOZJ0xpS1jdQb';
const BACK4APP_JS_KEY = '3gaOSHVQfAmPGl4rQDIns55T0OLyiVIIc7w9rZ4W';

Parse.initialize(BACK4APP_APP_ID, BACK4APP_JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

function saveArray(fieldName0, Array0, fieldName1, Array1, fieldName2, Array2, fieldName3, Array3, fieldName4, Array4, gameID, username, count, fieldName5, Array5){

const MyObject = Parse.Object.extend('GameData');
const myObject = new MyObject();

myObject.set('GameID', gameID);
myObject.set('User', username);
myObject.set('Iteration', count);
myObject.set(fieldName0, Array0);
myObject.set(fieldName1, Array1);
myObject.set(fieldName2, Array2);
myObject.set(fieldName3, Array3);
myObject.set(fieldName4, Array4);
myObject.set(fieldName5, Array5);

myObject.save().then(
  (result) => {
  console.log('Data saved successfully:', result);
},
  (error) => {
    console.error('Error saving data:', error);
  }
);

}