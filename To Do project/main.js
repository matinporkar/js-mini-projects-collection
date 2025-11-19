const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const completedTasks = document.getElementById("completedTasks");
const DeleteAll = document.getElementById("DeleteAll");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed === true) {
        li.classList.add("li-completed");
    }
    li.innerHTML = `
        <span class = "${task.completed ? "completed" : ""}"> ${task.text} </span>
        <div class="actions">
           <button onclick="toggleTask(${index})">✔</button>
           <button onclick="deleteTask(${index})">✖</button>
        </div>`;
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

const removeAllCompleted = () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
};

const DeleteAllTasks = () => {
    tasks = [];
    saveTasks();
    renderTasks();
}

renderTasks();

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter")  addTask();
});
completedTasks.addEventListener("click",removeAllCompleted);
DeleteAll.addEventListener("click",DeleteAllTasks);