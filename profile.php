<?php
require_once 'auth.php';
session_start();
check_login();

$user = get_user_data($conn, $_SESSION['user_id']);
$preferences = get_user_preferences($conn, $_SESSION['user_id']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle profile updates
    $full_name = $conn->real_escape_string($_POST['full_name']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $address = $conn->real_escape_string($_POST['address']);
    $city = $conn->real_escape_string($_POST['city']);
    $state = $conn->real_escape_string($_POST['state']);
    $zip = $conn->real_escape_string($_POST['zip']);
    $country = $conn->real_escape_string($_POST['country']);
    $bio = $conn->real_escape_string($_POST['bio']);

    $stmt = $conn->prepare("UPDATE users SET full_name=?, email=?, phone=?, address=?, city=?, state=?, zip=?, country=?, bio=? WHERE id=?");
    $stmt->bind_param("sssssssssi", $full_name, $email, $phone, $address, $city, $state, $zip, $country, $bio, $_SESSION['user_id']);
    $stmt->execute();

    $_SESSION['message'] = 'Profile updated successfully';
    header('Location: profile.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile - Nagar Overseas</title>
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
                        <a class="nav-link" href="index.php">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="dashboard.php">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="bookings.php">Bookings</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="profile.php">Profile</a>
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

    <!-- Profile Content -->
    <div class="container py-5">
        <?php if (isset($_SESSION['message'])): ?>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <?= $_SESSION['message'] ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php unset($_SESSION['message']); ?>
        <?php endif; ?>

        <div class="row">
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-body text-center">
                        <img src="https://ui-avatars.com/api/?name=<?= urlencode($user['full_name']) ?>&size=150" 
                             alt="Profile" class="rounded-circle mb-3" width="150">
                        <h5 class="my-3"><?= htmlspecialchars($user['full_name']) ?></h5>
                        <p class="text-muted mb-1"><i class="fas fa-envelope me-2"></i> <?= htmlspecialchars($user['email']) ?></p>
                        <p class="text-muted mb-4"><i class="fas fa-phone me-2"></i> <?= htmlspecialchars($user['phone']) ?></p>
                        <p class="text-muted mb-4">
                            <i class="fas fa-map-marker-alt me-2"></i> 
                            <?= htmlspecialchars($user['city'] ?? '') ?>, <?= htmlspecialchars($user['country'] ?? '') ?>
                        </p>
                        <div class="d-flex justify-content-center mb-2">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changePhotoModal">
                                Change Photo
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title">About</h5>
                        <p class="card-text"><?= htmlspecialchars($user['bio'] ?? 'No bio yet') ?></p>
                        <hr>
                        <h5 class="card-title">Account Information</h5>
                        <p class="mb-1"><strong>Member since:</strong> <?= date('F Y', strtotime($user['created_at'])) ?></p>
                        <p class="mb-1"><strong>Last login:</strong> 
                            <?= $user['last_login'] ? date('M d, Y H:i', strtotime($user['last_login'])) : 'Never' ?>
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-body">
                        <ul class="nav nav-pills mb-4" id="profileTabs" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="personal-tab" data-bs-toggle="pill" data-bs-target="#personal" type="button" role="tab">Personal Info</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="security-tab" data-bs-toggle="pill" data-bs-target="#security" type="button" role="tab">Security</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="preferences-tab" data-bs-toggle="pill" data-bs-target="#preferences" type="button" role="tab">Preferences</button>
                            </li>
                        </ul>
                        
                        <div class="tab-content" id="profileTabsContent">
                            <!-- Personal Info Tab -->
                            <div class="tab-pane fade show active" id="personal" role="tabpanel">
                                <form method="POST">
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">Full Name</label>
                                            <input type="text" class="form-control" name="full_name" value="<?= htmlspecialchars($user['full_name']) ?>" required>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="form-label">Email</label>
                                            <input type="email" class="form-control" name="email" value="<?= htmlspecialchars($user['email']) ?>" required>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Phone</label>
                                        <input type="text" class="form-control" name="phone" value="<?= htmlspecialchars($user['phone'] ?? '') ?>">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Address</label>
                                        <input type="text" class="form-control" name="address" value="<?= htmlspecialchars($user['address'] ?? '') ?>">
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-sm-6">
                                            <label class="form-label">City</label>
                                            <input type="text" class="form-control" name="city" value="<?= htmlspecialchars($user['city'] ?? '') ?>">
                                        </div>
                                        <div class="col-sm-3">
                                            <label class="form-label">State</label>
                                            <input type="text" class="form-control" name="state" value="<?= htmlspecialchars($user['state'] ?? '') ?>">
                                        </div>
                                        <div class="col-sm-3">
                                            <label class="form-label">Zip</label>
                                            <input type="text" class="form-control" name="zip" value="<?= htmlspecialchars($user['zip'] ?? '') ?>">
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Country</label>
                                        <input type="text" class="form-control" name="country" value="<?= htmlspecialchars($user['country'] ?? '') ?>">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Bio</label>
                                        <textarea class="form-control" name="bio" rows="3"><?= htmlspecialchars($user['bio'] ?? '') ?></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Update Profile</button>
                                </form>
                            </div>
                            
                            <!-- Security Tab -->
                            <div class="tab-pane fade" id="security" role="tabpanel">
                                <form action="update_password.php" method="POST">
                                    <div class="mb-3">
                                        <label class="form-label">Current Password</label>
                                        <input type="password" class="form-control" name="current_password" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">New Password</label>
                                        <input type="password" class="form-control" name="new_password" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Confirm New Password</label>
                                        <input type="password" class="form-control" name="confirm_password" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Update Password</button>
                                </form>
                            </div>
                            
                            <!-- Preferences Tab -->
                            <div class="tab-pane fade" id="preferences" role="tabpanel">
                                <form action="update_preferences.php" method="POST">
                                    <div class="mb-3">
                                        <label class="form-label">Preferred Travel Style</label>
                                        <select class="form-select" name="travel_style">
                                            <option value="">Select...</option>
                                            <option value="Budget" <?= ($preferences['travel_style'] ?? '') == 'Budget' ? 'selected' : '' ?>>Budget</option>
                                            <option value="Mid-range" <?= ($preferences['travel_style'] ?? '') == 'Mid-range' ? 'selected' : '' ?>>Mid-range</option>
                                            <option value="Luxury" <?= ($preferences['travel_style'] ?? '') == 'Luxury' ? 'selected' : '' ?>>Luxury</option>
                                            <option value="Adventure" <?= ($preferences['travel_style'] ?? '') == 'Adventure' ? 'selected' : '' ?>>Adventure</option>
                                            <option value="Cultural" <?= ($preferences['travel_style'] ?? '') == 'Cultural' ? 'selected' : '' ?>>Cultural</option>
                                        </select>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label class="form-label">Interests (Select multiple)</label>
                                        <?php 
                                        $interests = explode(',', $preferences['interests'] ?? '');
                                        $interests = array_map('trim', $interests);
                                        ?>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="interests[]" value="Food" <?= in_array('Food', $interests) ? 'checked' : '' ?>>
                                            <label class="form-check-label">Food & Dining</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="interests[]" value="History" <?= in_array('History', $interests) ? 'checked' : '' ?>>
                                            <label class="form-check-label">History & Culture</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="interests[]" value="Nature" <?= in_array('Nature', $interests) ? 'checked' : '' ?>>
                                            <label class="form-check-label">Nature & Wildlife</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="interests[]" value="Adventure" <?= in_array('Adventure', $interests) ? 'checked' : '' ?>>
                                            <label class="form-check-label">Adventure Sports</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" name="interests[]" value="Shopping" <?= in_array('Shopping', $interests) ? 'checked' : '' ?>>
                                            <label class="form-check-label">Shopping</label>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label class="form-label">Preferred Airlines</label>
                                        <input type="text" class="form-control" name="preferred_airlines" value="<?= htmlspecialchars($preferences['preferred_airlines'] ?? '') ?>">
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label class="form-label">Special Requirements</label>
                                        <textarea class="form-control" name="special_requirements" rows="3"><?= htmlspecialchars($preferences['special_requirements'] ?? '') ?></textarea>
                                    </div>
                                    
                                    <button type="submit" class="btn btn-primary">Save Preferences</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Change Photo Modal -->
    <div class="modal fade" id="changePhotoModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Change Profile Photo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="photoForm" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="profilePhoto" class="form-label">Select new photo</label>
                            <input class="form-control" type="file" id="profilePhoto" name="profile_photo" accept="image/*">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="uploadPhotoBtn">Upload</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.getElementById('uploadPhotoBtn').addEventListener('click', function() {
            const formData = new FormData(document.getElementById('photoForm'));
            
            fetch('upload_photo.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Profile photo updated successfully');
                    location.reload();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while uploading the photo');
            });
        });
    </script>
</body>
</html>