function login() {
    var username = document.getElementById('login-emailId').value;
    var password = document.getElementById('login-password').value;
    
    fetch('http://localhost:8080/rest/verify/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            emailId: username,
            password: password,
        }),
    })
    .then(response => {
        if (response.ok) {
            console.log(response);
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        console.log(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
        window.location.href = '../dashboard/dashboard.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login.');
    });
}
