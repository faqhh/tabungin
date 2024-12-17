document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.querySelector(".back-button");
    backButton.addEventListener("click", () => {
        window.history.back();
    });

    const progressElement = document.querySelector(".progress span");
    const totalAmount = 30000000; 
    const collectedAmount = 100000; 
    const progressPercent = ((collectedAmount / totalAmount) * 100).toFixed(2);

    progressElement.textContent = `${progressPercent}%`;

    const historyContainer = document.querySelector(".tabungan-history");
    const newTransaction = document.createElement("div");
    newTransaction.innerHTML = `
        <p>17 November 2024 - 09:30</p>
        <p>Senin, 17 November 2024</p>
        <p>+ Rp 150.000</p>
    `;
    historyContainer.appendChild(newTransaction);
});
