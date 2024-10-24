<?php
header('Content-Type: application/json');

$servername = "18.209.111.107";
$username = "painelrodada";
$password = "painelrodada";
$dbname = "painelrodada";

// Criando conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificando conexão
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Conexão falhou: ' . $conn->connect_error]));
}

// Consultando resultados
$sql = "SELECT valor, hora FROM tabela"; // Use o nome correto da tabela
$result = $conn->query($sql);

$results = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $results[] = $row;
    }
}

echo json_encode($results);
$conn->close();
?>
