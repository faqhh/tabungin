import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

function Formbersama() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: "", // Inisialisasi dengan string kosong
    target_tabungan: "", // Inisialisasi dengan string kosong
    tanggal_awal_setor: "2024-10-24", // Nilai default
    tanggal_akhir_setor: "2024-10-24", // Nilai default
    nominal_setor: "", // Inisialisasi dengan string kosong
    invite: "", // Inisialisasi dengan string kosong
    unggah_gambar: "Pilih File", // Nilai default
    frekuensi_setor: "Mingguan", // Nilai default
  });
  

  const [errors, setErrors] = useState({});

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle perubahan frekuensi
  const handleFrequencyChange = (freq) => {
    setFormData((prevData) => ({ ...prevData, frekuensi_setor: freq }));
  };

  // Handle upload file
  const handleUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = () => {
      if (fileInput.files.length > 0) {
        setFormData((prevData) => ({
          ...prevData,
          unggah_gambar: fileInput.files[0].name,
        }));
      }
    };

    fileInput.click();
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validasi form
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "unggah_gambar") {
        newErrors[key] = "Harap isi field ini!";
      }
    });
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Harap isi semua data pada formulir!");
      return;
    }
  
    // Kirim data form ke server
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("Token tidak ditemukan. Pastikan Anda sudah login.");
        return;
      }
  
      const response = await fetch("http://localhost:5000/api/auth/bersama", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json", // Kirim data dalam format JSON
        },
        body: JSON.stringify(formData), // Data yang akan dikirim
      });
  
      // Cek apakah respons sukses atau tidak
      if (response.ok) {
        alert("Tabungan berhasil dibuat!");
        navigate("/listBersama");
      } else {
        // Tangani error respons
        const errorData = await response.json();
        console.error("Error dari server:", errorData);
        alert(`Gagal membuat tabungan: ${errorData.message || 'Periksa data yang Anda masukkan.'}`);
      }
    } catch (error) {
      // Tangani error yang mungkin terjadi
      console.error("Error saat mengirim data:", error);
      alert("Terjadi kesalahan saat menghubungkan ke server.");
    }
  };
  
  return (
    <>
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Tabungan Form</title>
      <link rel="stylesheet" href="assets/css/formpribadi.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <header>
        <Navbar/>
      </header>
      <section>
        <div className="main-container">
          <div className="form-container">
            <h2>Ayoo buat tabungan dengan teman atau keluargamu!</h2>
            <form className="savings-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Judul</label>
                  <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    placeholder="Ketik judul di sini yaa"
                    onChange={handleInputChange}
                    style={{
                      border: errors.judul ? "2px solid red" : "",
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Target</label>
                  <input
                    type="text"
                    name="target_tabungan"
                    value={formData.target_tabungan}
                    placeholder="Rp"
                    onChange={handleInputChange}
                    style={{
                      border: errors.target_tabungan ? "2px solid red" : "",
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Jenis Tabungan</label>
                <div className="select-box">Bersama</div>
              </div>
              <div className="form-group">
                <label>Tanggal Awal Setor</label>
                <input
                  type="date"
                  name="tanggal_awal_setor"
                  value={formData.tanggal_awal_setor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group frequency">
                <label>Frekuensi Setor</label>
                <div className="frequency-options">
                  {["Harian", "Mingguan", "Bulanan"].map((freq) => (
                    <button
                      type="button"
                      key={freq}
                      className={formData.frekuensi_setor === freq ? "active" : ""}
                      onClick={() => handleFrequencyChange(freq)}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Tanggal Akhir Setor</label>
                <input
                  type="date"
                  name="tanggal_akhir_setor"
                  value={formData.tanggal_akhir_setor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Nominal Setor</label>
                <input
                  type="text"
                  name="nominal_setor" 
                  value={formData.nominal_setor} 
                  placeholder="Rp."
                  onChange={handleInputChange}
                  style={{
                    border: errors.nominal_setor ? "2px solid red" : "",
                  }}
                />
              </div>
              <div className="form-group">
                <label>Unggah Gambar</label>
                <button type="button" className="upload-btn" onClick={handleUpload}>
                  {formData.unggah_gambar}
                </button>
              </div>
              <div className="form-group">
                <label>Undang Teman</label>
                <input
                  type="text"
                  name="invite"
                  value={formData.invite}
                  placeholder="Ketik username di sini yaa"
                  onChange={handleInputChange}
                  style={{
                    border: errors.invite ? "2px solid red" : "",
                  }}
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel"
                  onClick={() => navigate("/home")}
                >
                  Batal
                </button>
                <button type="submit" className="save">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}

export default Formbersama;
