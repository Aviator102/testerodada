<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$servername = "18.209.111.107";
$username = "painelrodada";
$password = "painelrodada";
$dbname = "painelrodada";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Verifica se já existe um registro com o mesmo valor e hora
$sqlCheck = "SELECT COUNT(*) AS count FROM sua_tabela WHERE valor = ? AND hora = ?"; // Substitua 'sua_tabela' pelo nome correto da sua tabela
$stmtCheck = $conn->prepare($sqlCheck);
$stmtCheck->bind_param("ss", $data['valor'], $data['hora']);
$stmtCheck->execute();
$resultCheck = $stmtCheck->get_result();
$rowCheck = $resultCheck->fetch_assoc();

if ($rowCheck['count'] > 0) {
    echo json_encode(['success' => false, 'message' => 'Registro já existe.']);
    exit;
}

// Insere o novo resultado
$sqlInsert = "INSERT INTO sua_tabela (valor, hora, rodada) VALUES (?, ?, (SELECT COALESCE(MAX(rodada), 0) + 1 FROM sua_tabela))"; // Substitua 'sua_tabela' pelo nome correto da sua tabela
$stmtInsert = $conn->prepare($sqlInsert);
$stmtInsert->bind_param("ss", $data['valor'], $data['hora']);

if ($stmtInsert->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao salvar resultado.']);
}

$stmtInsert->close();
$conn->close();
?>
