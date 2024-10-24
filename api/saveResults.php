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

// Receber os dados JSON da requisição
$data = json_decode(file_get_contents('php://input'), true);

// Certifique-se de que os dados que você espera estão presentes
if (isset($data['valor']) && isset($data['hora'])) {
    $valor = $conn->real_escape_string($data['valor']);
    $hora = $conn->real_escape_string($data['hora']);

    // Verificar se o resultado já existe no banco de dados
    $checkSql = "SELECT * FROM resultados WHERE valor = '$valor' AND hora = '$hora'";
    $checkResult = $conn->query($checkSql);

    if ($checkResult->num_rows === 0) { // Se não houver resultados, insira
        // Obter o valor atual da rodada
        $sqlRodada = "SELECT MAX(rodada) AS max_rodada FROM resultados";
        $result = $conn->query($sqlRodada);
        $rodada = 1; // Valor padrão se não houver resultados

        if ($result && $row = $result->fetch_assoc()) {
            $rodada = $row['max_rodada'] + 1; // Incrementa o contador
        }

        // Captura a data atual no formato YYYY-MM-DD
        $formattedDate = date('Y-m-d'); // Data atual formatada

        // Inserir dados no banco
        $sql = "INSERT INTO resultados (rodada, valor, hora, formattedDate) VALUES ('$rodada', '$valor', '$hora', '$formattedDate')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "sucesso"]);
        } else {
            echo json_encode(["status" => "erro", "mensagem" => $conn->error]);
        }
    } else {
        echo json_encode(["status" => "existe", "mensagem" => "Resultado já salvo."]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Dados inválidos."]);
}

$conn->close();
?>
