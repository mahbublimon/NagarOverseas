<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input data
    $fullName = $conn->real_escape_string($_POST['fullName']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $visaType = $conn->real_escape_string($_POST['visaType']);
    $destination = $conn->real_escape_string($_POST['destination']);
    $travelDate = $conn->real_escape_string($_POST['travelDate']);
    $message = $conn->real_escape_string($_POST['message'] ?? '');

    // Insert into database
    $sql = "INSERT INTO visa_applications (full_name, email, phone, visa_type, destination_country, travel_date, additional_info)
            VALUES ('$fullName', '$email', '$phone', '$visaType', '$destination', '$travelDate', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Application submitted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>