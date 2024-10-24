<?php
$servername = "18.209.111.107";
$username = "painelrodada";
$password = "painelrodada";
$dbname = "painelrodada";

// Criação da conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die(json_encode(["message" => "Erro de conexão: " . $conn->connect_error]));
}

// Consulta os resultados salvos
$sql = "SELECT valor, hora, rodada FROM resultados";
$result = $conn->query($sql);

$results = [];
if ($result->num_rows > 0) {
    // Busca os resultados
    while($row = $result->fetch_assoc()) {
        $results[] = $row;
    }
} 

$conn->close();

// Retorna os resultados em formato JSON
echo json_encode($results);
?>
