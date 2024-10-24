async function fetchAndSaveResults() {
    try {
        const today = new Date();
        const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        const response = await fetch(`https://api-aviator-cb5db3cad4c0.herokuapp.com/history-odd?date=${date}&numberVelas=10&betHouse=Aposta_ganha`);
        const data = await response.json();
        
        console.log('Dados da API:', data); // Verificar se os dados estão sendo recebidos

        // Limpa a área de resultados antes de adicionar novos
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = '';

        // Salva os dados no banco de dados via PHP e exibe no HTML
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
            const saveResponse = await fetch('/api/saveResults.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ valor, hora })
            });
            
            const saveResult = await saveResponse.json();
            console.log('Resultado do salvamento:', saveResult); // Verifica se o salvamento foi bem-sucedido
        }

        // Exibir dados salvos após cada consulta à API
        await displaySavedResults();
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para buscar e exibir os resultados salvos
async function displaySavedResults() {
    try {
        const response = await fetch('/api/getSavedResults.php'); // Supondo que você tenha este arquivo
        const savedData = await response.json();
        
        const resultadosDiv = document.getElementById('resultados');
        
        // Limpa a área de resultados antes de adicionar novos
        resultadosDiv.innerHTML = '';

        savedData.forEach(item => {
            const resultadoItem = document.createElement('div');
            resultadoItem.classList.add('resultado-item');
            resultadoItem.innerHTML = `
                <span class="resultado-valor">${item.valor}</span>
                <span class="resultado-hora">${item.hora}</span>
            `;
            resultadosDiv.appendChild(resultadoItem);
        });
    } catch (error) {
        console.error('Erro ao buscar resultados salvos:', error);
    }
}

// Chama a função a cada 10 segundos (10000 ms)
setInterval(fetchAndSaveResults, 10000);
fetchAndSaveResults(); // Chamada inicial
