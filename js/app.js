// Selecting elements
var taskInput = document.getElementById("new-task"); // Input field for entering a new task
var addButton = document.getElementsByTagName("button")[0]; // "Add" button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); // List for incomplete tasks
var completedTasksHolder = document.getElementById("completed-tasks"); // List for completed tasks

// Function to create a new task element
function createNewTaskElement(taskString) {
  var listItem = document.createElement("li"); // List item (<li>)
  var checkBox = document.createElement("input"); // Checkbox (<input>)
  var label = document.createElement("label"); // Label (<label>)
  var editInput = document.createElement("input"); // Input field for editing
  var editButton = document.createElement("button"); // Edit button
  var deleteButton = document.createElement("button"); // Delete button

  checkBox.type = "checkbox"; // Creating a checkbox
  editInput.type = "text"; // Creating an input field for editing
  editButton.innerText = "Edit"; // Setting text for the edit button
  editButton.className = "edit"; // Adding a class to the edit button
  deleteButton.innerText = "Delete"; // Setting text for the delete button
  deleteButton.className = "delete"; // Adding a class to the delete button
  label.innerText = taskString; // Adding the task name to the label

  // Appending elements to the list item
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem; // Returning the created task item
}

// Function to add a new task
function addTask() {
  var listItemName = taskInput.value || "New Item"; // Getting the task name or defaulting to "New Item"
  var listItem = createNewTaskElement(listItemName); // Creating a new task element
  incompleteTasksHolder.appendChild(listItem); // Adding the created task to the incomplete tasks list
  bindTaskEvents(listItem, taskCompleted); // Binding task events
  taskInput.value = ""; // Clearing the task input field
}

// Function to edit a task
function editTask() {
  var listItem = this.parentNode; // Getting the task item to be edited
  var editInput = listItem.querySelector("input[type=text"); // Getting the input field for editing
  var label = listItem.querySelector("label"); // Getting the label with the task name
  var button = listItem.getElementsByTagName("button")[0]; // Getting the edit button

  var containsClass = listItem.classList.contains("editMode"); // Checking if the task item has the "editMode" class
  if (containsClass) { // If it has the "editMode" class, editing is done
    label.innerText = editInput.value; // Setting the edited task name to the label
    button.innerText = "Edit"; // Changing the text of the edit button to "Edit"
  } else { // If it doesn't have the "editMode" class, editing is initiated
    editInput.value = label.innerText; // Setting the task name to the input field for editing
    button.innerText = "Save"; // Changing the text of the edit button to "Save"
  }
  listItem.classList.toggle("editMode"); // Toggling the status of the "editMode" class
}

// Function to delete a task
function deleteTask() {
  var listItem = this.parentNode; // Getting the task item to be deleted
  var ul = listItem.parentNode; // Getting the list in which the task item is located
  ul.removeChild(listItem); // Removing the task item from the list
}

// Function to mark a task as completed
function taskCompleted() {
  var listItem = this.parentNode; // Getting the task item marked as completed
  completedTasksHolder.appendChild(listItem); // Adding the task to the completed tasks list
  bindTaskEvents(listItem, taskIncomplete); // Binding task events
}

// Function to mark a task as incomplete
function taskIncomplete() {
  var listItem = this.parentNode; // Getting the task item marked as incomplete
  incompleteTasksHolder.appendChild(listItem); // Adding the task to the incomplete tasks list
  bindTaskEvents(listItem, taskCompleted); // Binding task events
}

// Function to bind task elements with events
function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector("input[type=checkbox]"); // Getting the checkbox
  var editButton = taskListItem.querySelector("button.edit"); // Getting the edit button
  var deleteButton = taskListItem.querySelector("button.delete"); // Getting the delete button
  editButton.onclick = editTask; // Assigning a click event to the edit button
  deleteButton.onclick = deleteTask; // Assigning a click event to the delete button
  checkBox.onchange = checkBoxEventHandler; // Assigning a change event to the checkbox
}

// Function to make an AJAX request
function ajaxRequest() {
  console.log("AJAX request"); // Logging that an AJAX request is made
}

addButton.addEventListener("click", addTask); // Adding a click event to the "Add" button
addButton.addEventListener("click", ajaxRequest); // Adding a click event to make an AJAX request

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted); // Binding events for incomplete tasks
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete); // Binding events for completed tasks
}
