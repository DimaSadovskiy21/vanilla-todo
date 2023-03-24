const todoInput = document.querySelector(".todo__input");
const todoSubmit = document.querySelector(".todo__button_submit");
const todoList = document.querySelector(".todo__list_items");
const filterAll = document.getElementById("all");
const filterActive = document.getElementById("active");
const filterCompleted = document.getElementById("completed");
const filterBlock = document.querySelector(".todo__filter_block");
const todoListsBlock = document.querySelector(".todo__list");

document.addEventListener("DOMContentLoaded", getTodos);
todoSubmit.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
todoList.addEventListener("click", completeTodo);
filterAll.addEventListener("click", getAllTasks);
filterActive.addEventListener("click", getActiveTasks);
filterCompleted.addEventListener("click", getCompletedTasks);

function addTodo(e) {
  e.preventDefault();

  filterBlock.style.display = "flex";
  todoListsBlock.style.display = "block";

  const id = crypto.randomUUID()

  const newTodo = document.createElement("li");
  newTodo.setAttribute('id',id)
  newTodo.classList.add("todo__list_item");
 

  const itemTitle = document.createElement("p");
  itemTitle.classList.add("item__title");
  itemTitle.innerText = todoInput.value;
  newTodo.appendChild(itemTitle);

  const itemButtonBlock = document.createElement("div");
  itemButtonBlock.classList.add("item__button_block");

  const completedButton = document.createElement("button");
  completedButton.innerHTML = "&#10004;";
  completedButton.classList.add("item__button_complete");
  itemButtonBlock.appendChild(completedButton);

  const deletedButton = document.createElement("button");
  deletedButton.innerHTML = "&#10008;";
  deletedButton.classList.add("item__button_delete");
  itemButtonBlock.appendChild(deletedButton);

  newTodo.appendChild(itemButtonBlock);

  saveLocalTodos({id: id, title: todoInput.value, status: false});
  todoInput.value = "";

  todoList.appendChild(newTodo);
}

function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "item__button_delete") {
    const todo = item.parentElement.parentElement;
    console.log(todo)
    removeLocalTodos(todo)
    todo.remove();
  }

  if (!todoList.children.length) {
    filterBlock.style.display = "none";
  }
}

function completeTodo(e) {
  const item = e.target;
  
  if (item.classList[0] === "item__button_complete") {
    const todo = item.parentElement.parentElement.querySelector(".item__title");
    todo.classList.toggle("completed");
    changeStatusLocalTodos(item.parentElement.parentElement)
  }
}

function getAllTasks(e) {
  e.preventDefault();

  const todos = todoList.children;

  for (todo of todos) {
    todo.style.display = "flex";
  }
}

function getActiveTasks(e) {
  e.preventDefault();

  const todos = todoList.children;

  for (todo of todos) {
    if (!todo.firstElementChild.classList.contains("completed")) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  }
}

function getCompletedTasks(e) {
  e.preventDefault();

  const todos = todoList.children;

  for (todo of todos) {
    if (todo.firstElementChild.classList.contains("completed")) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  }
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoId = todo.getAttribute('id');
  const todosFilter = todos.filter(el => el.id !== todoId);
  localStorage.setItem("todos", JSON.stringify(todosFilter));
}

function changeStatusLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoId = todo.getAttribute('id');
  const changeStatusTodos = todos.map(el => el.id === todoId ? {...el, status: !el.status} : el );
  localStorage.setItem("todos", JSON.stringify(changeStatusTodos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    console.log(todo)

  filterBlock.style.display = "flex";
  todoListsBlock.style.display = "block";

  const newTodo = document.createElement("li");
  newTodo.setAttribute('id', todo.id)
  newTodo.classList.add("todo__list_item");

  const itemTitle = document.createElement("p");
  itemTitle.classList.add("item__title");
  itemTitle.innerText = todo.title;
  todo.status && itemTitle.classList.add('completed')
  
  newTodo.appendChild(itemTitle);

  const itemButtonBlock = document.createElement("div");
  itemButtonBlock.classList.add("item__button_block");

  const completedButton = document.createElement("button");
  completedButton.innerHTML = "&#10004;";
  completedButton.classList.add("item__button_complete");
  itemButtonBlock.appendChild(completedButton);

  const deletedButton = document.createElement("button");
  deletedButton.innerHTML = "&#10008;";
  deletedButton.classList.add("item__button_delete");
  itemButtonBlock.appendChild(deletedButton);

  newTodo.appendChild(itemButtonBlock);

  todoList.appendChild(newTodo);
  });
}
