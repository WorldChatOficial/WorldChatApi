const express = require("express");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const cors = require("cors");

require("dotenv").config(); // ← para usar variables de entorno (.env)

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/sign-upload", (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000); // genera número entero
  
  const paramsToSign = {
    timestamp,
    folder: "videos_app",
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUD_API_SECRET
  );

  res.json({
    signature,
    timestamp: timestamp.toString(), // ← asegura que sea string y no número flotante
    apiKey: process.env.CLOUD_API_KEY,
    cloudName: process.env.CLOUD_NAME,
    folder: "videos_app",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor listo en puerto ${PORT}`);
});
