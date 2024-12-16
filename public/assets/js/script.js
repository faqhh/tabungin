document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('form');
    const loginButton = document.querySelector('.login-btn');
    const googleButton = document.querySelector('.google-login');
    const faqButton = document.querySelector('.faq-btn');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (email === "" || password === "") {
            alert("Email and Password are required!");
            return;
        }

        console.log("Login successful!");
        alert("Logsin Succesful!");
        window.location.href = "pages/home.jsx";
    });

    googleButton.addEventListener('click', () => {
        alert("Logging in with Google...");
    });

    faqButton.addEventListener('click', () => {
        alert("Redirecting to FAQ & Help page...");
    });

    const enhanceButtonHoverEffect = (button) => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.2s ease-in-out';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    };

    enhanceButtonHoverEffect(loginButton);
    enhanceButtonHoverEffect(googleButton);
    enhanceButtonHoverEffect(faqButton);
});
