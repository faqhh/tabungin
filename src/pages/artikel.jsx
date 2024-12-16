import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

function Artikel() {
  const [searchTerm, setSearchTerm] = useState(""); 

  const articles = [
    {
      id: 1,
      image: "assets/img/artikel1.jpeg",
      title: "Tips Menabung Cepat",
      description: "Menabung adalah langkah penting dalam perencanaan finansial...",
      link: "/isiartikel",
    },
    {
      id: 2,
      image: "assets/img/artikel2.jpg",
      title: "Menabung dengan Bijak",
      description: "Menabung dengan bijak adalah keterampilan penting...",
      link: "/isiartikel",
    },
    {
      id: 3,
      image: "assets/img/artikel3.jpg",
      title: "Strategi Menabung Cerdas",
      description: "Pelajari strategi menabung yang paling efektif...",
      link: "/isiartikel",
    },
    {
      id: 4,
      image: "assets/img/artikel4.png",
      title: "Nabung Dana Darurat",
      description: "Menyisihkan dana untuk keperluan mendesak adalah langkah cerdas yang bisa menyelamatkan keuangan Anda...",
      link: "/isiartikel",
    },
    {
      id: 5,
      image: "assets/img/artikel5.jpeg",
      title: "Keuntungan Menabung",
      description: "Menabung adalah langkah sederhana yang bisa memberikan manfaat besar bagi masa depan keuangan Anda...",
      link: "/isiartikel",
    },
    {
      id: 6,
      image: "assets/img/artikel6.jpg",
      title: "Raih Tujuan Menabung",
      description: "Meraih tujuan menabung adalah langkah penting untuk mencapai impian finansial Anda. ...",
      link: "/isiartikel",
    },
  ];
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div>
      <header>
      <link rel="stylesheet" href="assets/css/Artikel.css" />
      <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <Navbar/>
      </header>

      <section className="banner">
        <div className="overlay" />
        <div className="banner-content">
          <h2>Mengatasi Tantangan Menabung</h2>
          <Link to="/isiartikel" className="btn-primary">
            Baca Selengkapnya
          </Link>
        </div>
      </section>

      <section className="trending">
        <h3>Trending:</h3>
        <Link to="/isiartikel">Tips Menabung</Link>
        <Link to="/isiartikel">Investasi</Link>
        <Link to="/isiartikel">Menabung Efektif</Link>
        <Link to="/isiartikel">Strategi Investasi</Link>
        <Link to="/isiartikel">Cara Hemat</Link>
        <Link to="/isiartikel">Bagaimana Cara</Link>
      </section>
      <div className="container">
        <aside className="sidebar">
          <input
            type="text"
            placeholder="Cari Artikel"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <h3>Artikel Populer</h3>
          <ul>
            <li><Link to="#">Rahasia Menabung di Tengah...</Link></li>
            <li><Link to="#">Cara Menabung Tanpa Meng...</Link></li>
            <li><Link to="#">5 Strategi Menabung Cerdas</Link></li>
            <li><Link to="#">Menabung di Era Digital</Link></li>
            <li><Link to="#">Menabung untuk Liburan</Link></li>
          </ul>
        </aside>

        <div className="articles">
          {filteredArticles.map((article) => (
            <div key={article.id} className="card">
              <img src={article.image} alt={`Gambar ${article.title}`} />
              <h4>{article.title}</h4>
              <p>{article.description}</p>
              <Link to={article.link} className="btn-secondary">
                Baca Selengkapnya
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Artikel;
