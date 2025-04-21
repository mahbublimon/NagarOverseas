CREATE DATABASE nagaroverseas;
USE nagaroverseas;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    zip VARCHAR(20),
    country VARCHAR(50),
    bio TEXT,
    travel_preferences TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    destination VARCHAR(100) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    hotel_name VARCHAR(100),
    airline VARCHAR(100),
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('confirmed', 'pending', 'cancelled', 'completed') DEFAULT 'pending',
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_preferences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    travel_style VARCHAR(50),
    interests TEXT,
    preferred_airlines TEXT,
    special_requirements TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE visa_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    visa_type VARCHAR(50) NOT NULL,
    destination_country VARCHAR(50) NOT NULL,
    travel_date DATE NOT NULL,
    additional_info TEXT,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Pending',
    admin_notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submission_date DATETIME NOT NULL,
    is_read TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;