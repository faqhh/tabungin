document.addEventListener("DOMContentLoaded", () => {
    const frequencyButtons = document.querySelectorAll(".frequency-options button");
    frequencyButtons.forEach(button => {
        button.addEventListener("click", () => {
            frequencyButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });

    const form = document.querySelector(".savings-form");
    form.addEventListener("submit", event => {
        event.preventDefault(); 
        const inputs = form.querySelectorAll("input[type='text'], input[type='date']");
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.border = "2px solid red";
                setTimeout(() => (input.style.border = ""), 3000); 
            }
        });

        const inviteInput = form.querySelector("input[type='text']:nth-child(8)");
        if (!inviteInput.value.trim()) {
            isValid = false;
            inviteInput.style.border = "2px solid red";
            setTimeout(() => (inviteInput.style.border = ""), 3000);
        }

        if (isValid) {
            alert("Formulir berhasil dikirim!");
        } else {
            alert("Harap isi semua data pada formulir!");
        }
    });

    const uploadBtn = document.querySelector(".upload-btn");
    uploadBtn.addEventListener("click", event => {
        event.preventDefault(); 
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        fileInput.addEventListener("change", () => {
            if (fileInput.files.length > 0) {
                uploadBtn.textContent = fileInput.files[0].name;
            }
        });

        fileInput.click();
    });

    const textInputs = form.querySelectorAll("input[type='text']");
    textInputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.transition = "box-shadow 0.3s ease";
            input.style.boxShadow = "0 0 10px rgba(33, 150, 243, 0.5)";
        });

        input.addEventListener("blur", () => {
            input.style.boxShadow = "none";
        });
    });
});
