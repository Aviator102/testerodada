const apiUrl = 'https://api-aviator-cb5db3cad4c0.herokuapp.com/history-odd?date=2024-09-18&numberVelas=10&betHouse=Aposta_ganha';

async function fetchApiResults() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const results = await response.json();
        displayApiResults(results);
        await saveResults(results);
    } catch (error) {
        console.error('Erro ao buscar resultados da API:', error);
        document.getElementById('statusMessage').textContent = 'Erro ao buscar resultados da API.';
    }
}

function displayApiResults(results) {
    const apiResultsDiv = document.getElementById('apiResults');
    apiResultsDiv.innerHTML = '<h2>Resultados da API:</h2>';
    
    results.forEach(result => {
        apiResultsDiv.innerHTML += `
            <div class="result">
                Valor: ${result.odd}, Hora: ${result.hour}
            </div>
        `;
    });
}

async function saveResults(results) {
    try {
        for (const result of results) {
            const response = await fetch('saveResults.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    valor: result.odd,
                    hora: result.hour
                })
            });
            const data = await response.json();
            if (data.success) {
                document.getElementById('statusMessage').textContent = 'Resultados salvos com sucesso!';
            } else {
                document.getElementById('statusMessage').textContent = 'Erro ao salvar resultados.';
            }
        }
        fetchSavedResults(); // Atualiza a lista de resultados salvos
    } catch (error) {
        console.error('Erro ao salvar resultados:', error);
        document.getElementById('statusMessage').textContent = 'Erro ao salvar resultados.';
    }
}

async function fetchSavedResults() {
    try {
        const response = await fetch('fetchResults.php');
        const results = await response.json();
        displaySavedResults(results);
    } catch (error) {
        console.error('Erro ao buscar resultados salvos:', error);
    }
}

function displaySavedResults(results) {
    const savedResultsDiv = document.getElementById('savedResults');
    savedResultsDiv.innerHTML = '<h2>Resultados Salvos:</h2>';
    
    results.forEach(result => {
        savedResultsDiv.innerHTML += `
            <div class="result">
                Valor: ${result.valor}, Hora: ${result.hora}, Rodada: ${result.rodada}
            </div>
        `;
    });
}

// Chama a função a cada 10 segundos
setInterval(fetchApiResults, 10000);
fetchSavedResults(); // Busca resultados salvos na inicialização
