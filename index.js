import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const TARGET_URL = "https://raceclocker.com/032840fb";

// Отдаём статические файлы из папки public
app.use(express.static(path.join(__dirname, "public")));

// API-прокси для RaceClocker
app.get("/results", async (req, res) => {
  try {
    const response = await fetch(TARGET_URL);
    const body = await response.text();
    res.send(body);
  } catch (error) {
    res.status(500).send("Ошибка прокси: " + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
