<?php
include "db.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extract data from the form
    $title = $_POST["title"];
    $description = $_POST["desc"];
    $due_date = $_POST["due_date"]; 
    $db = new db;
    
    // Check for duplicates
    $sql = "SELECT COUNT(*) FROM tasks WHERE title = ? AND description = ? AND due_date = ?";
    $stmt = $db->conn->prepare($sql);
    $stmt->bind_param("sss", $title, $description, $due_date);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();
    
    if ($count > 0) {
        echo "<p>Tads ieraksts eksiste!</p>";
    } else {
        // Get the current date
        $created_at = date("Y-m-d");
    
        // Insert data into the database, including the current date
        $sql = "INSERT INTO tasks (title, description, due_date, created_at) VALUES (?, ?, ?, ?)";
        $params = [$title, $description, $due_date, $created_at];
        $db->query($sql, $params);
        
        echo "<p>Dati ievaditi</p>";
    }
}
?>
