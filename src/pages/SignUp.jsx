import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const formRef = useRef();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, email, password } = formData;

    if (name && username && email && password) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          alert(`Registrasi berhasil! Selamat datang, ${name}`);
          setFormData({ name: "", username: "", email: "", password: "" });
          navigate("/"); // Arahkan ke halaman login
        } else {
          alert(`Gagal: ${data.message}`);
        }
      } catch (error) {
        alert("Terjadi kesalahan saat registrasi. Pastikan backend berjalan.");
      }
    } else {
      alert("Silakan lengkapi semua field untuk mendaftar.");
    }
  };

  const handleGoogleRegister = () => {
    console.log("Continue with Google clicked!");
  };

  const handleFaq = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="register">
      <header>
        <link rel="stylesheet" href="assets/css/styles.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <img src="assets/img/logo.png" alt="Logo" className="logo" />
        <nav className="navigation">
          <Link to="/">
            <button className="profile">Login</button>
          </Link>
        </nav>
      </header>
      <main>
        <div className="register-container">
          <div className="register-box" ref={formRef}>
            <h2>Kamu Belum Mempunyai Akun, Daftarkan Sekarang!</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nama</label>
              <input
                type="text"
                id="name"
                placeholder="Masukkan Nama Anda"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Masukkan Username Anda"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Masukkan Email Anda"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Masukkan Kata Sandi"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="register-btn">
                Sign Up
              </button>
              <div className="divider">Or</div>
              <button
                type="button"
                className="google-register"
                aria-label="Continue with Google"
                onClick={handleGoogleRegister}
              >
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      </main>
      <footer>
        <button className="faq-btn" onClick={handleFaq}>
          FAQ & Bantuan <span>❓</span>
        </button>
      </footer>
    </div>
  );
}

export default SignUp;