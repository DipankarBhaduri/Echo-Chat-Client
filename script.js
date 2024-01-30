function redirectTo(page) {
    if (page === 'login') {
        window.location.href = 'login/login.html';
    } else if (page === 'signup') {
        window.location.href = 'signup/signUp.html';
    }
}
