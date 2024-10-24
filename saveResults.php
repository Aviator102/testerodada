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

// Recebe os dados do JSON
$data = json_decode(file_get_contents('php://input'), true);
$valor = $data['valor'];
$hora = $data['hora'];

// Incrementa a rodada
$sqlRodada = "SELECT MAX(rodada) AS max_rodada FROM resultados";
$resultRodada = $conn->query($sqlRodada);
$row = $resultRodada->fetch_assoc();
$rodada = $row['max_rodada'] ? $row['max_rodada'] + 1 : 1; // Se não houver rodada, começa em 1

// Prepara e executa a inserção
$sql = "INSERT INTO resultados (valor, hora, rodada) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $valor, $hora, $rodada);

if ($stmt->execute()) {
    $stmt->close();
    $conn->close();
    echo json_encode(["message" => "Dados inseridos com sucesso!"]);
} else {
    echo json_encode(["message" => "Erro ao inserir dados: " . $conn->error]);
}

$conn->close();
?>
