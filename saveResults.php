<?php
$servername = "18.209.111.107";
$username = "painelrodada";
$password = "painelrodada";
$dbname = "painelrodada";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexão falhou: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"));

$valor = $conn->real_escape_string($data->valor);
$hora = $conn->real_escape_string($data->hora);
$rodada = $conn->real_escape_string($data->rodada);

$sql = "INSERT INTO resultados (valor, hora, rodada) VALUES ('$valor', '$hora', '$rodada')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Resultado salvo com sucesso."]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao salvar: " . $conn->error]);
}

$conn->close();
?>
