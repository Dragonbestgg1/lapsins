<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Izveidot</title>
</head>
<body>
    <div class="redirects-single">
        <button class="text-gradient" onclick="location.href = 'index.php'">main</button>
    </div>
    <div class="izveidot">
        <form action="" method="post" onsubmit="return validateForm()">
            <div class="col">
                <label for="title">Title</label>
                <input type="text" id="title" name="title" class="input">
                <p id="error_message_title"></p>
            </div>
            <div class="col">
                <label for="desc">Description</label>
                <textarea id="desc" name="desc" class="area" rows="3" cols="20"></textarea>
                <p id="error_message_desc"></p>
            </div>
            <div class="col">
                <label for="due_date">Due Date</label>
                <input type="date" id="due_date" name="due_date" class="input">
                <p id="error_message_date"></p>
            </div>
            <button type="submit" class="submit">Submit</button>
        </form>
        <p id="error_message"></p>
    </div>
    <script src="script.js"></script>
    <?php include "insert.php"?>
</body>
</html>
