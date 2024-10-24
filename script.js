const fetchResults = async () => {
    try {
        const response = await fetch('https://api-aviator-cb5db3cad4c0.herokuapp.com/history-odd?date=2024-09-18&numberVelas=10&betHouse=Aposta_ganha');
        if (!response.ok) throw new Error('Erro ao buscar resultados da API');

        const data = await response.json();
        displayApiResults(data);
        
        // Salvar resultados no banco de dados
        for (const item of data) {
            await saveResult(item.odd, item.hour);
        }

        updateSavedResults();
    } catch (error) {
        document.getElementById('status').innerHTML = `<div class="error">Erro: ${error.message}</div>`;
    }
};

const saveResult = async (valor, hora) => {
    try {
        const response = await fetch('saveResults.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ valor, hora })
        });

        const result = await response.json();
        document.getElementById('status').innerHTML = `<div class="success">${result.message}</div>`;
    } catch (error) {
        document.getElementById('status').innerHTML = `<div class="error">Erro ao salvar: ${error.message}</div>`;
    }
};

const displayApiResults = (data) => {
    const apiResultsDiv = document.getElementById('api-results');
    apiResultsDiv.innerHTML = '<h2>Resultados da API</h2>';
    data.forEach(item => {
        apiResultsDiv.innerHTML += `<div class="resultado">Odd: ${item.odd} | Hora: ${item.hour}</div>`;
    });
};

const updateSavedResults = async () => {
    try {
        const response = await fetch('fetchResults.php');
        const results = await response.json();
        
        const savedResultsDiv = document.getElementById('saved-results');
        savedResultsDiv.innerHTML = '';
        results.forEach(item => {
            savedResultsDiv.innerHTML += `<div class="resultado">Valor: ${item.valor} | Hora: ${item.hora} | Rodada: ${item.rodada}</div>`;
        });
    } catch (error) {
        console.error('Erro ao buscar resultados salvos:', error);
    }
};

// Executar a função a cada 10 segundos
setInterval(fetchResults, 10000);
fetchResults(); // Chama a função na primeira execução
