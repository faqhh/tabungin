import React, { useState, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const location = useLocation(); // Mendapatkan URL saat ini
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

  // Fungsi untuk menambahkan class 'active' jika URL sesuai
  // Fungsi isActive yang mendukung banyak path
    const isActive = (paths) => {
        // Jika paths adalah array, periksa apakah salah satu path cocok
        if (Array.isArray(paths)) {
        return paths.includes(location.pathname) ? "active" : "";
        }
        // Jika paths adalah string, periksa langsung
        return location.pathname === paths ? "active" : "";
    };
  

  return (
    <Fragment>
      <img src="assets/img/logo.png" alt="Logo" className="logo" />
      <nav className="navigation">
        <Link to="/home">
          <a className={isActive("/home")}>
            Home
          </a>
        </Link>
        <a 
          href="#"
          className={`navigation-link dropdown-toggle ${isActive(["/formbersama", "/formpribadi"])}`}
          data-bs-toggle="dropdown"
        >
          Tabungan
        </a>
        <div className="dropdown-menu fade-up m-0">
          <Link to="/formbersama">
            <a className={`dropdown-item`}>
              Tabungan Bersama
            </a>
          </Link>
          <Link to="/formpribadi">
            <a className={`dropdown-item`}>
              Tabungan Mandiri
            </a>
          </Link>
        </div>
        <Link to="/keuangan">
          <a className={isActive("/keuangan")}>Keuangan</a>
        </Link>
        <Link to="/artikel">
          <a className={isActive("/artikel")}>Artikel</a>
        </Link>
        <div className="profile-section">
          <button className="notification-bell" onClick={toggleNotificationPanel}>
            <FontAwesomeIcon icon={faBell} />
            {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
          </button>
          <Link to="/profil">
            <a className={isActive("/profil")}>
              <button className="profile">Profile</button>
            </a>
          </Link>
        </div>
      </nav>
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
    </Fragment>
  );
}

export default Navbar;
