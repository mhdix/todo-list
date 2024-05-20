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
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo" style="display: flex; align-items: center; gap: 10px; border: 1px solid black; width: fit-content; padding: 10px 20px; border-radius: 8px;">
                    <p class="todo__title">${todo.title}</p>
                    <span class="todo__createdAt">${new Date(
                      todo.createdAt
                    ).toLocaleDateString("fa-IR")}</span>
                    <button><i class="todo__check far fa-check-square"></i></button>
                    <button><i class="todo__remove far fa-trash-alt"></i></button>
                </li>`;
  });

  todoList.innerHTML = result;
  todoInput.value = "";
}

console.log(todos);

// const todos = [];
// const todoForm = document.querySelector(".todo-form");

// todoForm.addEventListener("sumbit", addTodos);

// function addNewTodo(e) {
//     const newTodo = {
//         id: Date.now(),
//         createdAt: new Date().toISOString(),
//     }
//   e.preventDefault();
// }

console.log(new Date().toISOString('fa-IR'));
// console.log('fgdgs');