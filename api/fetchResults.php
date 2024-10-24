<?php
$servername = "18.209.111.107";
$username = "painelrodada";
$password = "painelrodada";
$dbname = "painelrodada";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Consultar os resultados salvos
$sql = "SELECT valor, hora FROM resultados ORDER BY id DESC"; // Retorna os resultados ordenados pelo ID
$result = $conn->query($sql);

$resultsArray = [];
if ($result->num_rows > 0) {
    // Busca os resultados e armazena em um array
    while ($row = $result->fetch_assoc()) {
        $resultsArray[] = $row;
    }
}

// Retorna os resultados em formato JSON
echo json_encode($resultsArray);

$conn->close();
?>
