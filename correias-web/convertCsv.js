const fs = require("fs");
const path = require("path");

// Definir o caminho absoluto do arquivo CSV
const csvFilePath = path.join(__dirname, "correias.csv");

// Verificar se o arquivo existe antes de processar
if (!fs.existsSync(csvFilePath)) {
    console.error("❌ Erro: Arquivo CSV não encontrado no caminho:", csvFilePath);
    process.exit(1); // Para o script se o arquivo não existir
}

// Ler o arquivo CSV
fs.readFile(csvFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("❌ Erro ao ler o arquivo CSV:", err);
        return;
    }

    // Dividir o CSV em linhas
    const linhas = data.split("\n").filter(linha => linha.trim() !== "");
    if (linhas.length < 2) {
        console.error("❌ Erro: O arquivo CSV parece estar vazio ou sem dados válidos.");
        return;
    }

    // Separar cabeçalhos (nomes das colunas)
    const headers = linhas[0].split(",").map(header => header.trim());

    // Converter cada linha para um objeto JSON
    const jsonData = linhas.slice(1).map(linha => {
        const valores = linha.split(",");
        let obj = {};
        headers.forEach((header, index) => {
            obj[header] = valores[index] ? valores[index].trim() : "";
        });
        return obj;
    });

    // Definir caminho do JSON
    const jsonFilePath = path.join(__dirname, "correias.json");

    // Salvar como JSON
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), "utf8");

    console.log("✅ Conversão concluída! Arquivo 'correias.json' criado em:", jsonFilePath);
});
