document.addEventListener("DOMContentLoaded", () => {
    const incomeInput = document.querySelector(".finance-overview .income input");
    const editBtn = document.querySelector(".finance-overview .edit-btn");
    const saveBtn = document.querySelector(".finance-overview .save-btn");

    const expandBtn = document.querySelector(".expand-btn");
    const bannerText = document.querySelector(".banner-text p");

    editBtn.addEventListener("click", () => {
        incomeInput.removeAttribute("readonly");
        incomeInput.focus();
        editBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
    });

    saveBtn.addEventListener("click", () => {
        incomeInput.setAttribute("readonly", "readonly");
        editBtn.style.display = "inline-block";
        saveBtn.style.display = "none";

        showNotification("Penghasilan berhasil disimpan!");
    });

    expandBtn.addEventListener("click", () => {
        if (bannerText.style.display === "none" || !bannerText.style.display) {
            bannerText.style.display = "block";
            expandBtn.textContent = "▲";
        } else {
            bannerText.style.display = "none";
            expandBtn.textContent = "▼";
        }
    });

    const financeForm = document.querySelector(".finance-form");
    financeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(financeForm);
        const date = formData.get("date");
        const belanja = formData.get("belanja_bulanan");
        const transportasi = formData.get("transportasi");
        const pribadi = formData.get("kebutuhan_pribadi");

        showNotification("Data keuangan berhasil disimpan!");
        financeForm.reset();
    });

    function showNotification(message) {
        const notification = document.createElement("div");
        notification.textContent = message;
        notification.style.position = "fixed";
        notification.style.bottom = "20px";
        notification.style.right = "20px";
        notification.style.backgroundColor = "#4CAF50";
        notification.style.color = "white";
        notification.style.padding = "10px 20px";
        notification.style.borderRadius = "5px";
        notification.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});
