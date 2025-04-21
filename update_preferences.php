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

$travel_style = $conn->real_escape_string($_POST['travel_style'] ?? '');
$interests = isset($_POST['interests']) && is_array($_POST['interests']) ? 
    implode(', ', array_map([$conn, 'real_escape_string'], $_POST['interests'])) : '';
$preferred_airlines = $conn->real_escape_string($_POST['preferred_airlines'] ?? '');
$special_requirements = $conn->real_escape_string($_POST['special_requirements'] ?? '');

// Check if preferences already exist
$check_stmt = $conn->prepare("SELECT id FROM user_preferences WHERE user_id = ?");
$check_stmt->bind_param("i", $_SESSION['user_id']);
$check_stmt->execute();
$result = $check_stmt->get_result();

if ($result->num_rows > 0) {
    // Update existing preferences
    $stmt = $conn->prepare("UPDATE user_preferences SET 
        travel_style = ?,
        interests = ?,
        preferred_airlines = ?,
        special_requirements = ?
        WHERE user_id = ?");
    $stmt->bind_param("ssssi", $travel_style, $interests, $preferred_airlines, $special_requirements, $_SESSION['user_id']);
} else {
    // Insert new preferences
    $stmt = $conn->prepare("INSERT INTO user_preferences 
        (user_id, travel_style, interests, preferred_airlines, special_requirements)
        VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $_SESSION['user_id'], $travel_style, $interests, $preferred_airlines, $special_requirements);
}

$stmt->execute();

$_SESSION['message'] = 'Preferences updated successfully';
header('Location: profile.php#preferences');
exit;
?>