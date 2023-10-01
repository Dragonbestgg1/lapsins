function checkForDuplicates(title, desc, due_date) {
    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the URL for the server-side script that checks for duplicates
    var url = "check_duplicates.php"; // Replace with the actual URL

    // Define the data to be sent to the server
    var data = "title=" + title + "&desc=" + desc + "&due_date=" + due_date;

    // Configure the request
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Set up a callback function to handle the response
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // The response from the server
            var response = xhr.responseText;

            if (response === "duplicate") {
                alert("This entry already exists. Please enter unique values.");
            } else {
                // No duplicate found, you can submit the form programmatically
                document.getElementById("myForm").submit();
            }
        }
    };

    // Send the request
    xhr.send(data);
}
function validateForm() {
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var due_date = document.getElementById("due_date").value;

    // Check if title, desc, and due_date are not empty
    if (title === "" || desc === "" || due_date === "") {
        alert("Please fill in all fields");
        return false;
    }

    // Check for duplicate values using AJAX
    checkForDuplicates(title, desc, due_date);

    // Prevent the form from submitting immediately
    return false;
}
