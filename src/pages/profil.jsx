import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";

// function Profil() {
//   const [profilePhotoUrl, setProfilePhotoUrl] = useState(""); 
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         console.log(token);
//         const response = await fetch("http://localhost:5000/api/auth/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log(data);
//           setProfile({
//             name: data.name,
//             email: data.email,
//             password: "*******", 
//           });
//           setProfilePhotoUrl(`http://localhost:5000/uploads/${data.profilePhoto}`);
//         } else {
//           alert("Gagal memuat profil. Harap login kembali.");
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const changeProfilePhoto = () => {
//     const fileInput = document.getElementById("fileInput");
//     fileInput.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       console.log("File yang dipilih:", file);
//     }
//   };

//   const handleUploadPhoto = async () => {
//     if (!selectedFile) {
//       alert("Pilih foto terlebih dahulu.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("profile_picture", selectedFile);
  
//     const token = localStorage.getItem("token");
  
//     try {
//       const response = await fetch("http://localhost:5000/api/auth/profile-photo", {
//         method: "PUT",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         },
//         body: formData,
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         setProfilePhotoUrl(data.profile_picture_url);
//         alert("Foto profil berhasil diubah.");
//       } else {
//         alert("Gagal mengubah foto profil.");
//       }
//     } catch (error) {
//       console.error("Error updating profile photo:", error);
//       alert("Terjadi kesalahan saat mengubah foto profil.");
//     }
//   };
  
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setProfile({ ...profile, [id]: value });
//   };

//   const saveChanges = async (event) => {
//     event.preventDefault(); 
//     const updatedProfile = { ...profile };
//     if (updatedProfile.password === "*******") {
//       delete updatedProfile.password;
//     }
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:5000/api/auth/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(profile),
//       });

//       if (response.ok) {
//         alert("Perubahan berhasil disimpan.");
//       } else {
//         alert("Gagal menyimpan perubahan.");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setProfile((prevState) => ({
//       ...prevState,
//       password: "****",
//     }));
//   };

//   const logOut = () => {
//     if (window.confirm("Apakah Anda yakin ingin keluar?")) {
//       localStorage.removeItem("token");
//       navigate("/");
//     }
//   };

//   const deleteAccount = async () => {
//     if (window.confirm("Apakah Anda yakin ingin menghapus akun Anda?")) {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:5000/api/auth/profile", {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           alert("Akun berhasil dihapus.");
//           logOut();
//         } else {
//           alert("Gagal menghapus akun.");
//         }
//       } catch (error) {
//         console.error("Error deleting account:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };
function Profil() {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(""); 
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { id, value } = e.target; // Ambil id dan value dari input
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value, // Perbarui hanya field yang sesuai dengan id
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile({
            name: data.name,
            email: data.email,
            password: "*******",
          });
          setProfilePhotoUrl(`http://localhost:5000/uploads/${data.profilePhoto}`);
        } else {
          alert("Gagal memuat profil. Harap login kembali.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const changeProfilePhoto = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) {
      alert("Pilih foto terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/auth/profile-photo", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfilePhotoUrl(data.profile_picture_url);
        alert("Foto profil berhasil diubah.");
      } else {
        alert("Gagal mengubah foto profil.");
      }
    } catch (error) {
      console.error("Error updating profile photo:", error);
      alert("Terjadi kesalahan saat mengubah foto profil.");
    }
  };

  const saveChanges = async (event) => {
    event.preventDefault();
    const updatedProfile = { ...profile };
    if (updatedProfile.password === "*******") {
      delete updatedProfile.password;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        alert("Perubahan berhasil disimpan.");
      } else {
        alert("Gagal menyimpan perubahan.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProfile((prevState) => ({
      ...prevState,
      password: "*******",
    }));
  };

  const logOut = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const deleteAccount = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus akun Anda?")) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Akun berhasil dihapus.");
          logOut();
        } else {
          alert("Gagal menghapus akun.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Fragment>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Tabungan</title>
      <link rel="stylesheet" href="/assets/css/profil.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <script src="https://cdn.tailwindcss.com"></script>
      <header>
        <Navbar/>
      </header>
      <div className="wrapper">
        <div className="profile-container">
          <div className="profile-card">
            <h2>Profile & Pengaturan</h2>
            <div className="profile-content">
            <div className="profile-header">
              <img
                src={"/src/assets/img/profile.jpg"}
                alt="Foto Profil"
                className="profile-photo"
                id="profilePhoto"
              />
              <button className="change-button" onClick={changeProfilePhoto}>
                Ubah
              </button>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept="image/*" // Hanya menerima file gambar
                onChange={handleFileChange}
              />
            </div>
              <form className="profile-form" onSubmit={saveChanges}>
              <div className="form-group">
                <label htmlFor="name">Nama</label>
                <input
                  type="text"
                  id="name"
                  value={profile.name}
                  onChange={handleInputChange} // Menggunakan fungsi handleInputChange
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    placeholder="Masukkan email Anda"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Kata Sandi</label>
                  <input
                    type="password"
                    id="password"
                    value={profile.password === "*******" ? "" : profile.password}
                    onChange={handleInputChange}
                    placeholder="Masukkan password Anda"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="language">Bahasa</label>
                  <input type="text" id="language" defaultValue="Bahasa Indonesia" />
                </div>
                <div className="form-buttons">
                  <button type="button" className="cancel-button" onClick={resetForm}>
                    Batal
                  </button>
                  <button type="submit" className="save-button">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-footer">
              <p>
                <a href="#">Privacy Policy</a> | <a href="#">FAQ & Bantuan</a> |{" "}
                <a href="#">Help Center</a>
              </p>
              <div className="footer-buttons">
                <button className="logout-button" onClick={logOut}>
                  Log Out
                </button>
                <button className="delete-account-button" onClick={deleteAccount}>
                  Delete Account
                </button>
              </div>
            </div>
        <footer className="footer">
          <div className="footer-left">
            <p>© 2024 Tabungin Inc.</p>
            <a href="#">Terms & conditions</a>
            <a href="#">Privacy policy</a>
            <a href="#">Contact us</a>
          </div>
          <div className="footer-right">
            <a href="#">
              <img src="assets/img/f1.jpg" alt="Instagram" />
            </a>
            <a href="#">
              <img src="assets/img/f2.jpg" alt="Facebook" />
            </a>
            <a href="#">
              <img src="assets/img/f3.jpg" alt="YouTube" />
            </a>
            <a href="#">
              <img src="assets/img/f4.jpg" alt="LinkedIn" />
            </a>
            <a href="#">
              <img src="assets/img/f5.jfif" alt="Twitter" />
            </a>
          </div>
        </footer>
    </Fragment>
  );
}

export default Profil;
