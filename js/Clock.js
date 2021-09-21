class Clock {
    constructor () {
        this.isRunning = false;
        this.fullTime = 4;
        this.timeLeft = this.fullTime;
        this.runButton = document.querySelector('.button--large');
        this.clock = document.querySelector('.clock__time');
        this.counting = null;
        this.repeatButton = document.querySelector('.button--repeat');
        this.stepForwardButton = document.querySelector('.button--step-forward');
        this.bellSound = new Audio('./bell.mp3');
        this.switchButtons = document.querySelectorAll('.clock__btn');

        this.runButton.addEventListener('click', this.runButtonHandler);
        this.repeatButton.addEventListener('click', this.resetClock);
        this.stepForwardButton.addEventListener('click', this.stepForward);
        this.switchButtons.forEach( button => button.addEventListener('click', this.isSelected));
    }

    updateClockTime = () => {
        const minutes = Math.floor(this.timeLeft / 60) < 10 ? ('0' + Math.floor(this.timeLeft / 60)) : Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60 < 10 ? ('0' + this.timeLeft % 60) : this.timeLeft % 60;
        this.clock.textContent = `${minutes}:${seconds}`;
    }

    playSound = (audio) => {
        if (localStorage.settings.volume === 0) return;
        // console.log(locStorage.settings);
        audio.volume = locStorage.settings.volume;
        audio.play();
    }

    countDown = () => {
        this.counting = setInterval( () => {
            if (this.timeLeft < 1){
                clearInterval(this.counting);
                this.isRunning = false;
                this.playSound(this.bellSound);
                this.resetClock();
                    if (activeTask) {
                    activeTask.donePomodoros += 1;
                    activeTask.refreshTaskBar();
                }
                return;
            }
            this.timeLeft -= 1;
            this.updateClockTime();
        }, 1000);
        this.isRunning = true;
    }

    stopCountingDown = () => {
        clearInterval(this.counting);
        this.isRunning = false;
    };

    resetClock = () => {
        this.stopCountingDown();
        this.timeLeft = this.fullTime;
        this.updateClockTime(this.timeLeft);
        this.runButtonToggler("run");
    }

    runButtonHandler = () => {
        if (!this.isRunning) {
            this.countDown();
            this.runButtonToggler("stop");
        }
        else {
            this.stopCountingDown();
            this.runButtonToggler("run");
        }
    };

    runButtonToggler = (state) => {
        if (state === "run") {
            this.runButton.textContent = 'START';
            this.runButton.style.top = '0';
            this.runButton.style.boxShadow = 'rgb(235, 235, 235) 0px 6px 0px';
        } else {
            this.runButton.textContent = 'STOP';
            this.runButton.style.boxShadow = 'none';
            this.runButton.style.top = '6px';
        }
        this.repeatButton.classList.toggle('button--invisible');
        this.stepForwardButton.classList.toggle('button--invisible');
    }

    stepForward = () => {
        const answer = confirm('Are you sure to step forward the pomodoro?');
        if (!answer) return;

        this.resetClock();
        if (activeTask) activeTask.increaseDonePomodoros();
    }

    unselectButtons = () => {
        this.switchButtons.forEach( button => {
            if (button.classList.contains('button--selected')) {
                button.classList.remove('button--selected');
                button.classList.add('button--colorless');
                return;
            }
        });
    }

    isSelected = button => {
        console.log('xdd')
        if (!button.target.classList.contains('button--selected')) {
            this.unselectButtons();
            button.target.classList.add('button--selected');
        }
    }
}