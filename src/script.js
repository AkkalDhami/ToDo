let toDoContainer = document.querySelector("#taskLists");
let toDoForm = document.querySelector("#toDoForm");
let taskInput = document.querySelector("#taskInput");

document.addEventListener("DOMContentLoaded", () => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    let icon = task.isComplete
      ? `<i class="fa-solid fa-circle-check"></i>`
      : `<i class="fa-regular fa-circle"></i>`;
    let color = task.isComplete ? "text-green-500" : "text-red-500";
    addToDo(task.id, task.text, icon, color);
  });
});

toDoForm.addEventListener("submit", (e) => {
  let taskInputValue = taskInput.value.trim();
  e.preventDefault();
  if (!validInput()) return;

  let taskId = Date.now();

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ id: taskId, text: taskInputValue, isComplete: false, color: "text-red-500" });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addToDo(taskId, taskInputValue, `<i class="fa-regular fa-circle"></i>`, "text-red-500");

  clearInput();
});

function validInput() {
  let taskInputValue = taskInput.value.trim();
  if (taskInputValue === "") {
    alert("Task input field cannot be empty.");
    return false;
  }
  return true;
}

function clearInput() {
  taskInput.value = "";
}

function addToDo(id, input, icon, color) {
  toDoContainer.innerHTML += `
    <li
         id="todo${id}"
         class="text-xl rounded-lg flex border border-gray-500 hover:border-[#1ccc0f] duration-300 justify-between items-center px-3 py-4 w-full"
       >
         <div class="flex justify-between items-center w-full gap-3">
           <h3 onclick="checkedToDo(${id})" class="checkedToDo ${color} cursor-pointer">
             ${icon}
           </h3>
           <p class="grow text-[18px]">${input}</p>
           <button  onclick="editToDo(${id})"
             class="editToDo text-[22px] text-gray-400 font-medium hover:text-orange-500 duration-300"
           >
             <i class="fa-regular fa-pen-to-square"></i>
           </button>
           
           <button
             class="deleteToDo text-[22px] text-gray-400 font-medium hover:text-orange-500 duration-300"
             onclick="deleteTask(${id})"
           >
             <i class="fa-solid fa-xmark"></i>
           </button>
         </div>
       </li>
 `;
}


function editToDo(id) {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id === id);
  let taskInputValue = tasks[0].text;
  console.log(taskInputValue)
  taskInput.value = taskInputValue;
  taskInput.focus();
  taskInput.select();
  deleteTask(id)
}



function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.querySelector(`#todo${id}`).remove();
}

function checkedToDo(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.isComplete = !task.isComplete;
      task.color = task.isComplete ? "text-green-500" : "text-red-500";
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  let taskElement = document.querySelector(`#todo${id} .checkedToDo`);
  if (taskElement) {
    let task = tasks.find((task) => task.id === id);
    if (task.isComplete) {
      taskElement.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
      taskElement.classList.remove(`text-red-500`);
      taskElement.classList.add(`text-green-500`);
    } else {
      taskElement.innerHTML = `<i class="fa-regular fa-circle"></i>`;
      taskElement.classList.add(`text-red-500`);
      taskElement.classList.remove(`text-green-500`);
    }
  }
}
