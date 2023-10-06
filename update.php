<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] === "PUT") {
    // Get JSON data from the request body
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->task_id) && !empty($data->title) && !empty($data->description)) {
        $db = new db;
        $task_id = $data->task_id;
        $title = $data->title;
        $description = $data->description;

        // Update the task in the database
        $sql = "UPDATE tasks SET title = ?, description = ? WHERE id = ?";
        $params = [$title, $description, $task_id];
        $result = $db->query($sql, $params);

        if ($result) {
            // Task updated successfully
            http_response_code(204); // No content (successful update)
            echo json_encode(["success" => true, "message" => "Task updated successfully"]);
        } else {
            // Error updating task
            http_response_code(500); // Internal Server Error
            echo json_encode(["success" => false, "message" => "Error updating task"]);
        }
    } else {
        // Invalid request data
        http_response_code(400); // Bad Request
        echo json_encode(["success" => false, "message" => "Invalid request data"]);
    }
} else {
    // Method not allowed
    http_response_code(405); // Method Not Allowed
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
}
?>
