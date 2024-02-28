
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const submitBtn = document.getElementById('submitBtn');
  
  form.addEventListener('submit', handleFormSubmit);

  async function handleFormSubmit(event) {
    event.preventDefault();

    const Username = document.getElementById('Username').value;
    const Password = document.getElementById('Password').value;
    
    try {

      const response = await fetch(`https://parseapi.back4app.com/classes/UserInfo?where={"Username":"${Username}"}`, {
        method: 'GET',
        headers: {
          'X-Parse-Application-Id': '9tj2uLK9UVu25sy9CBD8roZteXWMOZJ0xpS1jdQb',
          'X-Parse-REST-API-Key': 'BLRi3YnyqKiONiKVYGZDGQb8jXB7gQMww5rzi1dw'
        }
      });
      
      const data = await response.json();
      
      if (data.results.length === 1) {
        const storedPasswordHash = data.results[0].Password; 

        if ((Password===storedPasswordHash)) {
          console.log('Authentication successful!');
          window.location.href='Menu/menu0.html';
          localStorage.setItem('UserName', Username);
          

        } else {
          console.log('Authentication failed. Please check your username and password.');
          alert('Authentication Failed! Please check your username and password.');
       
        }
      } else {
        console.log('User not found.');
        alert('User not found.');

      }
    } catch (error) {
    }

  }
});
