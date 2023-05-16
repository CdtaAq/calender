<!DOCTYPE html>
<html>
<head>
  <title>Calendar App</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }

    .calendar {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 10px;
      margin-bottom: 20px;
    }

    .day {
      padding: 10px;
      border: 1px solid #ccc;
    }

    .day:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }

    .current-month {
      font-weight: bold;
    }

    .todo-list {
      list-style-type: none;
      padding: 0;
    }

    .todo-item {
      margin-bottom: 10px;
    }

    .todo-item input[type="checkbox"] {
      margin-right: 5px;
    }
  </style>
</head>
<body>
  <h1>Calendar App</h1>
  <div class="calendar"></div>
  <h2>Todo List</h2>
  <form id="todo-form">
    <input type="text" id="todo-input" placeholder="Add a new todo">
    <button type="submit">Add</button>
  </form>
  <ul id="todo-list" class="todo-list"></ul>

  <script>
    // Get the current date
    const currentDate = new Date();

    // Render the calendar
    function renderCalendar() {
      const calendar = document.querySelector('.calendar');
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      // Clear previous calendar
      calendar.innerHTML = '';

      // Render days of the week
      for (let day of daysOfWeek) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
      }

      // Get the first day and last day of the current month
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      // Render the calendar days
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i;

        if (i === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth()) {
          dayElement.classList.add('current-month');
        }

        calendar.appendChild(dayElement);
      }
    }

    // Render the todo list
    function renderTodoList() {
      const todoList = document.querySelector('#todo-list');
      todoList.innerHTML = '';

      // Retrieve todos from localStorage
      const todos = JSON.parse(localStorage.getItem('todos')) || [];

      // Render each todo item
      todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
          todo.completed = checkbox.checked;
          saveTodos(todos);
        });

        const text = document.createElement('span');
        text.textContent = todo.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
          todos.splice(todos.indexOf(todo), 1
