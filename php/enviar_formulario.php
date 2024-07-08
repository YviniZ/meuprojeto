<?php
header('Content-Type: application/json');

$response = array('success' => false, 'message' => '');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars($_POST['nome']);
    $email = htmlspecialchars($_POST['email']);
    $telefone = htmlspecialchars($_POST['telefone']);
    $mensagem = htmlspecialchars($_POST['mensagem']);

    if (!empty($nome) && !empty($telefone) && !empty($mensagem)) {
        $servername = "localhost";
        $username = "id22403335_admin";
        $password = "Konicabr@2024";
        $dbname = "id22403335_formulario";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            $response['message'] = "Erro na conexão com o banco de dados: " . $conn->connect_error;
            echo json_encode($response);
            exit();
        }

        $sql = "INSERT INTO formulario_contato (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $nome, $email, $telefone, $mensagem);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Formulário enviado com sucesso!";
        } else {
            $response['message'] = "Erro ao enviar o formulário: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    } else {
        $response['message'] = "Por favor, preencha todos os campos obrigatórios: Nome, Telefone e Mensagem.";
    }

    echo json_encode($response);
}
?>