// DOM Elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filter");

let todos = [];
let currentFilter = "all";

const filterTodos = (filter) => filter === "active" ? todos.filter((todo) => !todo.completed) : filter === "completed" ? todos.filter((todo) => todo.completed) : todos;

window.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  updateItemsCount();
  setDate();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = taskInput.value;
  if (text.trim() === "") return;
  todos.push({ id: Date.now(), text, completed: false });

  saveTodos();
  renderTodos();
  taskInput.value = "";
});

clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  updateItemsCount();
  checkEmptyState();
}

function updateItemsCount() {
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  itemsLeft.textContent = `${uncompletedTodos?.length} item${uncompletedTodos?.length !== 1 ? "s" : ""} left`;
}

function checkEmptyState() {
  const filteredTodos = filterTodos(currentFilter);
  if (filteredTodos?.length === 0) emptyState.classList.remove("hidden");
  else emptyState.classList.add("hidden");
}

function renderTodos() {
  todosList.innerHTML = "";

  const filteredTodos = filterTodos(currentFilter);
  filteredTodos.forEach((todo) => {
    todosList.innerHTML += `
      <li class="todo-item${todo.completed ? " completed" : ""}">
        <label class="checkbox-container">
          <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""} onchange="toggleTodo(${todo.id})" />
          <span class="checkmark"></span>
        </label>
        <span class="todo-item-text">${todo.text}</span>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})"><i class="fas fa-times"></i></button>
      </li>
    `
  });
}

function toggleTodo(id) {
  todos = todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo );
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function loadTodos() {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) todos = JSON.parse(storedTodos);
  renderTodos();
}

filters.forEach((filter) => filter.addEventListener("click", () => setActiveFilter(filter.getAttribute("data-filter"))));

function setActiveFilter(filter) {
  currentFilter = filter;

  filters.forEach((item) => {
    if (item.getAttribute("data-filter") === filter) item.classList.add("active");
    else item.classList.remove("active");
  });

  renderTodos();
}

function setDate() {
  const options = { weekday: "long", month: "short", day: "numeric" };
  const today = new Date();
  dateElement.textContent = today.toLocaleDateString("en-US", options);
}