<?php
require_once 'config.php';
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: admin_login.php');
    exit;
}

$id = intval($_POST['id']);
$status = $conn->real_escape_string($_POST['status']);
$adminNotes = isset($_POST['admin_notes']) ? $conn->real_escape_string($_POST['admin_notes']) : '';

$sql = "UPDATE visa_applications SET status = '$status', admin_notes = '$adminNotes' WHERE id = $id";

if ($conn->query($sql)) {
    $_SESSION['message'] = 'Application status updated successfully';
} else {
    $_SESSION['error'] = 'Error updating application: ' . $conn->error;
}

header("Location: admin_visa_view.php?id=$id");
exit;
?>