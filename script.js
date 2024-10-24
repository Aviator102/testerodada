async function fetchAndSaveResults() {
    try {
        const today = new Date();
        const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        const response = await fetch(`https://api-aviator-cb5db3cad4c0.herokuapp.com/history-odd?date=${date}&numberVelas=10&betHouse=Aposta_ganha`);
        const data = await response.json();

        // Limpa a área de resultados antes de adicionar novos
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';

        // Salva os dados no banco de dados via PHP
        for (const item of data) {
            const valor = item.odd; // A propriedade "odd" contém o valor
            const hora = item.hour;  // A propriedade "hour" contém a hora

            // Adiciona um novo item visual na div
            const resultadoItem = document.createElement('div');
            resultadoItem.classList.add('resultado-item');
            resultadoItem.innerHTML = `
                <span class="resultado-valor">${valor}</span>
                <span class="resultado-hora">${hora}</span>
            `;
            resultadosDiv.appendChild(resultadoItem);

            // Envia cada resultado para o PHP
            await fetch('/api/saveResults.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ valor, hora })
            });
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Chama a função a cada 10 segundos (10000 ms)
setInterval(fetchAndSaveResults, 10000);
fetchAndSaveResults(); // Chamada inicial
