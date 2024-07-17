let todos = [];
let filterValue = 'all'

// select
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");

const selectFilter = document.querySelector(".filter-todos");

// event
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value
  filterTodos()
});

// functions
function addNewTodo(e) {
  e.preventDefault();

  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(),
    cretedAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };
  todos.push(newTodo);
  filterTodos();
}

function createTodos(todos) {
  let result = "";

  todos.forEach((todo) => {
    result += `
            <li class="todo">
                <p class="todo__title ${todo.isCompleted && "completed"}">${todo.title}</p>
                <span class="todo__createdAt">1402/1/28</span>
                <button class="todo__check" data-todo-id=${
                  todo.id
                }><i class="far fa-check-square"></i></button>
                <button class="todo__remove" data-todo-id=${
                  todo.id
                }><i class="far fa-trash-alt"></i></button>
            </li>
        `;
  });

  todoList.innerHTML = result;
  todoInput.value = "";

  // todo remove
  const removeBtns = [...document.querySelectorAll(".todo__remove ")];
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodos));

  // todo check
  const checkBtn = [...document.querySelectorAll(".todo__check")];
  checkBtn.forEach((btn) => btn.addEventListener("click", checkTodo));
}

function filterTodos(e) {
  // const filter = e.target.value;
  switch (filterValue) {
    case "all": {
      createTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((t) => !t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    default:
      createTodos(todos);
  }
}

// todo remove FN
function removeTodos(e) {
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((todo) => todo.id !== todoId);

  filterTodos()
}

// todo check
function checkTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((todo) => todo.id == todoId);
  todo.isCompleted = !todo.isCompleted;

  filterTodos()
} 