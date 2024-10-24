async function saveResults(results) {
    try {
        for (const result of results) {
            console.log('Salvando resultado:', result); // Adicione este log
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
                document.getElementById('statusMessage').textContent = 'Erro ao salvar resultados: ' + data.message;
            }
        }
        fetchSavedResults(); // Atualiza a lista de resultados salvos
    } catch (error) {
        console.error('Erro ao salvar resultados:', error);
        document.getElementById('statusMessage').textContent = 'Erro ao salvar resultados.';
    }
}
