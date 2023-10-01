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
</head>
<body>
    <div class="redirects">
        <button class="text-gradient" onclick="location.href = 'login.php'">login</button>
        <button class="text-gradient" onclick="location.href = 'izveidot.php'">Izveidot</button>
    </div>
    <h1>Uzdevumi</h1>
    <div class="uzdevumi">
        <?php
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo"
                        <div class='boxing'>
                            <div class='task'>" . $row["title"] . "</div>
                            <div class='desc'>".$row["description"] ."</div>
                        </div>
                    ";
                }
            } else {
                echo "No tasks found.";
            }
        ?>
    </div>
</body>
</html>