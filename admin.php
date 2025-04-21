<?php
session_start();
require_once 'config.php';

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: login.html");
    exit();
}

// Get counts for dashboard
$counts = [];
$result = $conn->query("SELECT COUNT(*) as total FROM users");
$counts['users'] = $result->fetch_assoc()['total'];

$result = $conn->query("SELECT COUNT(*) as total FROM bookings");
$counts['bookings'] = $result->fetch_assoc()['total'];

$result = $conn->query("SELECT COUNT(*) as total FROM contact_submissions");
$counts['inquiries'] = $result->fetch_assoc()['total'];

$result = $conn->query("SELECT COUNT(*) as total FROM visa_applications");
$counts['visa_applications'] = $result->fetch_assoc()['total'];

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['update_booking'])) {
        $booking_id = $conn->real_escape_string($_POST['booking_id']);
        $status = $conn->real_escape_string($_POST['status']);
        $conn->query("UPDATE bookings SET status='$status' WHERE id=$booking_id");
    }
    
    if (isset($_POST['update_visa'])) {
        $visa_id = $conn->real_escape_string($_POST['visa_id']);
        $status = $conn->real_escape_string($_POST['status']);
        $conn->query("UPDATE visa_applications SET status='$status' WHERE id=$visa_id");
    }
    
    if (isset($_POST['update_tour'])) {
        $tour_id = $conn->real_escape_string($_POST['tour_id']);
        $name = $conn->real_escape_string($_POST['name']);
        $price = $conn->real_escape_string($_POST['price']);
        $conn->query("UPDATE tours SET name='$name', price=$price WHERE id=$tour_id");
    }
    
    if (isset($_POST['add_tour'])) {
        $name = $conn->real_escape_string($_POST['name']);
        $price = $conn->real_escape_string($_POST['price']);
        $conn->query("INSERT INTO tours (name, price) VALUES ('$name', $price)");
    }
    
    if (isset($_POST['update_user'])) {
        $user_id = $conn->real_escape_string($_POST['user_id']);
        $role = $conn->real_escape_string($_POST['role']);
        $conn->query("UPDATE users SET role='$role' WHERE id=$user_id");
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Nagar Overseas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <style>
        .dashboard-card {
            transition: transform 0.3s;
        }
        .dashboard-card:hover {
            transform: translateY(-5px);
        }
        .nav-pills .nav-link.active {
            background-color: #0d6efd;
        }
        .sidebar {
            min-height: 100vh;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link text-white active" href="#dashboard" data-bs-toggle="tab">
                                <i class="fas fa-tachometer-alt me-2"></i>Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#bookings" data-bs-toggle="tab">
                                <i class="fas fa-calendar-check me-2"></i>Bookings
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#tours" data-bs-toggle="tab">
                                <i class="fas fa-route me-2"></i>Tours
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#visa" data-bs-toggle="tab">
                                <i class="fas fa-passport me-2"></i>Visa Applications
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#inquiries" data-bs-toggle="tab">
                                <i class="fas fa-question-circle me-2"></i>Inquiries
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-white" href="#users" data-bs-toggle="tab">
                                <i class="fas fa-users me-2"></i>User Management
                            </a>
                        </li>
                        <li class="nav-item mt-3">
                            <a class="nav-link text-white" href="logout.php">
                                <i class="fas fa-sign-out-alt me-2"></i>Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Main Content -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
                <div class="tab-content">
                    <!-- Dashboard Tab -->
                    <div class="tab-pane fade show active" id="dashboard">
                        <h2 class="h3 mb-4">Admin Dashboard</h2>
                        <div class="row">
                            <div class="col-md-3 mb-4">
                                <div class="card dashboard-card bg-primary text-white">
                                    <div class="card-body">
                                        <h5 class="card-title">Total Users</h5>
                                        <h1 class="display-4"><?= $counts['users'] ?></h1>
                                        <a href="#users" class="text-white" data-bs-toggle="tab">View Users</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 mb-4">
                                <div class="card dashboard-card bg-success text-white">
                                    <div class="card-body">
                                        <h5 class="card-title">Bookings</h5>
                                        <h1 class="display-4"><?= $counts['bookings'] ?></h1>
                                        <a href="#bookings" class="text-white" data-bs-toggle="tab">View Bookings</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 mb-4">
                                <div class="card dashboard-card bg-info text-white">
                                    <div class="card-body">
                                        <h5 class="card-title">Inquiries</h5>
                                        <h1 class="display-4"><?= $counts['inquiries'] ?></h1>
                                        <a href="#inquiries" class="text-white" data-bs-toggle="tab">View Inquiries</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 mb-4">
                                <div class="card dashboard-card bg-warning text-dark">
                                    <div class="card-body">
                                        <h5 class="card-title">Visa Applications</h5>
                                        <h1 class="display-4"><?= $counts['visa_applications'] ?></h1>
                                        <a href="#visa" class="text-dark" data-bs-toggle="tab">View Applications</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bookings Tab -->
                    <div class="tab-pane fade" id="bookings">
                        <h2 class="h3 mb-4">Manage Bookings</h2>
                        <div class="table-responsive">
                            <table class="table table-striped">
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
                                    <?php
                                    $result = $conn->query("
                                        SELECT b.id, u.name as user_name, t.name as tour_name, b.booking_date, b.status 
                                        FROM bookings b
                                        JOIN users u ON b.user_id = u.id
                                        JOIN tours t ON b.tour_id = t.id
                                        ORDER BY b.booking_date DESC
                                    ");
                                    while ($row = $result->fetch_assoc()):
                                    ?>
                                    <tr>
                                        <td><?= $row['id'] ?></td>
                                        <td><?= $row['user_name'] ?></td>
                                        <td><?= $row['tour_name'] ?></td>
                                        <td><?= date('M d, Y', strtotime($row['booking_date'])) ?></td>
                                        <td>
                                            <span class="badge bg-<?= 
                                                $row['status'] == 'confirmed' ? 'success' : 
                                                ($row['status'] == 'pending' ? 'warning' : 'danger') 
                                            ?>">
                                                <?= ucfirst($row['status']) ?>
                                            </span>
                                        </td>
                                        <td>
                                            <form method="POST" class="d-inline">
                                                <input type="hidden" name="booking_id" value="<?= $row['id'] ?>">
                                                <select name="status" class="form-select form-select-sm d-inline w-auto">
                                                    <option value="pending" <?= $row['status'] == 'pending' ? 'selected' : '' ?>>Pending</option>
                                                    <option value="confirmed" <?= $row['status'] == 'confirmed' ? 'selected' : '' ?>>Confirmed</option>
                                                    <option value="cancelled" <?= $row['status'] == 'cancelled' ? 'selected' : '' ?>>Cancelled</option>
                                                </select>
                                                <button type="submit" name="update_booking" class="btn btn-sm btn-primary ms-2">Update</button>
                                            </form>
                                        </td>
                                    </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Tours Tab -->
                    <div class="tab-pane fade" id="tours">
                        <h2 class="h3 mb-4">Manage Tours</h2>
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">Add New Tour</div>
                                    <div class="card-body">
                                        <form method="POST">
                                            <div class="mb-3">
                                                <label for="name" class="form-label">Tour Name</label>
                                                <input type="text" class="form-control" id="name" name="name" required>
                                            </div>
                                            <div class="mb-3">
                                                <label for="price" class="form-label">Price</label>
                                                <input type="number" class="form-control" id="price" name="price" required>
                                            </div>
                                            <button type="submit" name="add_tour" class="btn btn-primary">Add Tour</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    $result = $conn->query("SELECT * FROM tours ORDER BY name");
                                    while ($row = $result->fetch_assoc()):
                                    ?>
                                    <tr>
                                        <td><?= $row['id'] ?></td>
                                        <td><?= $row['name'] ?></td>
                                        <td>$<?= number_format($row['price'], 2) ?></td>
                                        <td>
                                            <form method="POST" class="d-inline">
                                                <input type="hidden" name="tour_id" value="<?= $row['id'] ?>">
                                                <input type="text" name="name" value="<?= $row['name'] ?>" class="form-control form-control-sm d-inline w-auto">
                                                <input type="number" name="price" value="<?= $row['price'] ?>" class="form-control form-control-sm d-inline w-auto">
                                                <button type="submit" name="update_tour" class="btn btn-sm btn-primary ms-2">Update</button>
                                            </form>
                                        </td>
                                    </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Visa Applications Tab -->
                    <div class="tab-pane fade" id="visa">
                        <h2 class="h3 mb-4">Visa Applications</h2>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Applicant</th>
                                        <th>Country</th>
                                        <th>Type</th>
                                        <th>Submission Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    $result = $conn->query("
                                        SELECT v.id, u.name as applicant, v.country, v.type, v.submission_date, v.status 
                                        FROM visa_applications v
                                        JOIN users u ON v.user_id = u.id
                                        ORDER BY v.submission_date DESC
                                    ");
                                    while ($row = $result->fetch_assoc()):
                                    ?>
                                    <tr>
                                        <td><?= $row['id'] ?></td>
                                        <td><?= $row['applicant'] ?></td>
                                        <td><?= $row['country'] ?></td>
                                        <td><?= ucfirst($row['type']) ?></td>
                                        <td><?= date('M d, Y', strtotime($row['submission_date'])) ?></td>
                                        <td>
                                            <span class="badge bg-<?= 
                                                $row['status'] == 'approved' ? 'success' : 
                                                ($row['status'] == 'processing' ? 'warning' : 'danger') 
                                            ?>">
                                                <?= ucfirst($row['status']) ?>
                                            </span>
                                        </td>
                                        <td>
                                            <form method="POST" class="d-inline">
                                                <input type="hidden" name="visa_id" value="<?= $row['id'] ?>">
                                                <select name="status" class="form-select form-select-sm d-inline w-auto">
                                                    <option value="processing" <?= $row['status'] == 'processing' ? 'selected' : '' ?>>Processing</option>
                                                    <option value="approved" <?= $row['status'] == 'approved' ? 'selected' : '' ?>>Approved</option>
                                                    <option value="rejected" <?= $row['status'] == 'rejected' ? 'selected' : '' ?>>Rejected</option>
                                                </select>
                                                <button type="submit" name="update_visa" class="btn btn-sm btn-primary ms-2">Update</button>
                                            </form>
                                        </td>
                                    </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Inquiries Tab -->
                    <div class="tab-pane fade" id="inquiries">
                        <h2 class="h3 mb-4">Customer Inquiries</h2>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    $result = $conn->query("SELECT * FROM contact_submissions ORDER BY submission_date DESC");
                                    while ($row = $result->fetch_assoc()):
                                    ?>
                                    <tr>
                                        <td><?= $row['id'] ?></td>
                                        <td><?= $row['name'] ?></td>
                                        <td><?= $row['email'] ?></td>
                                        <td><?= $row['subject'] ?></td>
                                        <td><?= substr($row['message'], 0, 50) ?>...</td>
                                        <td><?= date('M d, Y', strtotime($row['submission_date'])) ?></td>
                                    </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- User Management Tab -->
                    <div class="tab-pane fade" id="users">
                        <h2 class="h3 mb-4">User Management</h2>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Registered</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                    $result = $conn->query("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC");
                                    while ($row = $result->fetch_assoc()):
                                    ?>
                                    <tr>
                                        <td><?= $row['id'] ?></td>
                                        <td><?= $row['name'] ?></td>
                                        <td><?= $row['email'] ?></td>
                                        <td>
                                            <form method="POST" class="d-inline">
                                                <input type="hidden" name="user_id" value="<?= $row['id'] ?>">
                                                <select name="role" class="form-select form-select-sm d-inline w-auto">
                                                    <option value="user" <?= $row['role'] == 'user' ? 'selected' : '' ?>>User</option>
                                                    <option value="admin" <?= $row['role'] == 'admin' ? 'selected' : '' ?>>Admin</option>
                                                </select>
                                                <button type="submit" name="update_user" class="btn btn-sm btn-primary ms-2">Update</button>
                                            </form>
                                        </td>
                                        <td><?= date('M d, Y', strtotime($row['created_at'])) ?></td>
                                        <td>
                                            <a href="#" class="btn btn-sm btn-danger">Delete</a>
                                        </td>
                                    </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Activate tab from URL hash
        document.addEventListener('DOMContentLoaded', function() {
            if (window.location.hash) {
                const tabTrigger = new bootstrap.Tab(document.querySelector(`a[href="${window.location.hash}"]`));
                tabTrigger.show();
            }
        });
    </script>
</body>
</html>