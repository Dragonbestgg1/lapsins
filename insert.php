<?php
include "db.php";
$db = new db;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extract data from the form
    $title = $_POST["title"];
    $description = $_POST["desc"];
    $due_date = $_POST["due_date"]; // Make sure to add the name attribute to the date input in your HTML.
    
    // Get the current date
    $created_at = date("Y-m-d");

    // Insert data into the database, including the current date
    $sql = "INSERT INTO tasks (title, description, due_date, created_at) VALUES (?, ?, ?, ?)";
    $params = [$title, $description, $due_date, $created_at];
    $db->query($sql, $params);
    
    echo "Data has been successfully inserted into the database.";
}
?>
