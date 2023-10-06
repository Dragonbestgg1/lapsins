function validateForm() {
    var title = document.getElementById("title").value;
    var desc = document.getElementById("desc").value;
    var due_date = document.getElementById("due_date").value;
    var error_message_title = document.getElementById("error_message_title");
    var error_message_desc = document.getElementById("error_message_desc");
    var error_message_date = document.getElementById("error_message_date");
    var error_message = document.getElementById("error_message");

    // Check if title, desc, and due_date are not empty
    if (title === "" || desc === "" || due_date === "") {
        error_message.innerText = "Aizpildi visu";
        return false;
    }

    // Check if the title length is exactly 50 characters
    if (title.length > 50) {
        error_message_title.innerText = "Jabut mazak par 50 simboliem";
        return false;
    }
    if (desc.length > 3000) {
        error_message_desc.innerText = "Jabut mazak par 3000 simboliem";
        return false;
    }
    // Function to remove the time portion from a date
    function removeTimeFromDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    var dueDateObj = removeTimeFromDate(new Date(due_date));

    // Check if due_date is a valid date
    if (isNaN(dueDateObj.getTime())) {
        error_message_date.innerText = "Due Date is not a valid date";
        return false;
    }

    // Get the current date with time removed
    var currentDate = removeTimeFromDate(new Date());

    // Check if due_date is older than the current date
    if (dueDateObj < currentDate) {
        error_message_date.innerText = "Due Date cannot be older than the current date";
        return false;
    }

    // Check for duplicate values using AJAX
    checkForDuplicates(title, desc, due_date);

    // Prevent the form from submitting immediately
    return false;

    
}
function deleteTask(taskId) {
    // console.log(`Deleting task with ID ${taskId}`);
    // Construct the request data
    const requestData = {
        task_id: taskId
    };

    // Send a DELETE request to delete.php
    fetch('delete.php', {
        method: 'DELETE',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 204) {
            // Task deleted successfully
            return true;
        } else {
            // Handle errors here by logging the error message
            return response.text().then(error => {
                console.error('Error deleting task:', error);
                return false;
            });
        }
    })
    .then(deleted => {
        if (deleted) {
            setTimeout(() => {
                const taskElement = document.querySelector(`.task-id-${taskId}`);
                if (taskElement) {
                    taskElement.remove();
                } else {
                    console.error(`Task element with ID ${taskId} not found.`);
                }
            }, 100); // Add a delay (e.g., 100 milliseconds)
        }
    })
    
    .catch(error => {
        // Handle network or other errors
        console.error('Network error:', error);
    });
}
// Place the JavaScript code in your script.js file

// Function to extract the task ID from the task container
function extractTaskID(taskContainer) {
    // You should customize this function based on your HTML structure and data
    // For example, if the task ID is stored as a data attribute on the container:
    const taskId = taskContainer.getAttribute('data-task-id');
    return taskId;
}

// Function to update a task based on its ID
function updateTask(taskID) {
    // Get the updated task details from the user (modify as needed)
    const updatedTitle = document.getElementById('updated-title').value;
    const updatedDescription = document.getElementById('updated-description').value;

    // Create an object with the updated task data
    const updatedTaskData = {
        task_id: taskID,
        title: updatedTitle,
        description: updatedDescription,
    };

    // Send an update request to the server
    fetch('update.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskData),
    })
    .then(response => {
        if (response.ok) {
            // Handle success (e.g., display a success message, refresh the task list)
            console.log('Task updated successfully');
            // Refresh the task list or perform any other necessary actions
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error (e.g., display an error message)
    });
}


// Function to get task by ID (modified to include the update button)
function getTaskByID() {
    let element = document.querySelector(".input");
    let resultContainer = document.getElementById("result-container");

    if (element) {
        let id = element.value;
        fetch(`get.php?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Assuming the response is JSON
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            // Handle the data returned from the server
            // console.log(data);
            resultContainer.innerHTML = ''; // Clear previous content
            if (data.length == 1) {
                // Loop through the data and display it
                data.forEach((task) => {
                    const title = task[1]; // Assuming the title is the first item in each JSON object
                    const description = task[2]; // Assuming the description is the second item in each JSON object
                    const status = task[4];
                
                    // Display the data in the resultContainer
                    const taskContainer = document.createElement('div');
                    taskContainer.classList.add('boxing-single');
                    taskContainer.setAttribute('data-task-id', task[0]); // Assuming task[0] contains the task ID

                    taskContainer.innerHTML = `
                        <h1>${title}</h1>
                        <div class="col-single">
                            <h3>${description}</h3>
                            <div class="delete-button-single">
                                <p>${status}</p>
                                <button class="update-button" id="edit">Edit</button>
                            </div>
                        </div>
                    `;
                    // Append the task container to the resultContainer
                    resultContainer.appendChild(taskContainer);
                });
                
                // Add event listeners to the "Update" buttons
                const updateButtons = document.querySelectorAll('.update-button');
                updateButtons.forEach((button) => {
                    button.addEventListener('click', () => {
                        // Find the parent task container
                        const taskContainer = button.closest('.boxing-single');
                        // Extract the task ID from the task container
                        const taskID = extractTaskID(taskContainer);
                        // Call the updateTask function with the task ID
                        updateTask(taskID);
                    });
                });
                
            } else {
                resultContainer.innerHTML = '<p>No tasks found.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultContainer.innerHTML = '<p>Error fetching data.</p>';
        });
    } else {
        alert("Element with class 'input' not found.");
    }
}
