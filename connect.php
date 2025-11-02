<?php
$email = $_POST['email'];
$password = $_POST['password'];

// Database connection parameters
$servername = "localhost";
$username = "root";
$db_password = ""; // Use a different variable name for the database password
$dbname = "internship_db";

// Create connection
$conn = new mysqli($servername, $username, $db_password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind to prevent SQL injection
$stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);

// Execute the statement
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($hashed_password);
    $stmt->fetch();
    
    // Verify the password
    if (password_verify($password, $hashed_password)) {
        echo "Login successful!";
        // Here you can start a session and redirect the user to their dashboard
        // session_start();
        // $_SESSION['email'] = $email;
        // header("Location: dashboard.html");
    } else {
        echo "Invalid password.";
    }
} else {
    echo "No user found with that email.";
}

$stmt->close();
$conn->close();
?>