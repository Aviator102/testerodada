async function fetchAndDisplayResults() {
    try {
        const response = await fetch('/api/fetchResults.php'); // Altere o caminho conforme necessário
        const results = await response.json();

        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = ''; // Limpa resultados anteriores

        if (results.length === 0) {
            resultadosDiv.innerHTML = '<div>Nenhum resultado encontrado.</div>';
        } else {
            results.forEach(item => {
                const resultadoDiv = document.createElement('div');
                resultadoDiv.className = 'resultado';
                resultadoDiv.innerHTML = `Valor: ${item.valor} | Hora: ${item.hora}`;
                resultadosDiv.appendChild(resultadoDiv);
            });
        }
    } catch (error) {
        console.error("Erro ao buscar resultados:", error);
        document.getElementById('status').innerHTML = `<div class="error">Erro: ${error.message}</div>`;
    }
}

async function fetchAndSaveResults() {
    try {
        console.log("Buscando resultados da API...");
        const response = await fetch('https://api-aviator-cb5db3cad4c0.herokuapp.com/history-odd?date=2024-09-18&numberVelas=10&betHouse=Aposta_ganha');
        
        // Verifica se a resposta da API está ok
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
        }

        const textResponse = await response.text(); // Lê a resposta como texto
        console.log("Resposta da API:", textResponse); // Log da resposta

        const data = JSON.parse(textResponse); // Tenta fazer o parse do JSON

        console.log("Resultados da API:", data); // Log dos resultados obtidos

        const statusDiv = document.getElementById('status'); // Seleciona a div de status
        statusDiv.innerHTML = ''; // Limpa o status anterior

        for (const item of data) {
            const valor = item.odd; // A propriedade "odd" contém o valor
            const hora = item.hour;  // A propriedade "hour" contém a hora

            console.log(`Salvando resultado: Valor - ${valor}, Hora - ${hora}`);

            const saveResponse = await fetch('/api/saveResults.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ valor, hora })
            });
            
            const saveResult = await saveResponse.json();
            console.log('Resultado do salvamento:', saveResult); // Verifica se o salvamento foi bem-sucedido

            // Atualiza a div de status com a mensagem recebida
            if (saveResult.status === 'success') {
                statusDiv.innerHTML += `<div class="status">${saveResult.message}</div>`;
            } else {
                statusDiv.innerHTML += `<div class="error">${saveResult.message}</div>`;
            }
        }
    } catch (error) {
        console.error("Erro ao buscar e salvar resultados:", error);
        const statusDiv = document.getElementById('status');
        statusDiv.innerHTML = `<div class="error">Erro: ${error.message}</div>`;
    }
}

// Chama as funções ao carregar a página
fetchAndDisplayResults();
fetchAndSaveResults();
