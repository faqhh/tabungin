document.addEventListener("DOMContentLoaded", function () {
    const signUpButton = document.querySelector(".sign-up");
    signUpButton.addEventListener("click", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (name && username && email && password) {
            alert("Pendaftaran berhasil! Selamat datang, " + name);
        } else {
            alert("Silakan lengkapi semua field untuk mendaftar.");
        }
    });
    signUpButton.addEventListener("mouseover", () => {
        signUpButton.style.transform = "scale(1.1)";
        signUpButton.style.transition = "transform 0.3s ease";
    });
    signUpButton.addEventListener("mouseout", () => {
        signUpButton.style.transform = "scale(1)";
    });

    const faqButton = document.querySelector(".faq-btn");
    faqButton.addEventListener("mouseover", () => {
        faqButton.style.color = "#5679c9";
        faqButton.style.transition = "color 0.3s ease";
    });
    faqButton.addEventListener("mouseout", () => {
        faqButton.style.color = "#2b2f77";
    });

    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.borderColor = "#2b2f77";
            input.style.transition = "border-color 0.3s ease";
        });
        input.addEventListener("blur", () => {
            input.style.borderColor = "#ddd";
        });
    });

    faqButton.addEventListener("click", () => {
        document.querySelector(".register-box").scrollIntoView({ behavior: "smooth" });
    });

    const googleRegisterButton = document.querySelector(".google-register");
    googleRegisterButton.addEventListener("mouseover", () => {
        googleRegisterButton.style.backgroundColor = "#f5f5f5";
        googleRegisterButton.style.transition = "background-color 0.3s ease";
    });
    googleRegisterButton.addEventListener("mouseout", () => {
        googleRegisterButton.style.backgroundColor = "white";
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (name && username && email && password) {
            alert("Pendaftaran berhasil! Selamat datang, " + name);
        } else {
            alert("Silakan lengkapi semua field untuk mendaftar.");
        }
    });
});
