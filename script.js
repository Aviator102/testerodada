async function fetchAndSaveResults() {
    try {
        console.log("Buscando resultados da API...");
        const response = await fetch('https://api-aviator-cb5db3cad4c0.herokuapp.com/history-odd?date=2024-09-18&numberVelas=10&betHouse=Aposta_ganha');
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        const data = await response.json();
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

// Chama a função para buscar e exibir resultados salvos ao carregar a página
fetchAndDisplayResults();
fetchAndSaveResults(); // Chama a função para buscar e salvar resultados
