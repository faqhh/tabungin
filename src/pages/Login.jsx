import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrUsername: formData.emailOrUsername, 
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful!", data);
        localStorage.setItem("token", data.token); // Simpan token di local storage
        navigate("/home"); // Redirect ke halaman home
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Terjadi kesalahan server. Silakan coba lagi.");
    }
  };

  const handleGoogleLogin = () => {
    alert("Logging in with Google...");
    console.log("Continue with Google clicked!");
  };

  const handleFaq = () => {
    alert("Redirecting to FAQ & Help page...");
    console.log("FAQ button clicked!");
  };

  return (
    <Fragment>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Tabungin Login Page</title>
      <link rel="stylesheet" href="assets/css/style.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
      <header>
        <img src="assets/img/logo.png" alt="Logo" className="logo" />
        <nav className="navigation">
          <Link to="/signup">
            <button className="profile">SignUp</button>
          </Link>
        </nav>
      </header>
      <main className="login-container">
        <div className="login-box">
          <h2>Kamu Sudah Mempunyai Akun, Silahkan Log In!</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email or Username</label>
            <input
              type="text"
              id="email"
              name="emailOrUsername"
              placeholder="Enter your Email or Username"
              aria-label="Email or Username"
              value={formData.emailOrUsername}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              aria-label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-btn" aria-label="Log In">
              Log In
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="divider">Or</div>
            <button
              type="button"
              className="google-login"
              aria-label="Continue with Google"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </button>
          </form>
        </div>
      </main>
      <footer>
        <button className="faq-btn" onClick={handleFaq}>
          FAQ &amp; Bantuan <span>❓</span>
        </button>
      </footer>
    </Fragment>
  );
}

export default Login;
