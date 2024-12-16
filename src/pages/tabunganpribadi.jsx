import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const formatTanggal = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function Tabunganpribadi() {
  const { id } = useParams(); 
  const [tabungan, setTabungan] = useState(null); 
  const [frequency, setFrequency] = useState("Mingguan");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    judul: "",
    target_tabungan: "",
    nominal_setor: "",
    tanggal_awal_setor: "",
    tanggal_akhir_setor: "",
    unggah_gambar: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/auth/pribadi/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          console.error(`Failed to fetch, status code: ${response.status}`);
          throw new Error("Gagal mengambil data tabungan.");
        }
    
        const data = await response.json();
        setTabungan(data); 
        setFormData({
          id: data.id,
          judul: data.judul,
          target_tabungan: data.target_tabungan,
          nominal_setor: data.nominal_setor,
          tanggal_awal_setor: formatTanggal(data.tanggal_awal_setor),
          tanggal_akhir_setor: formatTanggal(data.tanggal_akhir_setor),
          unggah_gambar: data.unggah_gambar || "", 
        });
      } catch (error) {
        console.error("Error fetching tabungan data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate(-1); 
  };

  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else {
      alert("Hanya file gambar yang diperbolehkan.");
    }
  };

  const handleSave = async () => {
    // Validasi input
    if (!formData.nominal_setor || isNaN(formData.nominal_setor)) {
      alert("Nominal Setor harus berupa angka!");
      return;
    }
  
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menyimpan perubahan?");
    if (isConfirmed) {
      const token = localStorage.getItem("token");
  
      const dataToSend = new FormData();
      dataToSend.append("nominal_setor", formData.nominal_setor); // Kirim hanya nominal_setor
      dataToSend.append("id_pribadi", formData.id);
      if (file) {
        dataToSend.append("unggah_gambar", file);
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/auth/riwayatpribadi`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: dataToSend, 
        });
  
        if (!response.ok) {
          throw new Error("Gagal menyimpan data tabungan.");
        }
  
        const result = await response.json();
        alert(result.message || "Data berhasil disimpan!");
      } catch (error) {
        console.error("Error saving tabungan data:", error);
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    }
  };

  const handleCancel = () => {
    const isCancelled = window.confirm("Apakah Anda yakin ingin membatalkan perubahan?");
    if (isCancelled) {
      window.location.reload();
    }
  };

  const handleLihatTabungan = () => {
    navigate(`/list/${tabungan.id}`); // Redirect to list2/id
  };

  if (!tabungan) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <link rel="stylesheet" href="/assets/css/tabunganp.css" />
      <header>
        <img src="/assets/img/logo.png" alt="Logo" className="logo" />
        <nav className="navigation">
          <Link to="/profil">Home</Link>
          <Link to="#" className="navigation-link dropdown-toggle active">
            Tabungan
          </Link>
          <div className="dropdown-menu fade-up m-0">
            <Link to="/formbersama" className="dropdown-item">Tabungan Bersama</Link>
            <Link to="/formpribadi" className="dropdown-item">Tabungan Mandiri</Link>
          </div>
          <Link to="/keuangan">Keuangan</Link>
          <Link to="/artikel">Artikel</Link>
          <Link to="/profil">
            <button className="profile">Profile</button>
          </Link>
        </nav>
      </header>

      <main>
        <section className="edit-tabungan-container">
          <div className="back-button" onClick={handleBack}>
            ⬅️
          </div>
          <h1>{tabungan.judul}</h1>
          <div className="form-container">
            <div className="image-section">
              <img
                src={`/assets/img/${tabungan.unggah_gambar || 'default.jpg'}`}
                alt={tabungan.judul}
                className="tabungan-image"
              />
             <button className="lihat-tabungan" onClick={handleLihatTabungan}>
                Lihat Tabungan
              </button>
            </div>
            <div className="form-section">
              <div className="form-group">
                <label>Judul</label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Target</label>
                <input
                  type="text"
                  value={formData.target_tabungan}
                  onChange={(e) => setFormData({ ...formData, target_tabungan: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Nominal Setor</label>
                <input
                  type="text"
                  value={formData.nominal_setor}
                  onChange={(e) => setFormData({ ...formData, nominal_setor: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Tanggal Awal Setor</label>
                <input
                  type="date"
                  value={formData.tanggal_awal_setor.split("/").reverse().join("-")}
                  onChange={(e) => setFormData({ ...formData, tanggal_awal_setor: e.target.value })}
                />
              </div>
              <div className="form-group frekuensi">
                {["Harian", "Mingguan", "Bulanan"].map((freq) => (
                  <button
                    key={freq}
                    className={`frekuensi-btn ${freq === frequency ? "active" : ""}`}
                    onClick={() => handleFrequencyChange(freq)}
                  >
                    {freq}
                  </button>
                ))}
              </div>
              <div className="form-group">
                <label>Tanggal Akhir Setor</label>
                <input
                  type="date"
                  value={formData.tanggal_akhir_setor.split("/").reverse().join("-")}
                  onChange={(e) => setFormData({ ...formData, tanggal_akhir_setor: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Unggah Gambar</label>
                <input type="file" onChange={handleFileChange} />
                {file && <p>{file.name}</p>}
              </div>
              <div className="form-actions">
                <button className="btn batal" onClick={handleCancel}>
                  Batal
                </button>
                <button className="btn simpan" onClick={handleSave}>
                  Simpan
                </button>
              </div>
            </div>
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
    </>
  );
}

export default Tabunganpribadi;
