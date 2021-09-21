class StoredSettings {
    constructor () {

        this.settings = JSON.parse(window.localStorage.getItem('settings')) || this.getDefaultSettings();
        console.log(this.settings   )
        this.generateHTML();
    }
    getDefaultSettings() {
        const defaultSettings = {
            pomodoroFullTime: 1500,
            volume: 1,
            breakTime: 300,
            longBreakTime: 900,
            darkmode: false,
            avaibleId: 0,
            tasks: [],
        };
        return defaultSettings;
    }

    updateProperty (prop, value) {
        this.settings[prop] = value;
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        window.localStorage.setItem('settings', JSON.stringify(this.settings));
    }

    addTask (task) {
        this.settings.tasks.push(task);
        this.updateLocalStorage();
    }

    generateHTML() {
        if (!this.settings.tasks) return;
        this.settings.tasks.forEach( task => {
            addTaskToPage(task, task.name, task.pomodoroAmount)
        });
    }

    getAvaibleId() {
        const id = this.settings.avaibleId;
        const incrementedId = id + 1;
        this.updateProperty("avaibleId", incrementedId);
        return id;
    }
}