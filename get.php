<?php
include "db.php";
$db = new db();
if(isset($_GET['id'])){
    $id = $_GET['id'];
    $result = $db->selectWhereID($id);
    $response = $result->fetch_all();
    echo json_encode($response);

}

?>