let listContainer = document.getElementById('list-container');
let inputBox = document.getElementById('input-box');

function addTask(){
    const taskValue = inputBox.value.trim();

    if(taskValue === ''){
        alert('Please add your task');
    } 
    else if (isTaskDuplicate(taskValue)) {
        alert('Task already exists!');
    } 
    else {
        let task = document.createElement('li');
        task.textContent = taskValue;
        
        let span = document.createElement('span');
        span.textContent = 'Delete'; // Cross icon for deleting

        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.onclick = function() {
            editTask(task);
        };

        task.appendChild(editButton);
        task.appendChild(span);
        listContainer.appendChild(task);
    }

    inputBox.value = '';
    saveData();
}

function isTaskDuplicate(taskValue) {
    let tasks = listContainer.getElementsByTagName('li');
    for (let task of tasks) {
        if (task.childNodes[0].nodeValue.trim() === taskValue) {
            return true;
        }
    }
    return false;
}

function editTask(task) {
    let updatedTask = prompt("Edit your task:", task.childNodes[0].nodeValue.trim());
    if (updatedTask && updatedTask.trim() !== '' && !isTaskDuplicate(updatedTask.trim())) {
        task.childNodes[0].nodeValue = updatedTask.trim();
        saveData();
    } else if (isTaskDuplicate(updatedTask.trim())) {
        alert("Task already exists!");
    }
}

listContainer.addEventListener('click', (el) => {
    if(el.target.tagName === 'LI'){
        el.target.classList.toggle('checked');
        saveData();
    } 
    else if(el.target.tagName === 'SPAN'){
        el.target.parentElement.remove();
        saveData();
    }
});

function saveData(){
    localStorage.setItem('tasks', listContainer.innerHTML);
}

function showData(){
    listContainer.innerHTML = localStorage.getItem('tasks');
}

showData();