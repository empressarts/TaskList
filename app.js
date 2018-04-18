//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();
//DOM Load Event ~ to show saved tasks
document.addEventListener('DOMContentLoaded', getTasks)

//Load all event listeners
function loadEventListeners() {
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}
//Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) { //if nothing in tasks
      tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  //Loop through to show tasks ~copied from "Add task"
  tasks.forEach(function(task){
    //Create li element
  const li = document.createElement('li');
  //Add class
  li.className = 'collection-item';
  //Create text node and append to li
  li.appendChild(document.createTextNode(task)); //have to change to tasks
  //Create new link element
  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);
  })
}

//Add task
function addTask(e) {
  e.preventDefault();

  if(taskInput.value === '') {
    alert('Add a task');
  } else {

  //Create li element
  const li = document.createElement('li');
  //Add class
  li.className = 'collection-item';
  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);


 //Clear input
 taskInput.value = '';
    
  
  }
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) { //if nothing in tasks
      tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?'))  {
      e.target.parentElement.parentElement.remove();

      //Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) { //if nothing in tasks
      tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // loop through
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task) { //if text content equals current iteration
        tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks)); //reset local storae
}






//Clear Tasks
function clearTasks(){
  //taskList.innerHTML = '';

  //Faster way
  while (taskList.firstChild) { // while there is still a first child
    taskList.removeChild(taskList.firstChild);
  }

  //Clear from local Storage
  clearTasksFromLocalStorage();
}

//Clear Tasks from local Storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();//get what's being typed
  
  //loop through all list items
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){ //if no match will = -1
        task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}