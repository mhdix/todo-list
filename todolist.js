// form => sumbit => create new Todo => {id, createdAt, title:, isCOmplated}
// const todos = [] => todos.push( ... )

const todos = [];

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
// const todoBtn = document.querySelector(".todo-button");
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

  todos.push(newTodo);

  //create todos on DOM
  createTodo(todos);
}

// create todo on DOM fun
function createTodo(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo" style="display: flex; align-items: center; gap: 10px; border: 1px solid black; width: fit-content; padding: 10px 20px; border-radius: 8px;">
                    <p class="todo__title">${todo.title}</p>
                    <span class="todo__createdAt">${new Date(
                      todo.createdAt
                    ).toLocaleDateString("fa-IR")}</span>
                    <button class="todo__check" data-todo-id=${todo.id}><i class="far fa-check-square"></i></button>
                    <button class="todo__remove" data-todo-id=${todo.id}><i class="far fa-trash-alt"></i></button>
                </li>`;
  });

  todoList.innerHTML = result;
  todoInput.value = "";
}

//? filter Todos video 
const selectTodo = document.querySelector(".filter-todos");
selectTodo.addEventListener("change", filterTodos);
function filterTodos(e) {
  const filter = e.target.value;

  switch (filter) {
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

//?  flilter todos ❌self
// const selectTodo = document.querySelector(".filter-todos");
// selectTodo.addEventListener('change', filterTodos)

// function filterTodos(e) {
//   const filter = e.target.value;
//   switch (filter) {
//     case "all": {
//       createTodo(todos);
//       break;
//     }
//     case "completed": {
//       const filter = todos.filter((todo) => todo.isComplated);
//       createTodo(filter);
//       break;
//     }
//     case "uncompleted": {
//       const filter = todos.filter((todo) => !todo.isComplated);
//       createTodo(filter);
//       break;
//     }
//     default:
//       createTodo(todos);
//   }
// } 

//? Delete Todo ❌video