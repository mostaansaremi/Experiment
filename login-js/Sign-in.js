document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('Email').value;
    const username = document.getElementById('Username').value;

    // First, check if the user already exists
    fetch('https://parseapi.back4app.com/classes/UserInfo?where=' + encodeURIComponent(JSON.stringify({
      "$or": [
        { "Email": email },
        { "Username": username }
      ]
    })), {
      method: 'GET',
      headers: {
        'X-Parse-Application-Id': '9tj2uLK9UVu25sy9CBD8roZteXWMOZJ0xpS1jdQb',
        'X-Parse-REST-API-Key': 'BLRi3YnyqKiONiKVYGZDGQb8jXB7gQMww5rzi1dw',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        // User exists
        alert('User already exists. Please log in.');
      } else {
        // User does not exist, proceed with creating the user
        createUser(email, username);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while checking user existence.');
    });
  }

  function createUser(email, username) {
    const fullName = document.getElementById('FullName').value;
    const password = document.getElementById('Password').value;

    fetch('https://parseapi.back4app.com/classes/UserInfo', {
      method: 'POST',
      headers: {
        'X-Parse-Application-Id': '9tj2uLK9UVu25sy9CBD8roZteXWMOZJ0xpS1jdQb',
        'X-Parse-REST-API-Key': 'BLRi3YnyqKiONiKVYGZDGQb8jXB7gQMww5rzi1dw',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email: email,
        Username: username,
        FullName: fullName,
        Password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('User created successfully:', data);
      alert('User created successfully!');
      window.location.href='log-in.html';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred during user creation.');
    });
  }
});
