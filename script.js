document.getElementById("search").addEventListener("input", async function () {
  const query = this.value.toLowerCase();
  console.log("Buscando por:", query); // Log da busca

  try {
    const response = await fetch("http://localhost:3000/correias");
    const correias = await response.json();
    console.log("Dados recebidos:", correias); // Log dos dados

    // Filtra os dados pela marca ou referência
    const filteredCorreias = correias.filter(correia =>
      correia.Carro.toLowerCase().includes(query) ||
      correia.Correia.toLowerCase().includes(query)
    );
    console.log("Correias filtradas:", filteredCorreias); // Log das correias filtradas

    // Limpa os resultados anteriores e exibe os novos
    const resultsTable = document.getElementById("results").getElementsByTagName("tbody")[0];
    resultsTable.innerHTML = "";  // Limpa os resultados anteriores

    // Exibe as correias filtradas com todas as informações
    filteredCorreias.forEach(correia => {
      const row = document.createElement("tr");

      // Cria e preenche cada célula (coluna) individualmente
      const carroCell = document.createElement("td");
      carroCell.textContent = correia.Carro;
      row.appendChild(carroCell);

      const motorCell = document.createElement("td");
      motorCell.textContent = correia.Motor;
      row.appendChild(motorCell);

      const anoCell = document.createElement("td");
      anoCell.textContent = correia.Ano;
      row.appendChild(anoCell);

      const aplicacaoCell = document.createElement("td");
      aplicacaoCell.textContent = correia.Aplicação;
      row.appendChild(aplicacaoCell);

      const correiaCell = document.createElement("td");
      correiaCell.textContent = correia.Correia;
      row.appendChild(correiaCell);

      const montadoraCell = document.createElement("td");
      montadoraCell.textContent = correia.Montadora;
      row.appendChild(montadoraCell);

      // Remove o evento de seleção da linha (apague ou comente essa parte)
      // row.addEventListener("click", function () {
      //     const selectedRows = document.querySelectorAll("tr.selected");
      //     selectedRows.forEach(row => row.classList.remove("selected"));
      //     row.classList.add("selected");
      // });

      resultsTable.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
  }
});
