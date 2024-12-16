import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../component/navbar"
import Footer from "../component/footer";
function Home() {
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

  return (
    <Fragment>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Tabungan</title>
      <link rel="stylesheet" href="/assets/css/home.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <script src="https://cdn.tailwindcss.com"></script>
      <header>
        <Navbar/>
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
          <section className="welcome-section">
            <div>
              <img src="assets/img/uang.jpg" alt="Money Icon" />
              <h2>Selamat Datang di Tabungin!</h2>
              <p>Mulai perjalanan menabungmu dengan mudah dan menyenangkan. Atur anggaran, lacak pengeluaran, dan wujudkan impian finansialmu bersama kami. Bersama Tabungin, menabung jadi lebih simpel, terencana, dan penuh motivasi!</p>
            </div>
          </section>
          <section className="tabungan-section">
            <h2>Ini Tabunganku</h2>
            <div className="carousel">
              <button className="arrow left">&lt;</button>
              <div className="cards">
                <div className="card">
                  <img src="assets/img/macbook.jpg" alt="Macbook" />
                  <h2>Macbook</h2>
                  <p>Target Tabungan: Rp. 30.000.000</p>
                  <p>Jumlah Tabungan: Rp. 15.000.000</p>
                  <Link to="/tabunganpribadi/2">
                    <button className="detail-button">Lihat Detail</button>
                  </Link>
                </div>
                <div className="card">
                  <img src="assets/img/skincare.jpeg" alt="Skincare" />
                  <h2>Skincare</h2>
                  <p>Target Tabungan: Rp. 1.000.000</p>
                  <p>Jumlah Tabungan: Rp. 300.000</p>
                  <Link to="/tabunganpribadi/2">
                    <button className="detail-button">Lihat Detail</button>
                  </Link>
                </div>
                <div className="card">
                  <img src="assets/img/holiday.jpg" alt="Holiday" />
                  <h2>Holiday</h2>
                  <p>Target Tabungan: Rp. 50.000.000</p>
                  <p>Jumlah Tabungan: Rp. 20.000.000</p>
                  <Link to="/tabunganbersama"><a href="tabunganbersama.html">
                    <button className="detail-button">Lihat Detail</button>
                  </a></Link>
                </div>
                <div className="card">
                  <img src="assets/img/b'day.jpg" alt="Birthday Party" />
                  <h2>Birthday Party</h2>
                  <p>Target Tabungan: Rp. 1.000.000</p>
                  <p>Jumlah Tabungan: Rp. 300.000</p>
                  <Link to="/tabunganbersama"><a href="tabunganbersama.html">
                    <button className="detail-button">Lihat Detail</button>
                  </a></Link>
                </div>
              </div>
              <button className="arrow right">&gt;</button>
            </div>
          </section>
          <section className="finance-section">
            <div>
              <h1>Keuanganku</h1>
              <div className="income-section">
                <div className="income-label">
                  <span>💰 Penghasilan</span>
                  <span className="income-value">Rp 5.250.000</span>
                </div>
              </div>
              <div className="income-actions">
                <button className="edit-btn">Edit</button>
                <button className="save-btn">Simpan</button>
              </div>
              <div className="income-notes">
                <p>*Penghasilanmu berhasil ditambahkan: Rp 5.000.000</p>
                <p>*Tambah penghasilan Rp 250.000 berhasil!</p>
              </div>
              <div className="allocation-section">
                <h2>Alokasi Danaku</h2>
                <button className="detail-btn">Lihat Detail</button>
                
              </div>
              <div className="content-grid1">
              <button className="arrow left">&lt;</button>
                  <div className="content-grid-item">
                    <img src="assets/img/HOME1.png" alt="Kebutuhan Pribadi" className="grid-image" />
                    <p>Kebutuhan Pribadi</p>
                    <span>Rp 1.000.000</span>
                  </div>
                  <div className="content-grid-item">
                    <img src="assets/img/HOME2.png" alt="Belanja Bulanan"  className="grid-image" />
                    <p>Belanja Bulanan</p>
                    <span>Rp 2.000.000</span>
                  </div>
                  <div className="content-grid-item">
                    <img src="assets/img/HOME3.png" alt="Transportasi"  className="grid-image" />
                    <p>Transportasi</p>
                    <span>Rp 500.000</span>
                  </div>
                  <button className="arrow right">&gt;</button>
                </div>
              <div className="expenses-section">
                <h2>Pengeluaranku</h2>
                <p className="expenses-section1">Lihat status keuangan</p>
                <div className="expenses-summary">
                  <div className="expense-card">
                    <p>Jumlah Pemasukkan</p>
                    <span>Rp 5.000.000</span>
                  </div>
                  <div className="expense-card">
                    <p>Jumlah Pengeluaran</p>
                    <span>Rp 3.500.000</span>
                  </div>
                  <div className="expense-card">
                    <p>Tabungan</p>
                    <span>Rp 1.500.000</span>
                  </div>
                </div>
                <button className="detail-btn-2">Lihat Detail Pengeluaran</button>
              </div>
            </div>
          </section>
          <section className="section">
            <div>
              <h1>Artikel</h1>
              <p className="trending-label">Trending :</p>
              <nav className="trending-nav">
                <Link to="/isiartikel"><a href="isiartikel.html">Tips Menabung</a></Link>
                <Link to="/isiartikel"><a href="isiartikel.html">Investasi</a></Link>
                <Link to="/isiartikel"><a href="isiartikel.html">Menabung Efektif</a></Link>
                <Link to="/isiartikel"><a href="isiartikel.html">Strategi Investasi</a></Link>
                <Link to="/isiartikel"><a href="isiartikel.html">Cara Hemat</a></Link>
                <Link to="/isiartikel"><a href="isiartikel.html">Bagaimana Cara</a></Link>
                <a href="#" className="arrow">
                  →
                </a>
              </nav>
              <div className="content">
                <div className="articles">
                  <div className="article-card">
                    <img src="assets/img/artikel1.jpeg" alt="Tips Menabung Cepat" />
                    <h2>Tips Menabung Cepat</h2>
                    <p>
                      Menabung adalah langkah penting dalam mewujudkan impian
                      finansial, mulai dari membeli barang impian.
                    </p>
                    <Link to="/isiartikel">
                      <a href="isiartikel.html">
                        <button className="read-more">Baca Selengkapnya</button>
                      </a>
                    </Link>
                  </div>
                  <div className="article-card">
                    <img src="assets/img/artikel2.jpg" alt="Menabung dengan Bijak" />
                    <h2>Menabung dengan Bijak</h2>
                    <p>
                      Menabung dengan bijak adalah keterampilan penting yang dapat
                      membantu Anda mencapai stabilitas.
                    </p>
                    <button className="read-more">Baca Selengkapnya</button>
                  </div>
                  <div className="article-card">
                    <img src="assets/img/artikel3.jpg" alt="Strategi Menabung Pemula" />
                    <h2>Strategi Menabung Pemula</h2>
                    <p>
                      Menabung mungkin terasa sulit bagi pemula, terutama jika belum
                      terbiasa.
                    </p>
                    <button className="read-more">Baca Selengkapnya</button>
                  </div>
                  <div className="article-card">
                    <img src="assets/img/artikel4.png" alt="Nabung Dana Darurat" />
                    <h2>Nabung Dana Darurat</h2>
                    <p>
                      Menyisihkan dana untuk keperluan mendesak adalah langkah cerdas
                      yang bisa menyelamatkan keuangan Anda.
                    </p>
                    <button className="read-more">Baca Selengkapnya</button>
                  </div>
                </div>
                <aside className="sidebar">
                  <div className="search-bar">
                    <input type="text" placeholder="Cari Artikel" />
                    <button>🔍</button>
                  </div>
                  <h3>Artikel Populer</h3>
                  <ul className="popular-articles">
                    <li>
                      <a href="#">Rahasia Menabung di Tengah...</a>
                    </li>
                    <li>
                      <a href="#">Cara Menabung Tanpa Meng...</a>
                    </li>
                    <li>
                      <a href="#">5 Strategi Menabung Cerdas</a>
                    </li>
                    <li>
                      <a href="#">Menabung di Era Digital</a>
                    </li>
                    <li>
                      <a href="#">Menabung untuk Liburan</a>
                    </li>
                    <li>
                      <a href="#">Menabung di Usia 30-an</a>
                    </li>
                    <li>
                      <a href="#">Panduan Menabung</a>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
          </section>
        </main>
        <Footer/>
    </Fragment>

  );
}

export default Home;