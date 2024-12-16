import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

// Fungsi untuk memformat tanggal menjadi dd/mm/yyyy
const formatTanggal = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function EditBersama() {
  const { id } = useParams(); // Ambil ID dari parameter URL
  const [tabungan, setTabungan] = useState(null); // Simpan data tabungan
  const [frequency, setFrequency] = useState("Mingguan");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    judul: "",
    target_tabungan: "",
    nominal_setor: "",
    tanggal_awal_setor: "",
    tanggal_akhir_setor: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data tabungan berdasarkan ID
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/auth/bersama/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          console.error(`Failed to fetch, status code: ${response.status}`);
          throw new Error("Gagal mengambil data tabungan.");
        }
    
        const data = await response.json();
        setTabungan(data); // Save the data
        setFormData({
          id: data.id,
          judul: data.judul,
          target_tabungan: data.target_tabungan,
          nominal_setor: data.nominal_setor,
          tanggal_awal_setor: formatTanggal(data.tanggal_awal_setor),
          tanggal_akhir_setor: formatTanggal(data.tanggal_akhir_setor),
          unggah_gambar: data.unggah_gambar,
        });
      } catch (error) {
        console.error("Error fetching tabungan data:", error);
      }
    };

    fetchData();
  }, [id]);

  console.log(formData);

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSave = async () => {
    // Validasi input untuk judul
    if (!formData.judul) {
      alert("Judul tidak boleh kosong!");
      return;
    }
  
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menyimpan perubahan?");
    if (isConfirmed) {
      const token = localStorage.getItem("token");
  
      const dataToSend = new FormData();
      dataToSend.append("judul", formData.judul); // Kirim hanya judul
  
      // Jika ada file gambar yang diupload, kirim file tersebut
      if (file) {
        dataToSend.append("unggah_gambar", file); // Kirim file gambar
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/auth/bersama/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: dataToSend, // Kirim FormData yang berisi data judul dan gambar
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
    navigate(`/list2/${tabungan.id}`); // Redirect to list2/id
  };

  if (!tabungan) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <link rel="stylesheet" href="/assets/css/tabunganbersama.css" />
      <header>
        <Navbar/>
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
                src={`/assets/img/${tabungan.unggah_gambar}`}
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
        <Footer/>
      </main>
    </>
  );
}

export default EditBersama ;
