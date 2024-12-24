document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const formTitle = document.getElementById('form-title');

    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');

    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        formTitle.textContent = 'Sign Up';
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        formTitle.textContent = 'Login';
    });

    // Handle Signup
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('signup-email').value;
        const name = document.getElementById('signup-name').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (!email || !name || !password || !confirmPassword) {
            alert('All fields are required!');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const userData = {
            email,
            name,
            password,
            coins: 1000, // Initial coins
            courses: [] // Initially no courses enrolled
        };
        localStorage.setItem(email, JSON.stringify(userData));

        alert('Sign up successful! You can now log in.');

        signupForm.reset();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        formTitle.textContent = 'Login';
    });

    // Handle Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const storedUserData = localStorage.getItem(email);

        if (!storedUserData) {
            alert('User not found! Please sign up.');
            return;
        }

        const userData = JSON.parse(storedUserData);

        if (email === userData.email && password === userData.password) {
            alert(`Login successful! Welcome, ${userData.name}.`);
            localStorage.setItem("currentUser", email); // Set current user
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password!');
        }
    });
});
