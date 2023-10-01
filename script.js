function validateForm() {
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var due_date = document.getElementById("due_date").value;
    
    // Add your validation logic here
    // For example, check if title, desc, and due_date are not empty
    
    if (title === "" || desc === "" || due_date === "") {
        alert("Please fill in all fields");
        return false;
    }
    
    return true;
}