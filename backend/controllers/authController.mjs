import multer from 'multer';
import path from 'path';
import fs from 'fs';
import database from "../config/db.mjs";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads'; // Pastikan folder uploads ada
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Menggunakan nama file unik berdasarkan waktu dan nama asli
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Menyimpan file dengan ekstensi aslinya
  }
});

// Setup multer middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Hanya izinkan file dengan ekstensi .jpg, .jpeg, .png
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    }
    cb(new Error('Hanya file gambar yang diizinkan.'));
  },
});


export const updateProfilePhoto = [
  upload.single('profile_picture'), // Middleware multer untuk menangani file upload
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token tidak tersedia!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { file } = req;
      if (!file) {
        return res.status(400).json({ message: "File foto profil tidak ditemukan." });
      }

      const profilePicturePath = file.path; // Path file yang diupload

      // Update kolom profile_picture di database
      const query = "UPDATE users SET profile_picture = ? WHERE id = ?";
      await database.execute(query, [profilePicturePath, decoded.userId]);

      return res.status(200).json({ message: "Foto profil berhasil diperbarui!", profile_picture: profilePicturePath });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Terjadi kesalahan saat memperbarui foto profil." });
    }
  }
];

export const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak tersedia!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const query = "SELECT id, name, username, email, profile_picture FROM users WHERE id = ?";
    const [rows] = await database.execute(query, [decoded.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak tersedia!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, username, email, password } = req.body;

    // Menambahkan log untuk memeriksa nilai yang diterima dari frontend
    console.log("Received data:", { name, username, email, password });

    // Ambil nilai username yang sudah ada di database
    const queryGetUser = "SELECT username FROM users WHERE id = ?";
    const [userRows] = await database.execute(queryGetUser, [decoded.userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    }

    const currentUsername = userRows[0].username;

    // Hash password jika diperbarui
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Jika tidak ada password, pastikan hashedPassword diatur ke null
    if (!password) {
      hashedPassword = null;
    }

    // Memastikan hanya nilai yang berubah yang diupdate
    const query = `
      UPDATE users 
      SET 
        name = ?, 
        username = ?, 
        email = ?, 
        password = IF(? IS NOT NULL, ?, password)
      WHERE id = ?`;

    await database.execute(query, [
      name || null,          
      username || currentUsername,  
      email || null,         
      hashedPassword,        
      hashedPassword,        
      decoded.userId,        
    ]);

    return res.status(200).json({ message: "Profil berhasil diperbarui!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak tersedia!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const query = "DELETE FROM users WHERE id = ?";
    await database.execute(query, [decoded.userId]);

    return res.status(200).json({ message: "Akun berhasil dihapus!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};


export const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  // Validasi input
  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: "Semua data wajib diisi!" });
  }

  try {
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Query untuk memasukkan data ke tabel users
    const query = "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)";
    await database.execute(query, [name, username, email, hashedPassword]);

    // Kirim respons sukses
    return res.status(201).json({ message: "Registrasi berhasil!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

export const loginUser = async (req, res) => {
  console.log(req.body); // Debug log untuk memeriksa body yang diterima

  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: "Email/Username dan Password wajib diisi!" });
  }

  try {
    const query = "SELECT * FROM users WHERE email = ? OR username = ?";
    const [rows] = await database.execute(query, [emailOrUsername, emailOrUsername]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password salah!" });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login berhasil!", token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

export const addBersamaSavings = [
  upload.single('unggah_gambar'), // Middleware untuk upload gambar
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token tidak tersedia!" });
      }

      console.log("Token diterima:", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const {
        judul,
        target_tabungan,
        tanggal_awal_setor,
        tanggal_akhir_setor,
        frekuensi_setor,
        nominal_setor
      } = req.body;

      if (!judul || !target_tabungan || !tanggal_awal_setor || !tanggal_akhir_setor || !frekuensi_setor || !nominal_setor) {
        return res.status(400).json({ message: "Semua data wajib diisi!" });
      }

      const { file } = req;
      const unggahGambarPath = file ? file.path : null;

      const query = `
        INSERT INTO bersama (judul, target_tabungan, tanggal_awal_setor, tanggal_akhir_setor, frekuensi_setor, nominal_setor, unggah_gambar, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await database.execute(query, [
        judul,
        target_tabungan,
        tanggal_awal_setor,
        tanggal_akhir_setor,
        frekuensi_setor,
        nominal_setor,
        unggahGambarPath,
        decoded.userId
      ]);

      return res.status(201).json({ message: "Tabungan bersama berhasil ditambahkan!" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  }
];

export const getBersamaSavings = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak tersedia!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Query untuk mendapatkan tabungan bersama dan jumlah nominal setor yang sudah dilakukan
    const query = `
    SELECT 
      b.id, 
      b.judul, 
      b.target_tabungan, 
      b.tanggal_awal_setor, 
      b.tanggal_akhir_setor, 
      b.frekuensi_setor, 
      b.nominal_setor, 
      b.unggah_gambar, 
      COALESCE(SUM(r.nominal_setor), 0) + b.nominal_setor AS currentAmount
    FROM 
      bersama b
    LEFT JOIN 
      riwayat_setor r ON b.id = r.id_bersama AND b.user_id = r.user_id
    WHERE 
      b.user_id = ?
    GROUP BY 
      b.id, b.judul, b.target_tabungan, b.tanggal_awal_setor, b.tanggal_akhir_setor, 
      b.frekuensi_setor, b.nominal_setor, b.unggah_gambar;
        `;

    const [rows] = await database.execute(query, [decoded.userId]);
    console.log("Data tabungan bersama:", rows);
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};


export const getBersamaSavingDetails = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak tersedia!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = req.params; // Mendapatkan ID dari parameter URL

    const query = `
      SELECT id, judul, target_tabungan, tanggal_awal_setor, tanggal_akhir_setor, frekuensi_setor, nominal_setor, unggah_gambar
      FROM bersama
      WHERE id = ? AND user_id = ?
    `;
    const [rows] = await database.execute(query, [id, decoded.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Tabungan bersama tidak ditemukan!" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

export const updateBersamaSaving = [
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token tidak tersedia!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = req.params; // Mendapatkan ID dari parameter URL

      const { nominal_setor } = req.body; // Mendapatkan nominal_setor dari body
      const file = req.file; // Mendapatkan file dari upload

      console.log("Nominal setor:", nominal_setor); // Log untuk melihat nilai nominal_setor
      console.log("File:", file); // Log untuk melihat file yang di-upload

      // Validasi nominal_setor (pastikan berupa angka positif jika ada)
      if (nominal_setor) {
        const parsedNominalSetor = parseFloat(nominal_setor);
        if (isNaN(parsedNominalSetor) || parsedNominalSetor <= 0) {
          return res.status(400).json({ message: "Nominal setor harus berupa angka positif!" });
        }
      }

      // Menyimpan gambar hanya jika ada
      const unggahGambarPath = file ? file.filename : null;

      // Timestamp untuk perubahan
      const timestamp = new Date().toISOString();

      // Membuat query untuk update, hanya mengupdate yang ada
      let updateQuery = "UPDATE bersama SET ";
      let params = [];

      if (nominal_setor) {
        updateQuery += "nominal_setor = ?, ";
        params.push(parseFloat(nominal_setor)); // Menambahkan nominal_setor jika ada
      }

      if (file) {
        updateQuery += "unggah_gambar = ?, ";
        params.push(unggahGambarPath); // Menambahkan path gambar jika ada
      }

      // Menghapus koma terakhir dan menambahkan kondisi untuk ID
      updateQuery = updateQuery.slice(0, -2); // Menghapus koma terakhir
      updateQuery += " WHERE id_bersama = ? AND user_id = ?";
      params.push(id, decoded.userId); // Menambahkan ID dan user_id untuk kondisi WHERE

      console.log("Running update query with params:", params);

      const result = await database.execute(updateQuery, params);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan atau Anda tidak memiliki akses!" });
      }

      console.log("Update result:", result); // Log hasil dari query update

      return res.status(200).json({ message: "Riwayat setor berhasil diperbarui!" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  }
];

export const updateBersama = [
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token tidak tersedia!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = req.params; // Mendapatkan ID dari parameter URL

      const { judul } = req.body; // Mendapatkan judul dari body
      const file = req.file; // Mendapatkan file dari upload

      console.log("Judul:", judul); // Log untuk melihat nilai judul
      console.log("File:", file); // Log untuk melihat file yang di-upload

      // Membuat query untuk update, hanya mengupdate kolom judul dan unggah_gambar
      let updateQuery = "UPDATE bersama SET ";
      let params = [];

      // Cek jika judul ada dan tambahkan ke query
      if (judul) {
        updateQuery += "judul = ?, ";
        params.push(judul); // Menambahkan judul jika ada
      }

      // Cek jika file ada dan tambahkan ke query
      if (file) {
        const unggahGambarPath = file.filename; // Menyimpan nama file jika ada
        updateQuery += "unggah_gambar = ?, ";
        params.push(unggahGambarPath); // Menambahkan path gambar jika ada
      }

      // Menghapus koma terakhir dan menambahkan kondisi untuk ID
      updateQuery = updateQuery.slice(0, -2); // Menghapus koma terakhir
      updateQuery += " WHERE id = ? AND user_id = ?";
      params.push(id, decoded.userId); // Menambahkan ID dan user_id untuk kondisi WHERE

      console.log("Running update query with params:", params);

      const result = await database.execute(updateQuery, params);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan atau Anda tidak memiliki akses!" });
      }

      console.log("Update result:", result); // Log hasil dari query update

      return res.status(200).json({ message: "Data berhasil diperbarui!" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  }
];


export const createRiwayat = [
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token tidak tersedia!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id_bersama, nominal_setor } = req.body; // Mendapatkan id_bersama dan nominal_setor dari body

      console.log("ID Bersama:", id_bersama); // Log untuk melihat nilai id_bersama
      console.log("Nominal setor:", nominal_setor); // Log untuk melihat nilai nominal_setor

      // Validasi nominal_setor (pastikan berupa angka positif)
      if (!nominal_setor) {
        return res.status(400).json({ message: "Nominal setor wajib diisi!" });
      }

      const parsedNominalSetor = parseFloat(nominal_setor);
      if (isNaN(parsedNominalSetor) || parsedNominalSetor <= 0) {
        return res.status(400).json({ message: "Nominal setor harus berupa angka positif!" });
      }

      // Timestamp untuk perubahan
      const timestamp = new Date().toISOString();

      // Membuat query untuk menambahkan riwayat setor baru
      const query = `
        INSERT INTO riwayat_setor (
          id_bersama, 
          nominal_setor, 
          timestamp,
          user_id
        )
        VALUES (?, ?, ?, ?);
      `;

      console.log("Running query with params:", [id_bersama, parsedNominalSetor, timestamp, decoded.userId]);

      const result = await database.execute(query, [
        id_bersama, // id_bersama, dari body
        parsedNominalSetor, 
        timestamp, 
        decoded.userId
      ]);

      console.log("Insert result:", result); // Log hasil dari query insert

      return res.status(200).json({ message: "Riwayat setor berhasil ditambahkan!" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  }
];




export const getHistoryBersama = async (req, res) => {
  try {
    // Ambil token dari header Authorization
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak tersedia!" });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ambil id tabungan yang diminta dari URL parameter (misalnya req.params.id)
    const tabunganId = req.params.id;

    // Query untuk mendapatkan detail tabungan bersama, termasuk nominal setor
    const query = `
    SELECT 
      b.id, 
      b.judul, 
      b.target_tabungan, 
      b.tanggal_awal_setor, 
      b.tanggal_akhir_setor, 
      b.frekuensi_setor, 
      b.nominal_setor, 
      b.unggah_gambar, 
      COALESCE(SUM(r.nominal_setor), 0) + b.nominal_setor AS currentAmount,
      MAX(r.timestamp) AS lastTransactionDate
    FROM 
      bersama b
    LEFT JOIN 
      riwayat_setor r ON b.id = r.id_bersama AND b.user_id = r.user_id
    WHERE 
      b.user_id = ? AND b.id = ?
    GROUP BY 
      b.id, b.judul, b.target_tabungan, b.tanggal_awal_setor, b.tanggal_akhir_setor, 
      b.frekuensi_setor, b.nominal_setor, b.unggah_gambar;
    `;

    // Eksekusi query dengan user_id dari token dan id tabungan yang dipilih
    const [rows] = await database.execute(query, [decoded.userId, tabunganId]);

    // Jika data tidak ditemukan
    if (!rows.length) {
      return res.status(404).json({ message: "Tidak ada data tabungan bersama untuk tabungan ini!" });
    }

    // Kirimkan data ke frontend
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

export const addPribadiSavings = [
  upload.single('unggah_gambar'), // Middleware untuk upload gambar
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token tidak tersedia!" });
      }

      console.log("Token diterima:", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const {
        judul,
        target_tabungan,
        tanggal_awal_setor,
        tanggal_akhir_setor,
        frekuensi_setor,
        nominal_setor
      } = req.body;

      if (!judul || !target_tabungan || !tanggal_awal_setor || !tanggal_akhir_setor || !frekuensi_setor || !nominal_setor) {
        return res.status(400).json({ message: "Semua data wajib diisi!" });
      }

      const { file } = req;
      const unggahGambarPath = file ? file.path : null;

      const query = `
        INSERT INTO pribadi (judul, target_tabungan, tanggal_awal_setor, tanggal_akhir_setor, frekuensi_setor, nominal_setor, unggah_gambar, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await database.execute(query, [
        judul,
        target_tabungan,
        tanggal_awal_setor,
        tanggal_akhir_setor,
        frekuensi_setor,
        nominal_setor,
        unggahGambarPath,
        decoded.userId
      ]);

      return res.status(201).json({ message: "Tabungan bersama berhasil ditambahkan!" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  }
];

export const getPribadiSavings = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak tersedia!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Query untuk mendapatkan tabungan bersama dan jumlah nominal setor yang sudah dilakukan
    const query = `
    SELECT 
      p.id, 
      p.judul, 
      p.target_tabungan, 
      p.tanggal_awal_setor, 
      p.tanggal_akhir_setor, 
      p.frekuensi_setor, 
      p.nominal_setor, 
      p.unggah_gambar, 
      COALESCE(SUM(s.nominal_setor), 0) + p.nominal_setor AS currentAmount
    FROM 
      pribadi p
    LEFT JOIN 
      setor_pribadi s ON p.id = s.id_pribadi AND p.user_id = s.user_id
    WHERE 
      p.user_id = ?
    GROUP BY 
      p.id, p.judul, p.target_tabungan, p.tanggal_awal_setor, p.tanggal_akhir_setor, 
      p.frekuensi_setor, p.nominal_setor, p.unggah_gambar;
        `;

    const [rows] = await database.execute(query, [decoded.userId]);
    console.log("Data tabungan mandiri:", rows);
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

export const getPribadiSavingDetails = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak tersedia!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = req.params; // Mendapatkan ID dari parameter URL

    const query = `
      SELECT id, judul, target_tabungan, tanggal_awal_setor, tanggal_akhir_setor, frekuensi_setor, nominal_setor, unggah_gambar
      FROM pribadi
      WHERE id = ? AND user_id = ?
    `;
    const [rows] = await database.execute(query, [id, decoded.userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Tabungan bersama tidak ditemukan!" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

export const updatePribadi = [
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token tidak tersedia!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = req.params; // Mendapatkan ID dari parameter URL

      const { judul } = req.body; // Mendapatkan judul dari body
      const file = req.file; // Mendapatkan file dari upload

      console.log("Judul:", judul); // Log untuk melihat nilai judul
      console.log("File:", file); // Log untuk melihat file yang di-upload

      // Membuat query untuk update, hanya mengupdate kolom judul dan unggah_gambar
      let updateQuery = "UPDATE pribadi SET ";
      let params = [];

      // Cek jika judul ada dan tambahkan ke query
      if (judul) {
        updateQuery += "judul = ?, ";
        params.push(judul); // Menambahkan judul jika ada
      }

      // Cek jika file ada dan tambahkan ke query
      if (file) {
        const unggahGambarPath = file.filename; // Menyimpan nama file jika ada
        updateQuery += "unggah_gambar = ?, ";
        params.push(unggahGambarPath); // Menambahkan path gambar jika ada
      }

      // Menghapus koma terakhir dan menambahkan kondisi untuk ID
      updateQuery = updateQuery.slice(0, -2); // Menghapus koma terakhir
      updateQuery += " WHERE id = ? AND user_id = ?";
      params.push(id, decoded.userId); // Menambahkan ID dan user_id untuk kondisi WHERE

      console.log("Running update query with params:", params);

      const result = await database.execute(updateQuery, params);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan atau Anda tidak memiliki akses!" });
      }

      console.log("Update result:", result); // Log hasil dari query update

      return res.status(200).json({ message: "Data berhasil diperbarui!" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  }
];

export const createRiwayatPribadi = [
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token tidak tersedia!" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id_pribadi, nominal_setor } = req.body; // Mendapatkan id_bersama dan nominal_setor dari body

      console.log("ID Pribadi:", id_pribadi); // Log untuk melihat nilai id_bersama
      console.log("Nominal setor:", nominal_setor); // Log untuk melihat nilai nominal_setor

      // Validasi nominal_setor (pastikan berupa angka positif)
      if (!nominal_setor) {
        return res.status(400).json({ message: "Nominal setor wajib diisi!" });
      }

      const parsedNominalSetor = parseFloat(nominal_setor);
      if (isNaN(parsedNominalSetor) || parsedNominalSetor <= 0) {
        return res.status(400).json({ message: "Nominal setor harus berupa angka positif!" });
      }

      // Timestamp untuk perubahan
      const timestamp = new Date().toISOString();

      // Membuat query untuk menambahkan riwayat setor baru
      const query = `
        INSERT INTO setor_pribadi (
          id_pribadi, 
          nominal_setor, 
          timestamp,
          user_id
        )
        VALUES (?, ?, ?, ?);
      `;

      console.log("Running query with params:", [id_pribadi, parsedNominalSetor, timestamp, decoded.userId]);

      const result = await database.execute(query, [
        id_pribadi, // id_bersama, dari body
        parsedNominalSetor, 
        timestamp, 
        decoded.userId
      ]);

      console.log("Insert result:", result); // Log hasil dari query insert

      return res.status(200).json({ message: "Riwayat setor berhasil ditambahkan!" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  }
];

export const getHistoryPribadi = async (req, res) => {
  try {
    // Ambil token dari header Authorization
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token tidak tersedia!" });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ambil id tabungan yang diminta dari URL parameter (misalnya req.params.id)
    const tabunganId = req.params.id;

    // Query untuk mendapatkan detail tabungan bersama, termasuk nominal setor
    const query = `
    SELECT 
      p.id, 
      p.judul, 
      p.target_tabungan, 
      p.tanggal_awal_setor, 
      p.tanggal_akhir_setor, 
      p.frekuensi_setor, 
      p.nominal_setor, 
      p.unggah_gambar, 
      COALESCE(SUM(s.nominal_setor), 0) + p.nominal_setor AS currentAmount,
      MAX(s.timestamp) AS lastTransactionDate
    FROM 
      pribadi p
    LEFT JOIN 
      setor_pribadi s ON p.id = s.id_pribadi AND p.user_id = s.user_id
    WHERE 
      p.user_id = ? AND p.id = ?
    GROUP BY 
      p.id, p.judul, p.target_tabungan, p.tanggal_awal_setor, p.tanggal_akhir_setor, 
      p.frekuensi_setor, p.nominal_setor, p.unggah_gambar;
    `;

    // Eksekusi query dengan user_id dari token dan id tabungan yang dipilih
    const [rows] = await database.execute(query, [decoded.userId, tabunganId]);

    // Jika data tidak ditemukan
    if (!rows.length) {
      return res.status(404).json({ message: "Tidak ada data tabungan bersama untuk tabungan ini!" });
    }

    // Kirimkan data ke frontend
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};
