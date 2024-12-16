import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";

const TabunganItem = ({ tabungan, onEdit, onFavorite }) => {
  return (
    <div className="tabungan-item">
      <div className="card">
        <div className="card-header">
          <i
            className={`star-icon ${tabungan.isFavorited ? "favorited" : ""}`}
            onClick={() => onFavorite(tabungan.id)}
          >
            ★
          </i>
          <span>{tabungan.name}</span>
          <i className="edit-icon" onClick={() => onEdit(tabungan.id, tabungan.name)}>✏️</i>
        </div>
        <img src="assets/img/motor.jpg" alt={tabungan.name} className="card-image" />
      </div>
      <div className="tabungan-info">
        <div>Target <span>{tabungan.target}</span></div>
        <div>Nominal Setor <span>{tabungan.nominalSetor}</span></div>
        <div>Tanggal Awal Setor <span>{tabungan.startDate}</span></div>
        <div>Tanggal Akhir Setor <span>{tabungan.endDate}</span></div>
         <div>Nominal Saat Ini <span>{tabungan.currentAmount}</span></div> 
      </div>
    </div>
  );
};

const formatTanggal = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


const Listmandiri = () => {
  const [tabunganList, setTabunganList] = useState([]);
  const [jenisTabungan, setJenisTabungan] = useState("Mandiri");
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data dari API
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Token dari localStorage
        const response = await fetch("http://localhost:5000/api/auth/pribadi", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data tabungan.");
        }

        const data = await response.json();
        setTabunganList(data);
      } catch (error) {
        console.error("Error fetching tabungan data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectJenisTabungan = () => {
    const types = ["Bersama", "Holiday", "Birthday Party"];
    const currentIndex = types.indexOf(jenisTabungan);
    const nextIndex = (currentIndex + 1) % types.length;
    setJenisTabungan(types[nextIndex]);
  };

  const handleFavorite = (id) => {
    setTabunganList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isFavorited: !item.isFavorited } : item
      )
    );
  };

  const handleDetail = (id) => {
    navigate(`/editpribadi/${id}`);
  }

  const handleEdit = (id) => {
    navigate(`/tabunganpribadi/${id}`); 
  };

  return (
    <Fragment>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Tabungan Bersama</title>
      <link rel="stylesheet" href="assets/css/listBersama.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <header>
        <Navbar/>
      </header>
      <main>
        <section className="tabungan-container">
          <h1>Tabungan Mandiri</h1>
          <div className="tabungan-select">
            <button onClick={handleSelectJenisTabungan}>
              <span>🗂️ Pilih Jenis Tabungan</span>
              <span className="tabungan-jenis">{jenisTabungan}</span>
            </button>
          </div>
          <div className="tabungan-card">
            {tabunganList.map((tabungan) => (
              <TabunganItem
                key={tabungan.id}
                tabungan={{
                  id: tabungan.id,
                  name: tabungan.judul,
                  target: `Rp ${parseInt(tabungan.target_tabungan).toLocaleString('id-ID')}`,
                  nominalSetor: `Rp ${parseInt(tabungan.nominal_setor).toLocaleString('id-ID')}`,
                  startDate: formatTanggal(tabungan.tanggal_awal_setor),
                  endDate: formatTanggal(tabungan.tanggal_akhir_setor),
                  currentAmount: `Rp ${parseFloat(tabungan.currentAmount).toLocaleString('id-ID')}`,
                  image: `http://localhost:5000/${tabungan.unggah_gambar}`,
                }}
                onEdit={handleEdit}
                onFavorite={handleDetail}
              />
            ))}
          </div>
        </section>
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
    </Fragment>
  );
};

export default Listmandiri;
