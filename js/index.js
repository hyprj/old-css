
// buttons and windows
const settingBtn = document.querySelector('.settings__btn');
const settingsExit = document.querySelector('.settings__exit');
const settings = document.querySelector('.settings__main');
const addTaskBtn = document.querySelector('.tasks__button');
const addTask = document.querySelector('.tasks__add-task-form');
const profileBtn = document.querySelector('.settings__profile-btn');
const profile = document.querySelector('.settings__profile');
const addTaskCancelBtn = document.querySelector('.tasks__cancel');
const estPomodorosInput = addTask.querySelector('.tasks__number-input');
const stepUpBtn = addTask.querySelector('.tasks__step-up');
const stepDownBtn = addTask.querySelector('.tasks__step-down');
const addTaskFinalBtn = document.querySelector('.add-btn');

let activeTask;

const clock = new Clock();
const tasksList = [];

const locStorage = new StoredSettings();

settingBtn.addEventListener('click', () => settings.classList.remove('button--invisible'));
settingsExit.addEventListener('click', () => settings.classList.add('button--invisible'));
profileBtn.addEventListener('click', () => profile.classList.toggle('button--invisible'));

addTaskBtn.addEventListener('click', () => {
    addTask.classList.remove('button--invisible')
    addTaskBtn.classList.add('button--invisible');
});

addTaskCancelBtn.addEventListener('click', () => {
    addTask.classList.add('button--invisible')
    addTaskBtn.classList.remove('button--invisible');
});

stepUpBtn.addEventListener('click', () => estPomodorosInput.stepUp());
stepDownBtn.addEventListener('click', () => estPomodorosInput.stepDown());

addTaskFinalBtn.addEventListener('click', () => {
    let taskName = document.querySelector('.tasks__input').value;
    const pomodorosAmount = estPomodorosInput.value;
    
    addTask.classList.add('button--invisible');
    addTaskBtn.classList.remove('button--invisible');

    const newTask = new Task(taskName, pomodorosAmount);
    taskName = newTask.name;

    const tasks = document.querySelector('.tasks__tasks');
    const newTaskHTML = document.createElement('div');  

    newTaskHTML.innerHTML = `
    <h2 class="task__title">${taskName}</h2>
    <div class="task__right">
    <span class="task__amount">0/${pomodorosAmount}</span>
    <i class="fa fa-trash-o task__delete" aria-hidden="true"></i>
    </div>`;

    newTaskHTML.classList.add('task');
    newTaskHTML.id = newTask.id;
    newTaskHTML.addEventListener('click', onTaskClick);
    console.log(newTaskHTML);
    newTask.taskDiv = newTaskHTML;
    tasks.appendChild(newTaskHTML);
    tasksList.push(newTask);
    locStorage.addTask(newTask);
});

function onTaskClick (event) {

    const task = event.target;
    const isDeleteButton = task.matches('.task__delete');
    if (isDeleteButton) {
        deleteTask(task.parentElement.parentElement);
        return;
    }
    if (task.classList.contains('task--active')) {
        deactivateTask(task);
    } else {
        activateTask(task);
    }
};

function addTaskToPage (newTask, taskName, pomodorosAmount) {
    const tasks = document.querySelector('.tasks__tasks');
    const newTaskHTML = document.createElement('div');  

    newTaskHTML.innerHTML = `
    <h2 class="task__title">${taskName}</h2>
    <div class="task__right">
    <span class="task__amount">0/${pomodorosAmount}</span>
    <i class="fa fa-trash-o task__delete" aria-hidden="true"></i>
    </div>`;

    newTaskHTML.classList.add('task');
    newTaskHTML.id = newTask.id;
    newTaskHTML.addEventListener('click', onTaskClick);
    newTask.taskDiv = newTaskHTML;
    tasks.appendChild(newTaskHTML);
    tasksList.push(newTask);
};

const activateTask = task => {

    if (activeTask) activeTask.taskDiv.classList.remove('task--active');

    task.classList.add('task--active');
    tasksList.forEach ( (taskFromList, index) => {
        if (taskFromList.id == task.id) {
            activeTask = tasksList[index];
        }
    });

    toggleWorkingOnInfo();
};

const deactivateTask = task => {
    activeTask = null;
    task.classList.remove('task--active');

    toggleWorkingOnInfo();
};

const deleteTask = task => {
    const taskId = Number(task.id);

    if (task.matches('.task--active')) deactivateTask(task);
    locStorage.settings.tasks.forEach ( (StorageTask, index) => {
        if (StorageTask.id === taskId) {
            locStorage.settings.tasks.splice(index, 1);
            locStorage.updateLocalStorage();
        }
    });
    task.remove();
};

const toggleWorkingOnInfo = () => {

    const workingOnTitle = document.querySelector('.tasks__task-title');
    // zmien w htmlu i cssie tasks___header na tasks__name
    const taskName = document.querySelector('.tasks__header');
    if (activeTask) {
        workingOnTitle.textContent = activeTask.name;
        taskName.textContent = 'WORKING ON';
    } else {
        workingOnTitle.textContent = '';
        taskName.textContent = '';
    }
}

const addTaskTesting = () => {
    // this was used for testing
    const taskName = "Test name"
    const pomodorosAmount = 5;

    const newTask = new Task(taskName, pomodorosAmount);

    const tasks = document.querySelector('.tasks__tasks');
    const newTaskHTML = document.createElement('div');

    newTaskHTML.innerHTML = `
    <h2 class="task__title">${taskName}</h2>
    <div class="task__right">
    <span class="task__amount">0/${pomodorosAmount}</span>
    <i class="fa fa-trash-o task__delete" aria-hidden="true"></i>
    </div>`;

    newTaskHTML.classList.add('task');
    newTaskHTML.id = newTask.id;
    newTaskHTML.addEventListener('click', onTaskClick);
    newTask.taskDiv = newTaskHTML;
    tasks.appendChild(newTaskHTML);
    tasksList.push(newTask);
}

const boxShadowStarGenerator = n => {
    // this function was used to generate .stars box-shadow property
    let value = `${Math.floor(Math.random()*2000)}px ${Math.floor(Math.random()*2000)}px #fff,`;

    for (let i = 0; i < n; i++) {
        let positiveOrNegative;
        Math.floor(Math.random()*2) === 1 ? positiveOrNegative = 1 : positiveOrNegative = -1;
        value = `${value} ${Math.floor(Math.random()*2000) * positiveOrNegative}px ${Math.floor(Math.random()*1500)}px #fff,`
    }
    console.log(value);
  }
  
//   boxShadowStarGenerator(300);