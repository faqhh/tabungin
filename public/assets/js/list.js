document.querySelector('.profile').addEventListener('click', function () {
    alert('Navigasi ke halaman Profile!');
});

document.querySelector('.tabungan-select button').addEventListener('click', function () {
    const currentType = document.querySelector('.tabungan-jenis').textContent;
    const newType = currentType === 'Pribadi' ? 'Bersama' : 'Pribadi'; 
    document.querySelector('.tabungan-jenis').textContent = newType;
    alert(`Jenis tabungan berubah menjadi: ${newType}`);
});

document.querySelectorAll('.edit').forEach((editButton, index) => {
    editButton.addEventListener('click', function () {
        const itemName = document.querySelectorAll('.tabungan-header h2')[index].textContent;
        alert(`Mengedit tabungan: ${itemName}`);
    });
});

const tabunganItems = [
    {
        name: 'Macbook',
        target: 30000000,
        nominalSetor: 200000,
        awalSetor: '24/10/2024',
        akhirSetor: '24/12/2024',
        terkumpul: 15000000,
    },
    {
        name: 'Skincare',
        target: 1000000,
        nominalSetor: 50000,
        awalSetor: '25/12/2024',
        akhirSetor: '25/01/2024',
        terkumpul: 300000,
    },
];

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
}

function updateTabunganData() {
    const items = document.querySelectorAll('.tabungan-item');
    items.forEach((item, index) => {
        const data = tabunganItems[index];
        if (data) {
            item.querySelector('.tabungan-header h2').textContent = data.name;
            item.querySelector('.tabungan-info div:nth-child(1) span').textContent = formatRupiah(data.target);
            item.querySelector('.tabungan-info div:nth-child(2) span').textContent = formatRupiah(data.nominalSetor);
            item.querySelector('.tabungan-info div:nth-child(3) span').textContent = data.awalSetor;
            item.querySelector('.tabungan-info div:nth-child(4) span').textContent = data.akhirSetor;
            item.querySelector('.tabungan-info div:nth-child(5) span').textContent = formatRupiah(data.terkumpul);
        }
    });
}

updateTabunganData();

document.querySelectorAll('.edit-btn').forEach((editBtn, index) => {
    editBtn.addEventListener('click', function () {
        const itemName = tabunganItems[index].name;
        alert(`Edit tabungan: ${itemName}`);
    });
});

function highlightWarningDates() {
    const today = new Date();
    document.querySelectorAll('.warning').forEach((dateElement) => {
        const dateText = dateElement.textContent;
        const targetDate = new Date(dateText.split('/').reverse().join('/')); 
        if (targetDate <= today) {
            dateElement.style.color = 'red'; 
        } else {
            dateElement.style.color = 'orange'; 
        }
    });
}

highlightWarningDates();
