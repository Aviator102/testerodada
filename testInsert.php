<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste de Inserção no Banco de Dados</title>
    <link rel="stylesheet" href="styles.css"> <!-- Adicione um link para um CSS se quiser estilizar -->
</head>
<body>
    <h1>Teste de Inserção no Banco de Dados</h1>
    <button id="insertButton">Inserir Dados de Teste</button>
    <div id="statusMessage"></div>

    <h2>Resultados Salvos</h2>
    <div id="resultsContainer"></div>

    <script>
        document.getElementById('insertButton').addEventListener('click', function() {
            fetch('testInsert.php') // Chama o script PHP
                .then(response => response.json())
                .then(data => {
                    const statusMessage = document.getElementById('statusMessage');
                    statusMessage.innerHTML = data.message; // Exibe a mensagem de status

                    // Carrega novamente os resultados salvos
                    loadSavedResults();
                })
                .catch(error => {
                    console.error('Erro ao inserir dados:', error);
                    document.getElementById('statusMessage').innerHTML = 'Erro ao inserir dados.';
                });
        });

        function loadSavedResults() {
            fetch('fetchResults.php') // Chama o script para buscar os resultados salvos
                .then(response => response.json())
                .then(data => {
                    const resultsContainer = document.getElementById('resultsContainer');
                    resultsContainer.innerHTML = ''; // Limpa resultados anteriores

                    data.forEach(result => {
                        const resultDiv = document.createElement('div');
                        resultDiv.innerHTML = `Valor: ${result.valor} | Hora: ${result.hora} | Rodada: ${result.rodada}`;
                        resultsContainer.appendChild(resultDiv);
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar resultados salvos:', error);
                });
        }

        // Carrega os resultados ao carregar a página
        window.onload = loadSavedResults;
    </script>
</body>
</html>
