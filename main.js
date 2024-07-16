const todos = [];

// select
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");

const selectFilter = document.querySelector(".filter-todos");

// event
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", filterTodos);
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
  createTodos(todos);
}

function createTodos(todos) {
  let result = "";

  todos.forEach((todo) => {
    result += `
            <li class="todo">
                <p class="todo__title">${todo.title}</p>
                <span class="todo__createdAt">1402/1/28</span>
                <button><i class="todo__check far fa-check-square"></i></button>
                <button><i class="todo__remove far fa-trash-alt"></i></button>
            </li>
        `;
  });

  todoList.innerHTML = result;
  todoInput.value = "";
}
function filterTodos(e) {
  // console.log(e.target.value);
  const filter = e.target.value;
  switch (filter) {
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
