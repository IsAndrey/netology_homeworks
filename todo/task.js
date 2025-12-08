const tasksForm = document.getElementById("tasks__form");
const taskInput = document.getElementById("task__input");
const tasksList = document.getElementById("tasks__list");
const savedTasksKey = "tasks";

taskInput.setAttribute("required", "");
tasksForm.setAttribute("novalidate", "");

function showTask(parent, textTask) {
  const task = document.createElement("div");
  const taskTitle = document.createElement("div");
  const taskRemove = document.createElement("a");
  taskRemove.setAttribute("href", "#");

  task.classList.add("task");
  taskTitle.classList.add("task__title");
  taskRemove.classList.add("task__remove");

  taskTitle.textContent = textTask;
  taskRemove.innerHTML = "&times;";

  parent.appendChild(task);
  task.appendChild(taskTitle);
  task.appendChild(taskRemove);
}

window.addEventListener("load", () => {
  const jsonTasks = localStorage.getItem(savedTasksKey);
  if (jsonTasks) {
    const savedTasks = JSON.parse(jsonTasks);
    for (let i = 0; i < savedTasks.length; i++) {
      showTask(tasksList, savedTasks[i]);
    }
  }
});

function manageLocalStorage() {
  const task = tasksList.getElementsByClassName("task");
  if (task.length > 0) {
    const savedTasks = [];
    for (let i = 0; i < task.length; i++) {
      const taskTitle = task[i].querySelector(".task__title");
      savedTasks[i] = taskTitle.textContent;
    }
    const jsonTasks = JSON.stringify(savedTasks);
    if (jsonTasks) {
      localStorage.setItem(savedTasksKey, jsonTasks);
    }
  } else {
    localStorage.clear();
  }
}

function submitHandler(event) {
  event.preventDefault();
  taskInput.value = taskInput.value.trim();
  if (taskInput.checkValidity()) {
    showTask(tasksList, taskInput.value);
    manageLocalStorage();
    tasksForm.reset();
  }
}

taskInput.addEventListener("change", submitHandler);
tasksForm.addEventListener("submit", submitHandler);

tasksList.addEventListener("click", (event) => {
  if (event.target.classList.contains("task__remove")) {
    event.target.parentNode.remove();
    manageLocalStorage();
  }
});
