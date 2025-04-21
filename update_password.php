<?php
require_once 'config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.html');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: profile.php');
    exit;
}

$current_password = $_POST['current_password'];
$new_password = $_POST['new_password'];
$confirm_password = $_POST['confirm_password'];

// Validate inputs
if (empty($current_password) || empty($new_password) || empty($confirm_password)) {
    $_SESSION['error'] = 'All password fields are required';
    header('Location: profile.php#security');
    exit;
}

if ($new_password !== $confirm_password) {
    $_SESSION['error'] = 'New passwords do not match';
    header('Location: profile.php#security');
    exit;
}

// Get current password hash
$stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
$stmt->bind_param("i", $_SESSION['user_id']);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Verify current password
if (!password_verify($current_password, $user['password'])) {
    $_SESSION['error'] = 'Current password is incorrect';
    header('Location: profile.php#security');
    exit;
}

// Update password
$new_password_hash = password_hash($new_password, PASSWORD_DEFAULT);
$update_stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
$update_stmt->bind_param("si", $new_password_hash, $_SESSION['user_id']);
$update_stmt->execute();

$_SESSION['message'] = 'Password updated successfully';
header('Location: profile.php#security');
exit;
?>