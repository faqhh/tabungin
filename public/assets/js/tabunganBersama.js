document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.querySelector(".back-button");
    backButton.addEventListener("click", () => {
        window.history.back();
    });

    const frequencyButtons = document.querySelectorAll(".frekuensi-btn");
    frequencyButtons.forEach(button => {
        button.addEventListener("click", () => {
            frequencyButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });

    frequencyButtons.forEach(button => {
        button.addEventListener("mouseover", () => {
            button.style.transform = "scale(1.1)";
            button.style.transition = "transform 0.2s ease";
        });
        button.addEventListener("mouseout", () => {
            button.style.transform = "scale(1)";
        });
    });

    const viewSavingButton = document.querySelector(".lihat-tabungan");
    viewSavingButton.addEventListener("click", () => {
        alert("Detail tabungan akan segera tersedia!");
    });

    const saveButton = document.querySelector(".simpan");
    saveButton.addEventListener("click", () => {
        const isConfirmed = confirm("Apakah Anda yakin ingin menyimpan perubahan?");
        if (isConfirmed) {
            alert("Data berhasil disimpan!");
        }
    });

    const cancelButton = document.querySelector(".batal");
    cancelButton.addEventListener("click", () => {
        const isCancelled = confirm("Apakah Anda yakin ingin membatalkan perubahan?");
        if (isCancelled) {
            window.location.reload();
        }
    });

    const fileInput = document.querySelector('input[type="file"]');
    fileInput.addEventListener("change", (event) => {
        const fileName = event.target.files[0]?.name || "Tidak ada file dipilih";
        alert(`File dipilih: ${fileName}`);
    });

    const actionButtons = document.querySelectorAll(".btn");
    actionButtons.forEach(button => {
        button.addEventListener("mouseover", () => {
            button.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            button.style.transition = "box-shadow 0.2s ease";
        });
        button.addEventListener("mouseout", () => {
            button.style.boxShadow = "none";
        });
    });
});
