<?php
header('Content-Type: application/json');

// Configurações do banco de dados
$servername = "18.209.111.107";
$username = "painelrodada";
$password = "painelrodada";
$dbname = "painelrodada";

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Dados de teste para inserir
$valor = "1.50"; // valor do teste
$hora = date("H:i:s"); // hora atual

// Inserção no banco de dados
$sqlInsert = "INSERT INTO sua_tabela (valor, hora, rodada) VALUES (?, ?, (SELECT COALESCE(MAX(rodada), 0) + 1 FROM sua_tabela))"; // Substitua 'sua_tabela' pelo nome correto da sua tabela
$stmtInsert = $conn->prepare($sqlInsert);
$stmtInsert->bind_param("ss", $valor, $hora);

if ($stmtInsert->execute()) {
    echo json_encode(['success' => true, 'message' => 'Dados inseridos com sucesso!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao inserir dados: ' . $stmtInsert->error]);
}

$stmtInsert->close();
$conn->close();
?>
