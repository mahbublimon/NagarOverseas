<?php
// Check if admin is logged in
if (session_status() === PHP_SESSION_NONE) session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.html");
    exit();
}
?>
<nav class="col-md-2 d-none d-md-block bg-dark sidebar">
    <div class="position-sticky pt-3">
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link active" href="admindashboard.php">
                    <i class="fas fa-tachometer-alt"></i> Dashboard
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="adminbookings.php">
                    <i class="fas fa-calendar-check"></i> Bookings
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="admintours.php">
                    <i class="fas fa-route"></i> Tours
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="adminusers.php">
                    <i class="fas fa-users"></i> Users
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="adminvisa.php">
                    <i class="fas fa-passport"></i> Visa Applications
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="adminquestions.php">
                    <i class="fas fa-question-circle"></i> Customer Questions
                </a>
            </li>
            <li class="nav-item mt-4">
                <a class="nav-link text-danger" href="logout.php">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </li>
        </ul>
    </div>
</nav>