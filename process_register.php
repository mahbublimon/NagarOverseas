<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate inputs
    $fullName = trim($conn->real_escape_string($_POST['fullName']));
    $email = trim($conn->real_escape_string($_POST['email']));
    $username = trim($conn->real_escape_string($_POST['username']));
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // Validation
    $errors = [];
    
    if (empty($fullName)) {
        $errors[] = 'Full name is required';
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Valid email is required';
    }
    
    if (empty($username) || strlen($username) < 4) {
        $errors[] = 'Username must be at least 4 characters';
    }
    
    if (empty($password) || strlen($password) < 8) {
        $errors[] = 'Password must be at least 8 characters';
    }
    
    if ($password !== $confirmPassword) {
        $errors[] = 'Passwords do not match';
    }

    // Check if email or username exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
    $stmt->bind_param("ss", $email, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $errors[] = 'Email or username already exists';
    }

    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => implode('<br>', $errors)]);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (full_name, email, username, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $fullName, $email, $username, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>