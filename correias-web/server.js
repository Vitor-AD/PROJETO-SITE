const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));  // Serve arquivos estáticos

// API para retornar os dados das correias
app.get("/correias", (req, res) => {
    const dataPath = path.join(__dirname, "data", "correias.json");
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao ler o arquivo JSON." });
        }
        res.json(JSON.parse(data));
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
