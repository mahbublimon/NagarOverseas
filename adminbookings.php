<?php
require_once 'config.php';
require_once 'admin_header.php';

// Check admin authentication
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.html");
    exit();
}

// Get all bookings
$bookings = $conn->query("
    SELECT b.*, u.name as user_name, t.title as tour_name 
    FROM bookings b
    LEFT JOIN users u ON b.user_id = u.id
    LEFT JOIN tours t ON b.tour_id = t.id
    ORDER BY b.created_at DESC
");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Manage Bookings - Nagar Overseas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="admin_style.css">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <?php include 'adminheader.php'; ?>
            
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2 my-4">Manage Bookings</h1>
                
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Tour</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php while ($booking = $bookings->fetch_assoc()): ?>
                            <tr>
                                <td><?= $booking['id'] ?></td>
                                <td><?= htmlspecialchars($booking['user_name']) ?></td>
                                <td><?= htmlspecialchars($booking['tour_name']) ?></td>
                                <td><?= date('M d, Y', strtotime($booking['tour_date'])) ?></td>
                                <td>
                                    <span class="badge bg-<?= 
                                        $booking['status'] == 'confirmed' ? 'success' : 
                                        ($booking['status'] == 'pending' ? 'warning' : 'danger') 
                                    ?>">
                                        <?= ucfirst($booking['status']) ?>
                                    </span>
                                </td>
                                <td>
                                    <a href="booking_details.php?id=<?= $booking['id'] ?>" class="btn btn-sm btn-primary">View</a>
                                    <a href="update_booking.php?id=<?= $booking['id'] ?>&status=confirmed" class="btn btn-sm btn-success">Confirm</a>
                                    <a href="update_booking.php?id=<?= $booking['id'] ?>&status=cancelled" class="btn btn-sm btn-danger">Cancel</a>
                                </td>
                            </tr>
                            <?php endwhile; ?>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>