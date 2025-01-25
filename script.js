// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when the page loads
    loadTasks();

    // Function to add a new task
    function addTask() {
        // Get the task text from the input field and trim any extra spaces
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return; // Exit the function if no task is entered
        }

        // Check if the task already exists
        const tasks = Array.from(taskList.children).map(li => li.textContent.replace("Remove", "").trim());
        if (tasks.includes(taskText)) {
            alert("This task already exists!");
            return;
        }

        // Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Add an event listener to the remove button to delete the task
        removeButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Save tasks after removal
        };

        // Add an event listener to mark the task as completed
        li.addEventListener('click', function () {
            li.classList.toggle('completed');
            saveTasks(); // Save tasks after marking as completed
        });

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the input field after adding the task
        taskInput.value = "";

        // Save tasks to localStorage
        saveTasks();
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.textContent.replace("Remove", "").trim(),
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;

            if (task.completed) {
                li.classList.add('completed');
            }

            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.className = "remove-btn";

            removeButton.onclick = function () {
                taskList.removeChild(li);
                saveTasks(); // Save tasks after removal
            };

            li.addEventListener('click', function () {
                li.classList.toggle('completed');
                saveTasks(); // Save tasks after marking as completed
            });

            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    }

    // Add an event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add an event listener to the input field to allow adding tasks with the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});