setInterval(() => {
    fetch('https://api-aviator-cb5db3cad4c0.herokuapp.com/history-odd?date=' + new Date().toISOString().split('T')[0] + '&numberVelas=10&betHouse=Aposta_ganha')
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultados-api').innerHTML = ''; // Limpa resultados anteriores
            
            // Variável para armazenar os resultados agrupados por rodada
            let resultadosPorRodada = {};
            
            data.forEach((resultado, index) => {
                // Adiciona o resultado à rodada correspondente
                const rodada = Math.floor(index / 10) + 1; // Agrupa resultados a cada 10
                if (!resultadosPorRodada[rodada]) {
                    resultadosPorRodada[rodada] = [];
                }
                resultadosPorRodada[rodada].push({
                    odd: resultado.odd,
                    hour: resultado.hour
                });
            });
            
            // Exibir resultados agrupados por rodada
            for (const [rodada, resultados] of Object.entries(resultadosPorRodada)) {
                // Adiciona título da rodada
                const divRodada = document.createElement('div');
                divRodada.className = 'resultado';
                divRodada.textContent = `Rodada ${rodada}`;
                document.getElementById('resultados-api').appendChild(divRodada);
                
                // Adiciona os resultados na grid
                resultados.forEach(resultado => {
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
                            hora: resultado.hour,
                            rodada: rodada // Adicionando rodada aqui
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
            }
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
                div.textContent = `Valor: ${resultado.valor} | Hora: ${resultado.hora} | Rodada: ${resultado.rodada}`;
                document.getElementById('resultados-salvos').appendChild(div);
            });
        })
        .catch(err => console.error('Erro ao buscar resultados salvos:', err));
}

// Buscar resultados salvos ao carregar a página
fetchSavedResults();
