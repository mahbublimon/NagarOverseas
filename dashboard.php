<?php
require_once 'auth.php';
session_start();
check_login();

// Get user data with error handling
$user = get_user_data($conn, $_SESSION['user_id']);
if (!$user || !is_array($user)) {
    die("Error: Unable to fetch user data");
}

// Get bookings with error handling
$bookings = get_user_bookings($conn, $_SESSION['user_id']);
if (!$bookings) {
    die("Error: Unable to fetch bookings");
}

// Get preferences with error handling
$preferences = get_user_preferences($conn, $_SESSION['user_id']);
if (!$preferences) {
    $preferences = []; // Initialize as empty array if no preferences exist
}

// Count different booking statuses
$confirmed_count = 0;
$pending_count = 0;
$completed_count = 0;

// Ensure $bookings is a mysqli_result object before processing
if ($bookings instanceof mysqli_result) {
    while ($booking = $bookings->fetch_assoc()) {
        if (!is_array($booking)) continue;
        
        if (isset($booking['status'])) {
            switch ($booking['status']) {
                case 'confirmed':
                    $confirmed_count++;
                    break;
                case 'pending':
                    $pending_count++;
                    break;
                case 'completed':
                    $completed_count++;
                    break;
            }
        }
    }
    // Reset pointer to beginning for later use
    $bookings->data_seek(0);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Nagar Overseas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* ... (keep your existing styles) ... */
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">Nagar Overseas Dashboard</a>
            <div class="d-flex align-items-center">
                <span class="text-white me-3 d-none d-sm-inline">Welcome, <?= htmlspecialchars($user['full_name'] ?? 'User') ?></span>
                <a href="profile.php" class="btn btn-outline-light btn-sm me-2">
                    <i class="fas fa-user"></i>
                </a>
                <a href="logout.php" class="btn btn-outline-light btn-sm">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-3 col-lg-2 d-md-block sidebar collapse">
                <!-- ... (keep your existing sidebar) ... -->
            </div>

            <!-- Main Content -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Dashboard</h1>
                </div>

                <!-- Stats Cards -->
                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="card stat-card bookings mb-4 h-100">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h6 class="text-uppercase text-muted mb-2">Confirmed Bookings</h6>
                                        <h2 class="mb-0"><?= $confirmed_count ?></h2>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-primary text-white rounded-circle">
                                            <i class="fas fa-calendar-check"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent">
                                <a href="bookings.php" class="text-primary">View all</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card stat-card trips mb-4 h-100">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h6 class="text-uppercase text-muted mb-2">Pending Bookings</h6>
                                        <h2 class="mb-0"><?= $pending_count ?></h2>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-warning text-white rounded-circle">
                                            <i class="fas fa-clock"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent">
                                <a href="bookings.php" class="text-warning">View pending</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card stat-card wishlist mb-4 h-100">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h6 class="text-uppercase text-muted mb-2">Completed Trips</h6>
                                        <h2 class="mb-0"><?= $completed_count ?></h2>
                                    </div>
                                    <div class="col-auto">
                                        <div class="icon icon-shape bg-success text-white rounded-circle">
                                            <i class="fas fa-check-circle"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent">
                                <a href="bookings.php?status=completed" class="text-success">View completed</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Bookings -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0">Recent Bookings</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Booking ID</th>
                                        <th>Destination</th>
                                        <th>Dates</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php 
                                    if ($bookings instanceof mysqli_result) {
                                        $counter = 0;
                                        while ($booking = $bookings->fetch_assoc()): 
                                            if (!is_array($booking)) continue;
                                            if ($counter >= 5) break;
                                            $counter++;
                                    ?>
                                    <tr>
                                        <td>#VOY-<?= htmlspecialchars($booking['id'] ?? '') ?></td>
                                        <td><?= htmlspecialchars($booking['destination'] ?? '') ?></td>
                                        <td>
                                            <?= isset($booking['check_in']) ? date('M d', strtotime($booking['check_in'])) : '' ?> - 
                                            <?= isset($booking['check_out']) ? date('M d, Y', strtotime($booking['check_out'])) : '' ?>
                                        </td>
                                        <td>
                                            <?php if (isset($booking['status'])): ?>
                                            <span class="badge bg-<?= 
                                                $booking['status'] == 'confirmed' ? 'success' : 
                                                ($booking['status'] == 'pending' ? 'warning' : 
                                                ($booking['status'] == 'completed' ? 'secondary' : 'danger')) 
                                            ?>">
                                                <?= ucfirst($booking['status']) ?>
                                            </span>
                                            <?php endif; ?>
                                        </td>
                                        <td>$<?= isset($booking['total_price']) ? number_format($booking['total_price'], 2) : '0.00' ?></td>
                                        <td>
                                            <a href="booking_details.php?id=<?= $booking['id'] ?? '' ?>" class="btn btn-sm btn-outline-primary">
                                                View
                                            </a>
                                        </td>
                                    </tr>
                                    <?php endwhile; 
                                    } else { ?>
                                    <tr>
                                        <td colspan="6" class="text-center">No bookings found</td>
                                    </tr>
                                    <?php } ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent">
                        <a href="bookings.php" class="btn btn-sm btn-primary">View all bookings</a>
                    </div>
                </div>

                <!-- Travel Preferences -->
                <div class="row">
                    <div class="col-md-6">
                        <div class="card h-100">
                            <div class="card-header">
                                <h5 class="mb-0">Your Travel Preferences</h5>
                            </div>
                            <div class="card-body">
                                <?php if (!empty($preferences) && is_array($preferences)): ?>
                                    <p><strong>Travel Style:</strong> <?= htmlspecialchars($preferences['travel_style'] ?? '') ?></p>
                                    <p><strong>Interests:</strong> <?= htmlspecialchars($preferences['interests'] ?? '') ?></p>
                                    <p><strong>Preferred Airlines:</strong> <?= htmlspecialchars($preferences['preferred_airlines'] ?? '') ?></p>
                                    <p><strong>Special Requirements:</strong> <?= htmlspecialchars($preferences['special_requirements'] ?? '') ?></p>
                                <?php else: ?>
                                    <p>No preferences set yet.</p>
                                <?php endif; ?>
                                <a href="profile.php#preferences" class="btn btn-sm btn-outline-primary mt-2">
                                    Edit Preferences
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card h-100">
                            <div class="card-header">
                                <h5 class="mb-0">Recommended for You</h5>
                            </div>
                            <div class="card-body">
                                <?php if (!empty($preferences['interests'])): ?>
                                    <p>Based on your interests in <?= htmlspecialchars($preferences['interests']) ?>, we recommend:</p>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
                                            <strong>Paris, France</strong> - Perfect for history and food lovers
                                        </li>
                                        <li class="list-group-item">
                                            <strong>Kyoto, Japan</strong> - Cultural experiences and amazing cuisine
                                        </li>
                                    </ul>
                                <?php else: ?>
                                    <p>Complete your travel preferences to get personalized recommendations.</p>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>