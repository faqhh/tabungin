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

    const cancelButton = document.querySelector(".batal");
    cancelButton.addEventListener("click", () => {
        if (confirm("Apakah Anda yakin ingin membatalkan perubahan?")) {
            window.history.back();
        }
    });

    const saveButton = document.querySelector(".simpan");
    saveButton.addEventListener("click", () => {
        alert("Data berhasil disimpan!");
    });

    const viewSavingButton = document.querySelector(".lihat-tabungan");
    viewSavingButton.addEventListener("click", () => {
        alert("Lihat detail tabungan belum tersedia.");
    });
});
