document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.querySelector(".edit-button");
    const inputs = document.querySelectorAll("input");
    const saveButton = document.querySelector(".save-button");
    const cancelButton = document.querySelector(".cancel-button");

    editButton.addEventListener("click", () => {
        inputs.forEach(input => {
            if (input.id !== "password" && input.id !== "language") {
                input.removeAttribute("readonly");
                input.focus();
            }
        });
        saveButton.disabled = false;
        cancelButton.style.display = "inline-block";
    });

    saveButton.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Perubahan profil telah disimpan.");
        inputs.forEach(input => input.setAttribute("readonly", "true"));
        saveButton.disabled = true;
        cancelButton.style.display = "none";
    });

    cancelButton.addEventListener("click", (event) => {
        event.preventDefault();
        inputs.forEach(input => input.setAttribute("readonly", "true"));
        saveButton.disabled = true;
        cancelButton.style.display = "none";
    });

    const logoutButton = document.querySelector(".logout-button");
    logoutButton.addEventListener("click", () => {
        const confirmLogout = confirm("Apakah Anda yakin ingin keluar?");
        if (confirmLogout) {
            alert("Anda telah keluar.");
            window.location.href = "/Celerates/macro/login.html"; 
        }
    });

    const deleteButton = document.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        const confirmDelete = confirm("Apakah Anda yakin ingin menghapus akun? Aksi ini tidak bisa dibatalkan.");
        if (confirmDelete) {
            alert("Akun Anda telah dihapus.");
            window.location.href = "/login.html";
        }
    });

    logoutButton.addEventListener("mouseover", () => {
        logoutButton.style.backgroundColor = "#e74c3c";
        logoutButton.style.color = "#fff";
    });
    logoutButton.addEventListener("mouseout", () => {
        logoutButton.style.backgroundColor = "#ccc";
        logoutButton.style.color = "#000";
    });

    deleteButton.addEventListener("mouseover", () => {
        deleteButton.style.backgroundColor = "#c0392b";
        deleteButton.style.color = "#fff";
    });
    deleteButton.addEventListener("mouseout", () => {
        deleteButton.style.backgroundColor = "#e74c3c";
        deleteButton.style.color = "#fff";
    });

    const profileImage = document.querySelector(".profile-image img");
    profileImage.addEventListener("mouseover", () => {
        profileImage.style.transform = "scale(1.1)";
        profileImage.style.transition = "transform 0.3s ease";
    });
    profileImage.addEventListener("mouseout", () => {
        profileImage.style.transform = "scale(1)";
    });

    const socialIcons = document.querySelectorAll(".footer-right img");
    socialIcons.forEach(icon => {
        icon.addEventListener("mouseover", () => {
            icon.style.transform = "scale(1.2)";
        });
        icon.addEventListener("mouseout", () => {
            icon.style.transform = "scale(1)";
        });
    });

    const profileButton = document.querySelector(".sign-up");
    profileButton.addEventListener("mouseover", () => {
        profileButton.style.backgroundColor = "#2d4a9c";
        profileButton.style.color = "white";
    });
    profileButton.addEventListener("mouseout", () => {
        profileButton.style.backgroundColor = "white";
        profileButton.style.color = "#2d4a9c";
    });
});
