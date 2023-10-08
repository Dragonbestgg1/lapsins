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
    // Assuming the task ID is stored as a data attribute named "data-task-id" on the taskContainer
    const taskId = taskContainer.getAttribute('data-task-id');
    return taskId;
}

// Function to make an element editable
function makeEditable(element) {
    element.contentEditable = true;
    element.focus();
}

// Function to update a task based on its ID
function updateTask(taskID, updatedTitle, updatedDescription) {
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

// Function to handle the "Edit" button click
function handleEditButtonClick(button) {
    // Find the parent task container
    const taskContainer = button.closest('.boxing-single');

    // Make the title and description editable
    makeEditable(taskContainer.querySelector('.task-title'));
    makeEditable(taskContainer.querySelector('.task-description'));

    // Change the "Edit" button to a "Save" button
    button.textContent = 'Save';
    button.classList.remove('update-button');
    button.classList.add('save-button');

    // Attach the event listener to handle saving
    button.addEventListener('click', () => {
        // Find the parent task container
        const taskContainer = button.closest('.boxing-single');
        // Extract the task ID from the task container
        const taskID = parseInt(taskContainer.getAttribute('data-task-id')); // Convert to integer

        // Extract the updated title and description from the elements
        const updatedTitle = taskContainer.querySelector('.task-title').textContent;
        const updatedDescription = taskContainer.querySelector('.task-description').textContent;

        // Call the updateTask function with the task ID and updated data
        updateTask(taskID, updatedTitle, updatedDescription);

        // Change the "Save" button back to an "Edit" button
        button.textContent = 'Edit';
        button.classList.remove('save-button');
        button.classList.add('update-button');
        // Remove the save click event listener to avoid conflicts
        button.removeEventListener('click', handleEditButtonClick);
    });
}

// Event listener for the Edit button
// Event listener for the Edit button
document.getElementById('edit').addEventListener('click', function () {
    // Select the task container by its data attribute
    const taskContainer = document.querySelector('.boxing-single');

    if (taskContainer) {
        // Find the elements inside the task container using their classes
        const titleElement = taskContainer.querySelector('.task-title');
        const descriptionElement = taskContainer.querySelector('.task-description');

        makeEditable(titleElement); // Make the h1 element editable
        makeEditable(descriptionElement); // Make the h3 element editable

        // Add the "editable" class to both elements
        titleElement.classList.add('editable');
        descriptionElement.classList.add('editable-h');
    } else {
        alert('No task container found. Make sure you have loaded a task first.');
    }
});


// Function to get tasks by ID
function getTaskByID() {
    let element = document.querySelector(".input");
    let resultContainer = document.getElementById("result-container");

    if (element) {
        let id = element.value;
        fetch(`get.php?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
            if (data.length === 1) {
                const task = data[0]; // Access the first row in the response

                // Access values using array indices
                const title = task[1]; // Assuming the title is at index 1
                const description = task[2]; // Assuming the description is at index 2
                const status = task[4]; // Assuming the status is at index 4
                const taskID = parseInt(task[0]); // Convert to integer if task_id is a numeric ID at index 0

                // Display the data in the resultContainer
                const taskContainer = document.createElement('div');
                taskContainer.classList.add('boxing-single');
                taskContainer.setAttribute('data-task-id', taskID);

                taskContainer.innerHTML = `
                    <h1 id="task-title">${title}</h1>
                    <div class="col-single">
                        <h3 id="task-description">${description}</h3>
                        <div class="delete-button-single">
                            <p>${status}</p>
                            <button id="edit" class="update-button">Edit</button>
                        </div>
                    </div>
                `;

                // Append the task container to the resultContainer
                resultContainer.appendChild(taskContainer);

                // Add event listener to the "Edit" button
                const editButton = taskContainer.querySelector('.update-button');
                editButton.addEventListener('click', () => {
                    handleEditButtonClick(editButton);
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

// Call the getTaskByID function to retrieve and display tasks
getTaskByID();
