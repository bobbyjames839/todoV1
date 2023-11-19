
  const create = document.getElementById('create');
  const taskList = document.getElementById('taskList');
  const input = document.getElementById('newTask').value;

  function createItem() {
    const create = document.getElementById('create');
    const taskList = document.getElementById('taskList');
    const input = document.getElementById('newTask').value;

    const taskItemOuter = document.createElement('section');
    taskItemOuter.classList.add("task-list-item");

    const taskItem = document.createElement('input');
    taskItem.classList.add("task-item");
    taskItem.value = input;
    taskItem.readOnly = true;

    taskItemOuter.appendChild(taskItem);
    const actions = document.createElement('div');
    actions.classList.add("actions");

    const editButton = document.createElement('button');
    editButton.classList.add("edit");
    editButton.innerHTML = "Edit";

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = "Delete";

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    taskItemOuter.appendChild(actions);

    taskList.appendChild(taskItemOuter);
  
    editButton.addEventListener('click', function() {
      if (taskItem.readOnly === true) {
        taskItem.readOnly = false;
        taskItem.style.background = '#1a128a';
        editButton.innerText = "Save";
      } else if (taskItem.readOnly === false) {
        taskItem.readOnly = true;
        taskItem.style.background = '#6623da';
        editButton.innerText = "Edit";
        saveTasks();
      }
    });

    deleteButton.addEventListener('click', function() {
      taskList.removeChild(taskItemOuter);
        saveTasks();
    })

    document.getElementById('newTask').value = '';

    saveTasks();
  }


  newTask.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      createItem();
    }
  });


  create.addEventListener('click', () => {
      createItem();
  });
  





  loadTasks();

  function saveTasks() {
    const tasks = [];
    const taskItems = taskList.getElementsByClassName('task-item');
    for (let i = 0; i < taskItems.length; i++) {
      tasks.push(taskItems[i].value);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(taskText) {

      const taskItemOuter = document.createElement('section');
      taskItemOuter.classList.add("task-list-item");

      const taskItem = document.createElement('input');
      taskItem.classList.add("task-item");
      taskItem.value = taskText;
      taskItem.readOnly = true;

      taskItemOuter.appendChild(taskItem);

      const actions = document.createElement('div');
      actions.classList.add("actions");

      const editButton = document.createElement('button');
      editButton.classList.add("edit");
      editButton.innerHTML = "Edit";

      const deleteButton = document.createElement('button');
      deleteButton.classList.add("delete");
      deleteButton.innerHTML = "Delete";

      actions.appendChild(editButton);
      actions.appendChild(deleteButton);
      taskItemOuter.appendChild(actions);

      taskList.appendChild(taskItemOuter);

      editButton.addEventListener('click', function() {
        if (taskItem.readOnly === true) {
          taskItem.readOnly = false;
          taskItem.style.background = '#1a128a';
          editButton.innerText = "Save";
        } else if (taskItem.readOnly === false) {
          taskItem.readOnly = true;
          taskItem.style.background = '#6623da';
          editButton.innerText = "Edit";
          saveTasks();
        }
      });

      deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItemOuter);
        saveTasks();
      });
    });
  }