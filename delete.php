<?php
include "db.php"; // Include your database connection code

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->task_id)) {
        $db = new db;
        $task_id = $data->task_id;

        // Delete the task from the database
        $sql = "DELETE FROM tasks WHERE id = ?";
        $params = [$task_id];
        $result = $db->query($sql, $params);

        if ($result) {
            // Task deleted successfully
            http_response_code(204); // No content (successful deletion)
            echo json_encode(["success" => true, "message" => "Task deleted successfully"]);
        } else {
            // Error deleting task
            http_response_code(500); // Internal Server Error
            echo json_encode(["success" => false, "message" => "Error deleting task"]);
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

