<?php
include "db.php";
$db = new db;
$result = $db->selectAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Main</title>
    <script src="script.js"></script>
</head>
<body>
    <div class="redirects">
        <button class="text-gradient" onclick="location.href = 'login.php'">login</button>
        <button class="text-gradient" onclick="location.href = 'izveidot.php'">Izveidot</button>
        <button class="text-gradient" onclick="location.href = 'single.php'">Search/Update</button>
    </div>
    <h1>Uzdevumi</h1>
    <div class="uzdevumi">
        <?php
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo"
                        <div class='boxing task-id-". $row["id"] ."'>
                            <div class='col-title'>
                                <div class='task'>" . $row["title"] . "</div>
                                <h9>".$row['id']."</h9>
                            </div>
                            <div class='desc'>".$row["description"] ."</div>
                            <div class='delete-button'>
                                <div class='stat'>".$row["status"]."</div>
                                <button onclick='deleteTask(" . $row["id"] . ")'>Delete</button>
                            </div>
                        </div>
                    ";
                }
            } else {
                echo "
                    <div class='cent'>
                        <p>No tasks found.</p>
                    </div>
                ";
            }
        ?>
    </div>
</body>
</html>