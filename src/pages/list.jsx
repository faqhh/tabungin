import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function List2() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Bayar tagihan listrik sebelum 30 November.", type: "Pengingat" },
    { id: 2, message: "Gaji sebesar Rp 20.000.000 telah diterima.", type: "Pemasukan" },
    { id: 3, message: "Dividen saham sebesar Rp 2.000.000 telah diterima.", type: "Investasi" },
  ]);
  
  const [isNotificationPanelVisible, setIsNotificationPanelVisible] = useState(false);

  const toggleNotificationPanel = () => {
    setIsNotificationPanelVisible(!isNotificationPanelVisible);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setIsNotificationPanelVisible(false);
  };

  const [progress, setProgress] = useState(10);
  const [terkumpul, setTerkumpul] = useState(100000);
  const [target] = useState(30000000);
  const [kekurangan, setKekurangan] = useState(target - terkumpul);
  const [estimasiTanggal, setEstimasiTanggal] = useState("30/05/2030");

  useEffect(() => {
    // Update progress after 3 seconds
    const progressTimer = setTimeout(() => {
      setProgress(20);
    }, 3000);

    // Update estimasi tanggal after 5 seconds
    const tanggalTimer = setTimeout(() => {
      setEstimasiTanggal("01/06/2030");
    }, 5000);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(tanggalTimer);
    };
  }, []);

  useEffect(() => {
    setKekurangan(target - terkumpul);
  }, [terkumpul, target]);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(angka);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleProfileClick = () => {
    alert("Navigasi ke halaman Profile!");
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Detail Tabungan</title>
      <link rel="stylesheet" href="/assets/css/listT.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
          <header>
        <img src="/assets/img/logo.png" alt="Logo" className="logo" />
        <nav className="navigation">
          <Link to="/home"><a href="home.html">Home</a></Link>
          <a href="#" className="navigation-link dropdown-toggle text-green-500 active" data-bs-toggle="dropdown">Tabungan</a>
          <div className="dropdown-menu fade-up m-0">
            <Link to="/formbersama">
              <a href="formbersama.html" className="dropdown-item">Tabungan Bersama</a>
            </Link>
            <Link to="/formpribadi">
              <a href="formpribadi.html" className="dropdown-item">Tabungan Mandiri</a>
            </Link>
          </div>
          <Link to="/keuangan"><a href="keuangan.html">Keuangan</a></Link>
          <Link to="/artikel"><a href="Artikel.html">Artikel</a></Link>
          <div className="profile-section">
            <button className="notification-bell" onClick={toggleNotificationPanel}>
              <FontAwesomeIcon icon={faBell} />
              {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
            </button>
            <Link to="/profil">
              <a href="profil.html">
                <button className="profile">Profile</button>
              </a>
            </Link>
          </div>
        </nav>
      </header>
      {isNotificationPanelVisible && (
        <div className="notification-panel">
          <h3>Notifications</h3>
          <ul>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification.id} className="border-notif">
                  <strong>{notification.type}:</strong> {notification.message}
                </li>
              ))
            ) : (
              <li>No new notifications</li>
            )}
          </ul>
          <button onClick={clearNotifications}>Clear All</button>
        </div>
      )}
      <main>
      <div className="container">
        <div className="header">
          <     button className="back-button" onClick={handleBack}>⬅️</button>
          <h1>Macbook</h1>
        </div>
        <div className="content">
          <div className="image-section">
            <img
              src="/assets/img/macbook.jpg"
              alt="Macbook"
              className="image-preview"
            />
            <div className="details">
              <label>Judul</label>
              <input type="text" defaultValue="Macbook" disabled="" />
              <label>Target</label>
              <input type="text" defaultValue="Rp 30.000.000" disabled="" />
            </div>
          </div>
          <div className="progress-section">
            <div className="target">
              <h2>Rp 30.000.000</h2>
              <p>Rp 1.000.000 Perbulan</p>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: "10%" }} />
            </div>
            <p className="progress-text">8%</p>
            <div className="progress-date">
             <p>
                <strong>Tanggal Dibuat:</strong> 30/10/2024
              </p>
              <p>
                <strong>Estimasi Tanggal Ketercapaian:</strong> 30/05/2030
              </p>
            </div>
          </div>
          <div className="history">
            <div className="summary-section">
              <div className="col">
                <h3>Terkumpul</h3>
                <p>Rp 1.000.000</p>
              </div>
              <div className="col">
                <h3>Kekurangan</h3>
                <p>Rp 29.000.000</p>
              </div>
            </div>
            <h4>30 Oktober 2024 - 12:00</h4>
            <p>Rabu, 30 Oktober 2024</p>
            <p className="amount">+ Rp 100.000</p>
          </div>
        </div>
      </div>
      </main>
      <footer className="footer">
        <div className="footer-left">
          <p>© 2024 Tabungin Inc.</p>
          <a href="#">Terms & conditions</a>
          <a href="#">Privacy policy</a>
          <a href="#">Contact us</a>
        </div>
        <div className="footer-right">
          <a href="#">
            <img src="/assets/img/f1.jpg" alt="Instagram" />
          </a>
          <a href="#">
            <img src="/assets/img/f2.jpg" alt="Facebook" />
          </a>
          <a href="#">
            <img src="/assets/img/f3.jpg" alt="YouTube" />
          </a>
          <a href="#">
            <img src="/assets/img/f4.jpg" alt="LinkedIn" />
          </a>
          <a href="#">
            <img src="/assets/img/f5.jfif" alt="Twitter" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default List2;
