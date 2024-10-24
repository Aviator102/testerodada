<?php
header('Content-Type: application/json');

$servername = "18.209.111.107";
$username = "painelrodada";
$password = "painelrodada";
$dbname = "painelrodada";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT valor, hora, rodada FROM sua_tabela"; // Substitua 'sua_tabela' pelo nome correto da sua tabela
$result = $conn->query($sql);

$savedResults = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $savedResults[] = $row;
    }
}

$conn->close();
echo json_encode($savedResults);
?>
