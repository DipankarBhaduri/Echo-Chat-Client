function signup() {
    var firstName = document.getElementById('signup-firstName').value;
    var lastName = document.getElementById('signup-lastName').value;
    var emailId = document.getElementById('signup-emailId').value;
    var contactDetails = document.getElementById('signup-contactDetails').value;
    var password = document.getElementById('signup-password').value;

    if (firstName === '' || lastName === '' || emailId === '' || contactDetails === '' || password === '') {
        alert('Please enter all the fields.');
        return;
    }

    fetch('http://localhost:8080/rest/save/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            contactDetails: contactDetails,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Sign up successful!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during sign up.');
    });
}