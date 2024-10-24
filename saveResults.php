<?php
$servername = "18.209.111.107";
$username = "painelrodada";
$password = "painelrodada";
$dbname = "painelrodada";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Obter dados JSON
$data = json_decode(file_get_contents("php://input"), true);
$valor = $data['valor'];
$hora = $data['hora'];

// Consultar a próxima rodada
$sql = "SELECT MAX(rodada) as max_rodada FROM resultados";
$result = $conn->query($sql);
$rodada = 1; // Valor padrão para a rodada
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $rodada = $row['max_rodada'] + 1; // Incrementa a rodada
}

// Inserir resultado
$sql = "INSERT INTO resultados (valor, hora, rodada) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $valor, $hora, $rodada);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Resultado salvo com sucesso!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erro ao salvar resultado: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
