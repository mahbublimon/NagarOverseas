<?php
require_once 'config.php';
require_once 'adminheader.php';

// Check admin authentication
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.html");
    exit();
}

// Get all visa applications
$visas = $conn->query("
    SELECT v.*, u.name as user_name, u.email 
    FROM visa_applications v
    LEFT JOIN users u ON v.user_id = u.id
    ORDER BY v.application_date DESC
");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Manage Visa Applications - Nagar Overseas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="admin_style.css">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <?php include 'adminheader.php'; ?>
            
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1 class="h2 my-4">Visa Applications</h1>
                
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Applicant</th>
                                <th>Country</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Applied On</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php while ($visa = $visas->fetch_assoc()): ?>
                            <tr>
                                <td><?= $visa['id'] ?></td>
                                <td><?= htmlspecialchars($visa['user_name']) ?></td>
                                <td><?= htmlspecialchars($visa['destination_country']) ?></td>
                                <td><?= ucfirst($visa['visa_type']) ?></td>
                                <td>
                                    <span class="badge bg-<?= 
                                        $visa['status'] == 'approved' ? 'success' : 
                                        ($visa['status'] == 'processing' ? 'warning' : 'danger') 
                                    ?>">
                                        <?= ucfirst($visa['status']) ?>
                                    </span>
                                </td>
                                <td><?= date('M d, Y', strtotime($visa['application_date'])) ?></td>
                                <td>
                                    <a href="visa_details.php?id=<?= $visa['id'] ?>" class="btn btn-sm btn-primary">View</a>
                                    <a href="update_visa_status.php?id=<?= $visa['id'] ?>&status=approved" class="btn btn-sm btn-success">Approve</a>
                                    <a href="update_visa_status.php?id=<?= $visa['id'] ?>&status=rejected" class="btn btn-sm btn-danger">Reject</a>
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