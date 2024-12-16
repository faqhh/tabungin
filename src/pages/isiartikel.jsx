import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Footer from "../component/footer";

function Isiartikel() {
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

  const [searchText, setSearchText] = useState("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const navigate = useNavigate();

  // Efek scroll untuk tombol "Scroll to Top"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi untuk menangani pencarian
  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  // Daftar trending links untuk demo
  const trendingLinks = [
    "Tips Menabung",
    "Investasi",
    "Menabung Efektif",
    "Strategi Investasi",
    "Cara Hemat",
    "Bagaimana Cara",
  ];

  // Filter trending links berdasarkan pencarian
  const filteredLinks = trendingLinks.filter((link) =>
    link.toLowerCase().includes(searchText)
  );

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Financial Management</title>
      <link rel="stylesheet" href="assets/css/isiartikel.css" />
      <header>
        <img src="assets/img/logo.png" alt="Logo" className="logo" />
        <nav className="navigation">
          <Link to="/home"><a href="home.html">Home</a></Link>
          <a href="#" className="navigation-link dropdown-toggle text-green-500" data-bs-toggle="dropdown">Tabungan</a>
          <div className="dropdown-menu fade-up m-0">
            <Link to="/formbersama">
              <a href="formbersama.html" className="dropdown-item">Tabungan Bersama</a>
            </Link>
            <Link to="/formpribadi">
              <a href="formpribadi.html" className="dropdown-item">Tabungan Mandiri</a>
            </Link>
          </div>
          <Link to="/keuangan"><a href="keuangan.html">Keuangan</a></Link>
          <Link to="/artikel"><a href="Artikel.html"  className="active">Artikel</a></Link>
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
      <section className="trending">
        <h2>Trending:</h2>
        {filteredLinks.map((link, index) => (
          <Link
            key={index}
            to="#"
            className="trending-link"
          >
            {link}
          </Link>
        ))}
      </section>

      <div className="container">
        <span className="back-button" onClick={() => navigate(-1)}>
          ←
        </span>

        <div className="search-box">
          <input
            type="text"
            placeholder="Cari Artikel"
            value={searchText}
            onChange={handleSearch}
          />
        </div>

        <div className="article-image">
          <img src="assets/img/artikel1.jpeg" alt="Gambar Artikel" />
        </div>

        <div className="article-content">
          <h1>Tips Menabung Cepat: 3 Langkah Efektif untuk Mencapai Target Finansial</h1>
          <p>
            Menabung dengan cepat bisa menjadi tantangan, tetapi dengan strategi
            yang tepat, tujuan finansialmu bisa tercapai lebih mudah. Berikut 3 tips
            penting untuk menabung dengan cepat dan efektif:
          </p>
          <p>
            <strong>1. Tentukan Tujuan Tabungan yang Spesifik:</strong> Miliki
            tujuan tabungan yang jelas dan spesifik, seperti menabung untuk dana
            darurat atau liburan. Tentukan jumlah yang ingin kamu capai dan waktu
            yang dibutuhkan. Dengan tujuan yang konkret, kamu akan lebih termotivasi
            dan terarah dalam menabung.
          </p>
          <p>
            <strong>2. Buat Rencana Anggaran dan Kontrol Pengeluaran:</strong> Susun
            anggaran bulanan yang memisahkan antara kebutuhan dan keinginan. Batasi
            pengeluaran yang tidak penting dan alokasikan sebagian dari penghasilan
            untuk ditabung sejak awal.
          </p>
          <p>
            <strong>3. Kurangi Pengeluaran Kecil yang Tidak Perlu:</strong> Evaluasi
            pengeluaran harian dan bulanan, seperti langganan yang jarang digunakan
            atau kebiasaan membeli kopi setiap hari.
          </p>
        </div>
      </div>

      {showScrollToTop && (
        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
      <Footer/>
    </div>
  );
}

export default Isiartikel;
