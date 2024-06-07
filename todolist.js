// form => sumbit => create new Todo => {id, createdAt, title:, isCOmplated}
// const todos = [] => todos.push( ... )

// let todos = [];
let filterValue = "all";
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");

todoForm.addEventListener("submit", addNewTodo);
function addNewTodo(e) {
  e.preventDefault();

  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isComplated: false,
  };


  let todos = saveTodo(newTodo);
  // todos.push(newTodo);
  //create todos on DOM
  createTodo(todos);
  filterTodos();
}

// create todo on DOM fun
function createTodo(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo" style="display: flex; align-items: center; gap: 10px; border: 1px solid black; width: fit-content; padding: 10px 20px; border-radius: 8px;">
                    <p class="todo__title ${todo.isComplated && "completed"}">${
      todo.title
    }</p>
                    <span class="todo__createdAt">${new Date(
                      todo.createdAt
                    ).toLocaleDateString("fa-IR")}</span>
                    <button class="todo__check" data-todo-id=${
                      todo.id
                    }><i class="far fa-check-square"></i></button>  
                    <button class="todo__edit" data-todo-id=${
                      todo.id
                    }><i class="far fa-edit"></i></button>
                    <button class="todo__remove" data-todo-id=${
                      todo.id
                    }><i class="far fa-trash-alt"></i></button>
                </li>`;
  });

  todoList.innerHTML = result;
  todoInput.value = "";

  // delete
  // چون این آیدی هنوز توی دام نبودی باید با همین فانکشن که تودو ها توش هستن کار کنیم
  const removeBtn = [...document.querySelectorAll(".todo__remove")];
  removeBtn.forEach((btn) => btn.addEventListener("click", removeTodo));

  // check
  const checkBtn = [...document.querySelectorAll(".todo__check")];
  checkBtn.forEach((btn) => btn.addEventListener("click", checkTodo));
}

// filter Todos video
const selectTodo = document.querySelector(".filter-todos");

selectTodo.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

function filterTodos() {
  // const filter = e.target.value;
  let todos = getAllTodo()
  switch (filterValue) {
    case "all": {
      createTodo(todos);
      break;
    }
    case "completed": {
      const filter = todos.filter((todo) => todo.isComplated);
      createTodo(filter);
      break;
    }
    case "uncompleted": {
      const filter = todos.filter((todo) => !todo.isComplated);
      createTodo(filter);
      break;
    }
    default:
      "";
  }
}

// removeBtn.addEventListener("click", removeTodo);
// Delete Todo ❌video
function removeTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((todo) => todo.id != todoId);
  filterTodos();
}

// delete todo --self
// removeBtn.addEventListener('click', removeTodo)
// function removeTodo(e) {
//   const todoId = Number(e.target.dataset.todoId)
//   const removeTodo = todos.filter((todo) => todo.id != todoId);
//   createTodo(removeTodo);
// }

// check todo ❌Video
function checkTodo(e) {
  let todos = getAllTodo()
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isComplated = !todo.isComplated;
  filterTodos();
}

// function editTodo(e) {
// }

// Local Storage

//show todods ()
// document.addEventListener('DOMcontentLoaded', (e)=> {
//   const todos = getAllTodo()
//   createTodo(todos)
// })
function getAllTodo() {
  const savedTodos = JSON.parse(localStorage.getItem("todos") || []);
  return savedTodos;
}

function saveTodo(todo) {
  let savedTodos = getAllTodo();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveAllTodos(todo) {
  localStorage.saveTodo(todo)
}