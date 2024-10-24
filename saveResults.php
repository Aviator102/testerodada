<?php
$servername = "18.209.111.107";
$username = "painelrodada";
$password = "painelrodada";
$dbname = "painelrodada";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexão falhou: " . $conn->connect_error]));
}

// Obter os dados da requisição
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['valor']) && isset($data['hora'])) {
    $valor = $conn->real_escape_string($data['valor']);
    $hora = $conn->real_escape_string($data['hora']);

    // Obter a próxima rodada
    $result = $conn->query("SELECT IFNULL(MAX(rodada), 0) + 1 AS nova_rodada FROM resultados");
    $row = $result->fetch_assoc();
    $novaRodada = $row['nova_rodada'];

    // Inserir os dados no banco de dados
    $sql = "INSERT INTO resultados (valor, hora, rodada) VALUES ('$valor', '$hora', $novaRodada)";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Resultado salvo com sucesso!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao salvar: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Dados inválidos."]);
}

$conn->close();
?>
