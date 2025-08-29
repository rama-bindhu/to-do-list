let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function renderTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;

    let li = document.createElement("li");
    li.className = `priority-${task.priority.toLowerCase()}`;
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <div class="actions">
        <button class="edit-btn" onclick="editTask(${index})">✏️</button>
        <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");
  let priority = document.getElementById("priority").value;
  let text = input.value.trim();

  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ text, priority, completed: false });
  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  let newTask = prompt("✍️ Edit Task:", tasks[index].text);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index].text = newTask.trim();
    renderTasks();
  }
}

function filterTasks(type) {
  filter = type;
  renderTasks();
}

function clearAll() {
  if (confirm("⚠️ Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

renderTasks();
