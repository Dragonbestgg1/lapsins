<?php 
class db{
    public $host;
    public $user;
    public $password;
    public $dbname;
    public $conn;

    public function __construct() {
        $this->host = "localhost";
        $this->user = "root";
        $this->password = "";
        $this->dbname = "task_management";

        $this->conn = new mysqli($this->host, $this->user, $this->password, $this->dbname);

        if ($this->conn->connect_error) {
            die("Savienojums Neizdevās: " . $this->conn->connect_error);
        }
    }
    function insert($data)
    {
        if ($this->conn->query($data) === TRUE) {
            return 0;
        } else {
            return $this->conn->error;
        }
    }
    function selectAll(){
        $sql="SELECT * FROM tasks ORDER BY id ASC;";
        $result=$this->conn->query($sql);
        return $result;
    }
    function query($sql, $params = []) {
        $stmt = $this->conn->prepare($sql);
    
        if ($stmt === false) {
            return ["success" => false, "message" => "Error preparing statement: " . $this->conn->error];
        }
    
        if (!empty($params)) {
            // Dynamically bind parameters with appropriate data types
            $types = "";
            foreach ($params as $param) {
                if (is_int($param)) {
                    $types .= "i"; // Integer
                } elseif (is_double($param)) {
                    $types .= "d"; // Double (float)
                } elseif (is_string($param)) {
                    $types .= "s"; // String
                } else {
                    $types .= "s"; // Default to string
                }
            }
            $stmt->bind_param($types, ...$params);
        }
    
        if ($stmt->execute() === false) {
            return ["success" => false, "message" => "Error executing statement: " . $stmt->error];
        }
    
        $result = $stmt->get_result();
        return ["success" => true, "result" => $result];
    }
    
    function delete($id) {
        $sql = "DELETE FROM tasks WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
    
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    function selectWhereID($id) {
        $sql = "SELECT * FROM tasks WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id); // Assuming 'id' is an integer, use "i" for integers, "s" for strings, etc.
    
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $stmt->close();
            return $result;
        } else {
            // Handle the query execution error here
            return 'gejs';
        }
    }
    
}
?>