import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

function Keuangan() {
  // States for managing the form input and the visibility of elements
  const [income, setIncome] = useState("Rp 5.250.000");
  const [isEditing, setIsEditing] = useState(false);
  const [isBannerExpanded, setIsBannerExpanded] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, date: "01-09-2024", category: "Belanja Bulanan", amount: "-Rp 2.000.000", note: "makanan dan minuman" },
    { id: 2, date: "01-09-2024", category: "Transportasi", amount: "-Rp 500.000", note: "busway dan gojek" },
    { id: 3, date: "16-09-2024", category: "Kebutuhan Pribadi", amount: "-Rp 1.000.000", note: "" },
    { id: 4, date: "05-10-2024", category: "Voulunter", amount: "+Rp 250.000", note: "" },
  ]);
  
  // State for form data
  const [formData, setFormData] = useState({
    date: "2024-09-01",
    belanjaBulanan: "",
    transportasi: "",
    kebutuhanPribadi: ""
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    showNotification("Penghasilan berhasil disimpan!");
  };

  const handleBannerToggle = () => {
    setIsBannerExpanded(!isBannerExpanded);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Store data and reset form
    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        date: formData.date,
        category: "Belanja Bulanan", // You could dynamically add categories based on the input
        amount: `-Rp ${formData.belanjaBulanan}`,
        note: formData.belanjaBulanan
      }
    ]);
    showNotification("Data keuangan berhasil disimpan!");
    setFormData({
      date: "",
      belanjaBulanan: "",
      transportasi: "",
      kebutuhanPribadi: ""
    });
  };

  const showNotification = (message) => {
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
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Financial Management</title>
      <link rel="stylesheet" href="assets/css/keuangan.css" />
      <header>
        <Navbar/>
      </header>
      <section className="banner">
        <div className="banner-text">
          <h1>Kelola Keuangan Kamu Sekarang!</h1>
            <p>
              Di sini, kamu bisa mengalokasikan dana sesuai kebutuhan, mencatat setiap pemasukan dan pengeluaran, serta melihat grafik perkembangan keuanganmu. Semua dalam satu tempat untuk memudahkanmu mengatur keuangan dengan lebih efisien!
            </p>
        </div>
        <img src="assets/img/keuangan.jpeg" alt="Finance Management Image" className="banner-img" />
      </section>
      <section className="manage-finance">
        <h2 className="manage-finance-h2">Ayo kelola keuanganmu!</h2>
        <div className="finance-overview">
          <div className="income">
            <label>Penghasilan</label>
            <input
              type="text"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              readOnly={!isEditing}
            />
          </div>
          <div className="actions">
            <button className="edit-btn" onClick={handleEditClick} style={{ display: isEditing ? 'none' : 'inline-block' }}>
              Edit
            </button>
            <button className="save-btn" onClick={handleSaveClick} style={{ display: isEditing ? 'inline-block' : 'none' }}>
              Simpan
            </button>
          </div>
        </div>
        <form className="finance-form" onSubmit={handleFormSubmit}>
          <label>Tanggal</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleFormChange}
          />
          <label>Belanja Bulanan</label>
          <input
            type="text"
            name="belanjaBulanan"
            value={formData.belanjaBulanan}
            placeholder="Rp 2.000.000"
            onChange={handleFormChange}
          />
          <label>Transportasi</label>
          <input
            type="text"
            name="transportasi"
            value={formData.transportasi}
            placeholder="Rp 500.000"
            onChange={handleFormChange}
          />
          <label>Kebutuhan Pribadi</label>
          <input
            type="text"
            name="kebutuhanPribadi"
            value={formData.kebutuhanPribadi}
            placeholder="Rp masukkan nominal"
            onChange={handleFormChange}
          />
          <button type="submit" className="submit-btn">
            Simpan
          </button>
        </form>
      </section>

      <section className="summary">
        <div className="card-2">
          <div className="card-header">
            <p className="icon-bar-chart">Pengeluaran dan Penghasilan</p>
            <button className="dropdown-button">▼</button>
          </div>
        </div>
        <div className="summary-cards">
          <div className="card">
            <h1>Total Penghasilan</h1>
            <p>Rp 5.000.000</p>
          </div>
          <div className="card">
            <h1>Total Pengeluaran</h1>
            <p>Rp 3.500.000</p>
          </div>
          <div className="card">
            <h1>Sisa Dana</h1>
            <p>Rp 1.750.000</p>
          </div>
        </div>
      </section>

      <section className="transactions">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Tanggal</th>
              <th>Kategori</th>
              <th>Jumlah</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.date}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="summary">
          <div>
            <div class="card-2">
              <div class="card-header">
                <p class="icon-bar-chart">Grafik Pemasukan dan Pengeluaran</p>
                <button class="dropdown-button">▼</button>
              </div>
            </div>
            <div className="chart">
              <div className="bar">
                <div className="income">Pemasukkan</div>
                <div className="expense">Pengeluaran</div>
                <p>April</p>
              </div>
              <div className="bar">
                <div className="income" style={{ height: "40%" }}>
                  Pemasukkan
                </div>
                <div className="expense" style={{ height: "60%" }}>
                  Pengeluaran
                </div>
                <p>Mei</p>
              </div>
              <div className="bar">
                <div className="income" style={{ height: "25%" }}>
                  Pemasukkan
                </div>
                <div className="expense" style={{ height: "75%" }}>
                  Pengeluaran
                </div>
                <p>Juni</p>
              </div>
              <div className="bar">
                <div className="income" style={{ height: "50%" }}>
                  Pemasukkan
                </div>
                <div className="expense" style={{ height: "50%" }}>
                  Pengeluaran
                </div>
                <p>Juli</p>
              </div>
              <div className="bar">
                <div className="income" style={{ height: "20%" }}>
                  Pemasukkan
                </div>
                <div className="expense" style={{ height: "80%" }}>
                  Pengeluaran
                </div>
                <p>Agustus</p>
              </div>
              <div className="bar">
                <div className="income" style={{ height: "45%" }}>
                  Pemasukkan
                </div>
                <div className="expense" style={{ height: "55%" }}>
                  Pengeluaran
                </div>
                <p>September</p>
              </div>
            </div>
            <div className="legend">
              <div className="income-legend">
                <span />: Pemasukkan
              </div>
              <div className="expense-legend">
                <span />: Pengeluaran
              </div>
            </div>
          </div>
        </section>
        <Footer/>
    </>
  );
}

export default Keuangan;
