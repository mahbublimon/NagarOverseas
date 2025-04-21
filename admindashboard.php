<?php
require_once 'config.php';
require_once 'adminheader.php';

// Check admin authentication
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.html");
    exit();
}

// Get statistics
$bookings_count = $conn->query("SELECT COUNT(*) FROM bookings")->fetch_row()[0];
$users_count = $conn->query("SELECT COUNT(*) FROM users")->fetch_row()[0];
$visa_count = $conn->query("SELECT COUNT(*) FROM visa_applications")->fetch_row()[0];
$questions_count = $conn->query("SELECT COUNT(*) FROM contact_submissions")->fetch_row()[0];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Nagar Overseas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="admin_style.css">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <?php include 'adminheader.php'; ?>
            
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2 my-4">Dashboard Overview</h1>
                
                <div class="row">
                    <div class="col-md-3">
                        <div class="card text-white bg-primary mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Total Bookings</h5>
                                <h2><?= $bookings_count ?></h2>
                                <a href="adminbookings.php" class="text-white">View All</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div class="card text-white bg-success mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Registered Users</h5>
                                <h2><?= $users_count ?></h2>
                                <a href="adminusers.php" class="text-white">Manage Users</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div class="card text-white bg-warning mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Visa Applications</h5>
                                <h2><?= $visa_count ?></h2>
                                <a href="adminvisa.php" class="text-white">Process Applications</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div class="card text-white bg-info mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Customer Questions</h5>
                                <h2><?= $questions_count ?></h2>
                                <a href="adminquestions.php" class="text-white">View Questions</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Recent Activity Section -->
                <div class="card mt-4">
                    <div class="card-header">
                        <h5>Recent Activity</h5>
                    </div>
                    <div class="card-body">
                        <?php
                        $recent_activity = $conn->query("
                            (SELECT 'booking' as type, id, created_at FROM bookings ORDER BY created_at DESC LIMIT 3)
                            UNION
                            (SELECT 'visa' as type, id, created_at FROM visa_applications ORDER BY created_at DESC LIMIT 3)
                            UNION
                            (SELECT 'question' as type, id, submission_date as created_at FROM contact_submissions ORDER BY submission_date DESC LIMIT 3)
                            ORDER BY created_at DESC LIMIT 5
                        ");
                        
                        while ($activity = $recent_activity->fetch_assoc()) {
                            echo '<div class="mb-2">';
                            echo '<strong>' . ucfirst($activity['type']) . ' #' . $activity['id'] . '</strong>';
                            echo '<span class="text-muted float-end">' . date('M d, Y h:i A', strtotime($activity['created_at'])) . '</span>';
                            echo '</div>';
                        }
                        ?>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>