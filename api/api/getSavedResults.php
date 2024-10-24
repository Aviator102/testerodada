<?php
header('Content-Type: application/json');

// Configurações do banco de dados
$servername = "18.209.111.107";
$username = "painelrodada";
$password = "painelrodada";
$dbname = "painelrodada";

// Conectar ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die(json_encode(["status" => "erro", "mensagem" => "Conexão falhou: " . $conn->connect_error]));
}

// Consultar os resultados salvos
$sql = "SELECT valor, hora FROM resultados ORDER BY id DESC"; // Ordenar por ID, do mais recente para o mais antigo
$result = $conn->query($sql);

$savedResults = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $savedResults[] = $row;
    }
}

echo json_encode($savedResults); // Retorna os resultados em formato JSON
$conn->close();
?>
