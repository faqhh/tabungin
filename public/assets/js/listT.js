document.querySelector('.back-button').addEventListener('click', function () {
    window.history.back();
});

function updateProgress(progressValue) {
    const progressElement = document.querySelector('.progress span');
    if (progressElement) {
        progressElement.textContent = `${progressValue}%`;
        progressElement.style.transition = 'all 0.5s ease-in-out';
        progressElement.style.color = progressValue >= 100 ? 'green' : '#4a60d3';
    }
}

let progress = 10; 
updateProgress(progress);

setTimeout(() => {
    progress = 20; 
    updateProgress(progress);
}, 3000); 

document.querySelector('.profile').addEventListener('click', function () {
    alert('Navigasi ke halaman Profile!');
});

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
}

const terkumpulElement = document.querySelector('.tabungan-summary div:nth-child(1) p:last-child');
const kekuranganElement = document.querySelector('.tabungan-summary div:nth-child(2) p:last-child');

if (terkumpulElement && kekuranganElement) {
    const terkumpul = 100000; 
    const target = 30000000; 
    const kekurangan = target - terkumpul;

    terkumpulElement.textContent = formatRupiah(terkumpul);
    kekuranganElement.textContent = formatRupiah(kekurangan);
}

const tanggalEstimasiElement = document.querySelector('.tabungan-dates div:nth-child(2) p:last-child');
if (tanggalEstimasiElement) {
    setTimeout(() => {
        tanggalEstimasiElement.textContent = '01/06/2030'; 
    }, 5000); 
}
