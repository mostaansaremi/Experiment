document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
          const Email = document.getElementById('Email').value;
          const Username = document.getElementById('Username').value;
          const FullName = document.getElementById('FullName').value;
          const Password = document.getElementById('Password').value;
          
      
          fetch('https://parseapi.back4app.com/classes/UserInfo', {
            method: 'POST',
            headers: {
              'X-Parse-Application-Id': '9tj2uLK9UVu25sy9CBD8roZteXWMOZJ0xpS1jdQb',
              'X-Parse-REST-API-Key': 'BLRi3YnyqKiONiKVYGZDGQb8jXB7gQMww5rzi1dw',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Email: Email,
              Username: Username,
              FullName: FullName,
              Password: Password
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log('User created successfully:', data);
            alert('User created successfully!');
          })
          .catch(error => {
            console.error('Error:', error);
            alert('An ERROR occurred');
          });
     }
  });