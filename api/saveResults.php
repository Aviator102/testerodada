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

// Obter os dados do POST
$data = json_decode(file_get_contents("php://input"));

// Preparar a consulta
$stmt = $conn->prepare("INSERT INTO resultados (valor, hora, rodada, formattedDate) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssis", $data->valor, $data->hora, $rodada, $formattedDate);

// Definir o valor de rodada e formattedDate
$rodada = 1; // Ou outra lógica para incrementar
$formattedDate = date('Y-m-d'); // Data atual no formato YYYY-MM-DD

// Executar a consulta
if ($stmt->execute()) {
    echo json_encode(["status" => "sucesso", "mensagem" => "Resultado salvo com sucesso!"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao salvar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
