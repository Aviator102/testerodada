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

// Recebendo dados JSON
$data = json_decode(file_get_contents("php://input"), true);
$valor = $data['valor'];
$hora = $data['hora'];

// Verificando se o resultado já existe na tabela
$sqlCheck = "SELECT * FROM tabela WHERE valor = ? AND hora = ?";
$stmtCheck = $conn->prepare($sqlCheck);
$stmtCheck->bind_param("ss", $valor, $hora);
$stmtCheck->execute();
$resultCheck = $stmtCheck->get_result();

if ($resultCheck->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Resultado já existe.']);
} else {
    // Incrementando a rodada
    $sqlRodada = "INSERT INTO tabela (valor, hora, rodada) VALUES (?, ?, (SELECT IFNULL(MAX(rodada), 0) + 1 FROM tabela))";
    $stmt = $conn->prepare($sqlRodada);
    $stmt->bind_param("ss", $valor, $hora);
    
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Resultado salvo com sucesso!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao salvar resultado: ' . $stmt->error]);
    }
}

$stmtCheck->close();
$stmt->close();
$conn->close();
?>
