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
            die("Error preparing statement: " . $this->conn->error);
        }
        
        if (!empty($params)) {
            // Dynamically bind parameters
            $types = str_repeat("s", count($params)); // Assuming all parameters are strings
            $stmt->bind_param($types, ...$params);
        }
        
        if ($stmt->execute() === false) {
            die("Error executing statement: " . $stmt->error);
        }
        
        $result = $stmt->get_result();
        return $result;
        
    }
}
?>