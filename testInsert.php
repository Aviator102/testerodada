<?php
// Configurações do banco de dados
$servername = "18.209.111.107";
$username = "painelrodada";
$password = "painelrodada";
$dbname = "painelrodada";

// Conectar ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Consultar resultados
$sql = "SELECT valor, hora, rodada FROM resultados ORDER BY id DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados das Apostas</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }

        h1 {
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        tr:hover {
            background-color: #f1f1f1;
        }
    </style>
</head>
<body>
    <div>
        <h1>Resultados das Apostas</h1>
        <div id="resultados">
            <?php
            // Exibir resultados
            if ($result->num_rows > 0) {
                echo "<table>";
                echo "<tr><th>Odd</th><th>Hora</th><th>Rodada</th></tr>";

                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . htmlspecialchars($row["valor"]) . "</td>";
                    echo "<td>" . htmlspecialchars($row["hora"]) . "</td>";
                    echo "<td>" . htmlspecialchars($row["rodada"]) . "</td>";
                    echo "</tr>";
                }
                echo "</table>";
            } else {
                echo "Nenhum resultado encontrado.";
            }

            // Fechar conexão
            $conn->close();
            ?>
        </div>
    </div>
</body>
</html>
