async function fetchAndSaveResults() {
    try {
        // Defina a data para a API (você pode modificar isso conforme necessário)
        const today = new Date();
        const date = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        const response = await fetch(`https://api-aviator-cb5db3cad4c0.herokuapp.com/history-odd?date=${date}&numberVelas=10&betHouse=Aposta_ganha`);
        const data = await response.json();

        // Exiba os dados no HTML (opcional)
        document.getElementById('resultados').innerHTML = JSON.stringify(data);

        // Supondo que você deseja salvar um campo específico (por exemplo, o primeiro resultado)
        if (data.length > 0) {
            const valor = data[0].valor; // Ajuste conforme a estrutura do JSON retornado
            const hora = data[0].hora;     // Ajuste conforme a estrutura do JSON retornado

            // Salva os dados no banco de dados via PHP
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

// Chama a função a cada 5 minutos (300000 ms)
setInterval(fetchAndSaveResults, 300000);
fetchAndSaveResults(); // Chamada inicial
