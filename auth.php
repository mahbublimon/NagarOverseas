<?php
require_once 'config.php';

function check_login() {
    if (!isset($_SESSION['user_id'])) {
        header('Location: login.html');
        exit;
    }
}

function get_user_data($conn, $user_id) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

function get_user_bookings($conn, $user_id) {
    $stmt = $conn->prepare("SELECT * FROM bookings WHERE user_id = ? ORDER BY booking_date DESC");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    return $stmt->get_result();
}

function get_user_preferences($conn, $user_id) {
    $stmt = $conn->prepare("SELECT * FROM user_preferences WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}
?>