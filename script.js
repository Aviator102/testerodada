async function fetchAndDisplayResults() {
    // Busca os resultados salvos e os exibe
    const fetchResponse = await fetch('/api/fetchResults.php');
    const savedResults = await fetchResponse.json();
    const resultadosDiv = document.getElementById('resultados');

    // Limpa os resultados anteriores
    resultadosDiv.innerHTML = '';

    // Adiciona os resultados salvos ao HTML
    savedResults.forEach(item => {
        const resultadoItem = document.createElement('div');
        resultadoItem.classList.add('resultado-item');
        resultadoItem.innerHTML = `
            <span class="resultado-valor">${item.valor}</span>
            <span class="resultado-hora">${item.hora}</span>
        `;
        resultadosDiv.appendChild(resultadoItem);
    });
}

async function fetchAndSaveResults() {
    const response = await fetch('https://api-aviator-cb5db3cad4c0.herokuapp.com/history-odd?date=2024-09-18&numberVelas=10&betHouse=Aposta_ganha');
    const data = await response.json();

    const resultadosDiv = document.getElementById('resultados');
    const statusDiv = document.getElementById('status'); // Seleciona a div de status

    // Limpa os resultados anteriores
    statusDiv.innerHTML = ''; // Limpa o status anterior

    // Salva os dados no banco de dados via PHP e exibe no HTML
    for (const item of data) {
        const valor = item.odd; // A propriedade "odd" contém o valor
        const hora = item.hour;  // A propriedade "hour" contém a hora

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

        // Atualiza a div de status com a mensagem recebida
        if (saveResult.status === 'success') {
            statusDiv.innerHTML += `<div class="status">${saveResult.message}</div>`;
        } else {
            statusDiv.innerHTML += `<div class="error">${saveResult.message}</div>`;
        }
    }
}

// Chama a função para buscar e exibir resultados salvos ao carregar a página
fetchAndDisplayResults();
fetchAndSaveResults(); // Chama a função para buscar e salvar resultados
