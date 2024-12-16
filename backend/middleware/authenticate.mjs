import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token tidak tersedia!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Menyimpan informasi pengguna pada objek request
    next(); // Melanjutkan ke middleware atau route handler berikutnya
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid!" });
  }
};

export default authenticate;
