<?php
// Include the configuration file
require_once 'config.php';

try {
    // Check if form is submitted
    if ($_SERVER["REQUEST_METHOD"] != "POST") {
        header("Location: contact.html");
        exit();
    }

    // Validate inputs first
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['subject']) || empty($_POST['message'])) {
        throw new Exception("empty_fields");
    }
    
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception("invalid_email");
    }

    // Sanitize inputs
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);

    // Check if connection was successful (from config.php)
    if ($conn->connect_error) {
        throw new Exception("database_error");
    }
    
    // Prepare SQL statement
    $sql = "INSERT INTO contact_submissions (name, email, subject, message, submission_date) 
            VALUES (?, ?, ?, ?, NOW())";
    
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        throw new Exception("database_error");
    }
    
    // Bind parameters and execute
    $stmt->bind_param("ssss", $name, $email, $subject, $message);
    
    if (!$stmt->execute()) {
        throw new Exception("database_error");
    }

    // Success - redirect back with success message
    header("Location: contact.html?status=success");
    exit();

} catch (Exception $e) {
    // Redirect with appropriate error message
    header("Location: contact.html?status=error&message=" . $e->getMessage());
    exit();
} finally {
    // Clean up resources
    if (isset($stmt) && $stmt instanceof mysqli_stmt) {
        $stmt->close();
    }
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>