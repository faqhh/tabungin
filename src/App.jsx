import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/home";
import Artikel from "./pages/artikel";
import Formbersama from "./pages/formbersama";
import Formpribadi from "./pages/formpribadi";
import Isiartikel from "./pages/isiartikel";
import Keuangan from "./pages/keuangan";
import List from "./pages/list";
import List2 from "./pages/list2";
import ListBersama from "./pages/listBersama";
import Listmandiri from "./pages/listmandiri";
import Profil from "./pages/profil";
import Tabunganbersama from "./pages/tabunganbersama";
import Tabunganpribadi from "./pages/tabunganpribadi";
import Login from "./pages/login";
import EditBersama from "./pages/editbersama";
import EditPribadi from "./pages/editpribadi";



function App(root) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/formbersama" element={<Formbersama />} />
        <Route path="/formpribadi" element={<Formpribadi />} />
        <Route path="/isiartikel" element={<Isiartikel />} />
        <Route path="/keuangan" element={<Keuangan />} />
        <Route path="/list/:id" element={<List />} />
        <Route path="/list2/:id" element={<List2 />} />
        <Route path="/listBersama" element={<ListBersama />} />
        <Route path="/listmandiri" element={<Listmandiri />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/tabunganbersama/:id" element={<Tabunganbersama />} />
        <Route path="/tabunganpribadi/:id" element={<Tabunganpribadi />} />
        <Route path="/editbersama/:id" element={<EditBersama />} />
        <Route path="/editpribadi/:id" element={<EditPribadi />} />
      </Routes>
    </Router>
  );
}

export default App;
