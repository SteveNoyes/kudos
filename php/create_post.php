<?php
if (isset($_POST['content'])) {
    $content = $_POST['content'];
    $conn = new mysqli('localhost', 'username', 'password', 'database');
    $sql = "INSERT INTO posts (content) VALUES ('$content')";
    $conn->query($sql);
    echo json_encode(['status' => 'success']);
}
?>