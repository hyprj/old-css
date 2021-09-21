class Task {

    constructor(name, pomodoroAmount) {
        this.name = this.generateName(name);
        this.pomodoroAmount = pomodoroAmount;
        this.donePomodoros = 0;
        this.id = locStorage.getAvaibleId();
        Task.taskNumber++;
    }

    generateName(name) {
        if (name) return name;
        return "new Task";    
    }

    increaseDonePomodoros() {
        this.donePomodoros += 1;
        this.refreshTaskBar();
    }

    refreshTaskBar() {
        this.taskDiv.innerHTML = `
        <h2 class="task__title">${this.name}</h2>
        <div class="task__right">
        <span class="task__amount">${this.donePomodoros}/${this.pomodoroAmount}</span>
        <i class="fa fa-trash-o task__delete" aria-hidden="true"></i>
        </div>`;
    }
}