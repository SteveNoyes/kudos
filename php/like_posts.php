<?php
if (isset($_POST['post_id'])) {
    $post_id = $_POST['post_id'];
    $conn = new mysqli('localhost', 'username', 'password', 'database');
    $sql = "UPDATE posts SET likes = likes + 1 WHERE id = $post_id";
    $conn->query($sql);
    echo json_encode(['status' => 'success']);
}
?>
