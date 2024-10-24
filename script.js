setInterval(() => {
    fetch('https://api-aviator-cb5db3cad4c0.herokuapp.com/history-odd?date=' + new Date().toISOString().split('T')[0] + '&numberVelas=10&betHouse=Aposta_ganha')
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultados-api').innerHTML = ''; // Limpa resultados anteriores
            data.forEach(resultado => {
                const div = document.createElement('div');
                div.className = 'resultado';
                div.textContent = `Odd: ${resultado.odd} | Hora: ${resultado.hour}`;
                document.getElementById('resultados-api').appendChild(div);
                
                // Salvar resultado no banco de dados
                fetch('saveResults.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        valor: resultado.odd,
                        hora: resultado.hour
                    })
                })
                .then(response => response.json())
                .then(res => {
                    if (res.success) {
                        document.getElementById('status').textContent = res.message; // Atualiza o status
                    } else {
                        console.error(res.message);
                    }
                })
                .catch(err => console.error('Erro ao salvar:', err));
            });
        })
        .catch(err => {
            console.error('Erro ao buscar resultados da API:', err);
            document.getElementById('resultados-api').innerHTML = 'Erro ao buscar resultados.';
        });
}, 10000);

// Função para buscar resultados salvos no banco de dados
function fetchSavedResults() {
    fetch('fetchResults.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultados-salvos').innerHTML = ''; // Limpa resultados anteriores
            data.forEach(resultado => {
                const div = document.createElement('div');
                div.className = 'resultado';
                div.textContent = `Valor: ${resultado.valor} | Hora: ${resultado.hora}`;
                document.getElementById('resultados-salvos').appendChild(div);
            });
        })
        .catch(err => console.error('Erro ao buscar resultados salvos:', err));
}

// Buscar resultados salvos ao carregar a página
fetchSavedResults();
