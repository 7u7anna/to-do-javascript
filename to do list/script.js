document.getElementById('add').addEventListener('click', addTask);
document.getElementById('clear').addEventListener('click', () => {
      document.getElementById('taskInput').value = '';
      window.localStorage.clear();
      let clearDivs = document.getElementsByClassName('taskHolder');
      window.location.reload();
      for (let i=0; i < clearDivs.length; i++) {
            clearDivs[i].style.display = 'none';
      }
});

const taskContainer = document.getElementById('plannedTasks');

let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
let checkboxList = JSON.parse(localStorage.getItem('checkbox')) || [];


function loadTasks() { 
      if (taskList.length >= 0) {
            for (let i = 0; i <= taskList.length - 1; i++) {
                  let loadTaskDiv = document.createElement('div');
                  loadTaskDiv.setAttribute("id", "taskDiv");
                  loadTaskDiv.setAttribute('class', 'loadTask');
                  let loadLabel = document.createElement('label');
                  let loadCheckbox = document.createElement('input');
                  loadCheckbox.setAttribute('class', 'getCheckbox');
                  let setCheckbox = 'setCheckbox-' + i;
                  loadCheckbox.setAttribute('id', setCheckbox);
                  let loadSpan = document.createElement('span');
                  let loadRemoveButton = document.createElement('button');
                  loadRemoveButton.setAttribute("id", "deleteButton");
                  loadRemoveButton.setAttribute('class', 'loadRemoveButton');
                  loadRemoveButton.innerHTML = 'remove';
                  loadCheckbox.type = 'checkbox';
                  loadLabel.appendChild(loadCheckbox);
                  loadSpan.innerHTML = ' ' + taskList[i];
                  loadLabel.appendChild(loadSpan);
                  loadTaskDiv.appendChild(loadLabel);
                  loadTaskDiv.appendChild(loadRemoveButton);
                  taskContainer.appendChild(loadTaskDiv);

            } 
            let totalTasks = document.getElementsByClassName('loadRemoveButton');
            for (let i=0; i < totalTasks.length; i++) {
                  let index = i;
                  totalTasks[i].onclick = function() {
                        let parentDiv = this.parentNode;
                        parentDiv.style.display = 'none';
                        let retriveTaskList = JSON.parse(localStorage.getItem('tasks'));
                        retriveTaskList.splice(index, 1);
                        localStorage.setItem('tasks', JSON.stringify(retriveTaskList));
                        console.log(retriveTaskList);
                        taskList = retriveTaskList;
                  }
            let checkboxList = document.querySelectorAll(`input[type*='checkbox']`);
            for (let i=0; i < checkboxList.length; i++) {
                  checkboxList[i].onclick = function() {
                        checkboxList.forEach(element => {
                              localStorage.setItem(element.id , element.checked);
                        });
                  }
                  checkboxList.forEach(element => {
                        let checked = JSON.parse(localStorage.getItem(element.id));
                        document.getElementById(element.id).checked = checked;
                  })
            } 
            } 

      }
} 

loadTasks();

function addTask() {
      let getTaskList = document.getElementsByClassName('getCheckbox');
      let taskValue = document.getElementById('taskInput').value;
      if (taskValue !== '') {
            let taskHolder = document.createElement('div');
            taskHolder.setAttribute("id", "taskDiv");
            taskHolder.setAttribute('class', 'taskHolder');
            taskContainer.appendChild(taskHolder);
            let addLabel = document.createElement('label');
            let addCheckbox = document.createElement('input');
            addCheckbox.setAttribute('class', 'getCheckbox');
            let setCheckbox = 'setCheckbox-' + (getTaskList.length);
            addCheckbox.setAttribute('id', setCheckbox);
            let addSpan = document.createElement('span');
            let addDeleteButton = document.createElement('button');
            addDeleteButton.setAttribute("id", "deleteButton");
            addDeleteButton.setAttribute('class', 'deleteButton');
            addDeleteButton.innerHTML = 'remove';
            addSpan.innerHTML = ' ' + taskValue;
            addCheckbox.type = 'checkbox';
            addLabel.appendChild(addCheckbox);
            addLabel.appendChild(addSpan);
            taskHolder.appendChild(addLabel);
            taskHolder.appendChild(addDeleteButton);
            document.getElementById('taskInput').value = '';
            taskList.push(taskValue);
            localStorage.setItem('tasks', JSON.stringify(taskList));
            console.log(taskList.length);
            console.log(taskList);
            let totalTasks = document.getElementsByClassName('deleteButton');
            for (let i=0; i < totalTasks.length; i++) {
                  totalTasks[i].onclick = function() {
                        let index = i;
                        let parentDiv = this.parentNode;
                        parentDiv.style.display = 'none';
                        let retrieveData = JSON.parse(localStorage.getItem('tasks'));
                        retrieveData.splice(index, 1);
                        localStorage.setItem('tasks', JSON.stringify(retrieveData));
                        taskList = retrieveData;
                  }
            }
            let checkboxList = document.querySelectorAll(`input[type*='checkbox']`);
            for (let i=0; i < checkboxList.length; i++) {
                  checkboxList[i].onclick = function() {
                        checkboxList.forEach(element => {
                              localStorage.setItem(element.id , element.checked);
                        });
                  }
                  checkboxList.forEach(element => {
                        let checked = JSON.parse(localStorage.getItem(element.id));
                        document.getElementById(element.id).checked = checked;
                  })
            }
      } else if (taskValue === '') {
            alert('Please enter task you want to add');
      }
}