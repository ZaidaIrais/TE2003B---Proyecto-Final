(()=>{
    // Elment query
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', (ev) => {
        if(!email.value || !password.value) {
            errorMessage.innerText = 'Both fields are required';
            ev.preventDefault();
            return false;
        }
    });

})();

