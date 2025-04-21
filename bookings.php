<?php
require_once 'auth.php';
session_start();
check_login();

$status_filter = $_GET['status'] ?? '';
$where_clause = "user_id = " . $_SESSION['user_id'];
if ($status_filter && in_array($status_filter, ['confirmed', 'pending', 'cancelled', 'completed'])) {
    $where_clause .= " AND status = '$status_filter'";
}

$bookings = $conn->query("SELECT * FROM bookings WHERE $where_clause ORDER BY booking_date DESC");
$user = get_user_data($conn, $_SESSION['user_id']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Bookings - Nagar Overseas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* ... (keep your existing styles) ... */
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="index.php">Nagar Overseas</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="dashboard.php">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="bookings.php">Bookings</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="profile.php">Profile</a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="logout.php">
                            <i class="fas fa-sign-out-alt me-1"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Bookings Content -->
    <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>My Bookings</h1>
            <a href="new_booking.php" class="btn btn-primary">
                <i class="fas fa-plus me-1"></i> New Booking
            </a>
        </div>

        <!-- Filter Options -->
        <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="btn-group" role="group">
                            <a href="bookings.php" class="btn btn-outline-secondary <?= !$status_filter ? 'active' : '' ?>">
                                All Bookings
                            </a>
                            <a href="bookings.php?status=confirmed" class="btn btn-outline-success <?= $status_filter == 'confirmed' ? 'active' : '' ?>">
                                Confirmed
                            </a>
                            <a href="bookings.php?status=pending" class="btn btn-outline-warning <?= $status_filter == 'pending' ? 'active' : '' ?>">
                                Pending
                            </a>
                            <a href="bookings.php?status=completed" class="btn btn-outline-secondary <?= $status_filter == 'completed' ? 'active' : '' ?>">
                                Completed
                            </a>
                            <a href="bookings.php?status=cancelled" class="btn btn-outline-danger <?= $status_filter == 'cancelled' ? 'active' : '' ?>">
                                Cancelled
                            </a>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search bookings..." aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bookings List -->
        <?php if ($bookings->num_rows > 0): ?>
            <div class="row">
                <?php while ($booking = $bookings->fetch_assoc()): ?>
                <div class="col-md-6 mb-4">
                    <div class="card h-100 booking-card <?= $booking['status'] ?>">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <h5 class="card-title mb-1"><?= htmlspecialchars($booking['destination']) ?></h5>
                                    <p class="text-muted mb-2">
                                        <i class="fas fa-calendar-alt me-2"></i>
                                        <?= date('M d', strtotime($booking['check_in'])) ?> - 
                                        <?= date('M d, Y', strtotime($booking['check_out'])) ?>
                                        (<?= date_diff(
                                            date_create($booking['check_in']), 
                                            date_create($booking['check_out'])
                                        )->format('%a nights') ?>)
                                    </p>
                                </div>
                                <span class="badge bg-<?= 
                                    $booking['status'] == 'confirmed' ? 'success' : 
                                    ($booking['status'] == 'pending' ? 'warning' : 
                                    ($booking['status'] == 'completed' ? 'secondary' : 'danger')) 
                                ?> status-badge">
                                    <?= ucfirst($booking['status']) ?>
                                </span>
                            </div>
                            <div class="d-flex justify-content-between mb-3">
                                <div>
                                    <?php if ($booking['hotel_name']): ?>
                                        <p class="mb-1"><i class="fas fa-hotel me-2"></i> <?= htmlspecialchars($booking['hotel_name']) ?></p>
                                    <?php endif; ?>
                                    <?php if ($booking['airline']): ?>
                                        <p class="mb-1"><i class="fas fa-plane me-2"></i> <?= htmlspecialchars($booking['airline']) ?></p>
                                    <?php endif; ?>
                                </div>
                                <div class="text-end">
                                    <h4 class="text-<?= 
                                        $booking['status'] == 'confirmed' ? 'success' : 
                                        ($booking['status'] == 'pending' ? 'warning' : 
                                        ($booking['status'] == 'completed' ? 'secondary' : 'danger')) 
                                    ?>">
                                        $<?= number_format($booking['total_price'], 2) ?>
                                    </h4>
                                    <small class="text-muted">Booking #VOY-<?= $booking['id'] ?></small>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <a href="booking_details.php?id=<?= $booking['id'] ?>" class="btn btn-outline-primary btn-sm">
                                    <i class="fas fa-file-invoice me-1"></i> View Details
                                </a>
                                <div>
                                    <?php if ($booking['status'] == 'confirmed' || $booking['status'] == 'pending'): ?>
                                        <button class="btn btn-outline-danger btn-sm me-2 cancel-booking" data-id="<?= $booking['id'] ?>">
                                            <i class="fas fa-times me-1"></i> Cancel
                                        </button>
                                    <?php endif; ?>
                                    <button class="btn btn-outline-secondary btn-sm">
                                        <i class="fas fa-print me-1"></i> Print
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endwhile; ?>
            </div>
        <?php else: ?>
            <div class="alert alert-info">
                <?php if ($status_filter): ?>
                    You have no <?= $status_filter ?> bookings.
                <?php else: ?>
                    You have no bookings yet. <a href="destinations.html" class="alert-link">Book your first trip now!</a>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Cancel booking functionality
        document.querySelectorAll('.cancel-booking').forEach(button => {
            button.addEventListener('click', function() {
                const bookingId = this.getAttribute('data-id');
                if (confirm('Are you sure you want to cancel this booking?')) {
                    fetch('cancel_booking.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `id=${bookingId}`
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert('Booking cancelled successfully');
                            location.reload();
                        } else {
                            alert('Error: ' + data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('An error occurred while cancelling the booking');
                    });
                }
            });
        });
    </script>
</body>
</html>