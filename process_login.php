<?php
require_once 'config.php';

session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate inputs
    $username = trim($conn->real_escape_string($_POST['username']));
    $password = $_POST['password'];

    // Basic validation
    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Username/Email and password are required']);
        exit;
    }

    // Find user by email or username
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? OR username = ?");
    $stmt->bind_param("ss", $username, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid username/email or password']);
        exit;
    }

    $user = $result->fetch_assoc();

    // Verify password
    if (!password_verify($password, $user['password'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid username/email or password']);
        exit;
    }

    // Check if user is active
    if (!$user['is_active']) {
        echo json_encode(['success' => false, 'message' => 'Your account is inactive. Please contact support.']);
        exit;
    }

    // Update last login
    $updateStmt = $conn->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
    $updateStmt->bind_param("i", $user['id']);
    $updateStmt->execute();

    // Set session variables
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['full_name'] = $user['full_name'];
    $_SESSION['is_admin'] = $user['is_admin'];
    $_SESSION['last_login'] = $user['last_login'];

    echo json_encode([
        'success' => true, 
        'is_admin' => $user['is_admin'],
        'message' => 'Login successful'
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>