import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PomodoroEventType, PomodoroTimes, PomodoroTypes } from "types";
import { TabsComponent } from "../tabs/tabs.component";

@Component({
    selector: "app-clock",
    templateUrl: "./clock.component.html",
    styleUrls: ["./clock.component.css"],
})
export class ClockComponent implements OnInit {
    @Input("actual-timer") actualTimer: number = 25;
    @Output("set-timer") setTimer = new EventEmitter<PomodoroEventType>();
    @Input("tabs") tabs: TabsComponent;
    timerActive: PomodoroTimes = 25;
    typeActiveID: PomodoroTypes = "pomodoro";
    seconds = 0;
    minutes: number = 25;
    formatedTime: string = "25:00";
    interval: any;
    pointer: HTMLElement;
    numberCompletePomodoros: number = 0;

    constructor() {}
    ngOnInit(): void {
        this.pointer = document.getElementById("pointer");
        this.restartTimerTo(this.actualTimer);
        this.adaptAnimationSpeed();
    }
    setActualTimer = ({ typeActive, timeActive }) => {
        this.restartTimerTo(timeActive);
        console.log(typeActive, timeActive);

        this.typeActiveID = typeActive;
        this.timerActive = timeActive;
    };

    playOrPause = (isTiming: boolean) => {
        console.log("O valor de isTiming em app-clock é:", isTiming);
        this.playPauseAnimation(isTiming);

        if (isTiming) {
            clearInterval(this.interval);
            this.interval = setInterval(this.countTime, 1000);
        } else clearInterval(this.interval);
    };

    playPauseAnimation = (play: boolean) => {
        if (play) this.pointer.style.animationPlayState = "running";
        else this.pointer.style.animationPlayState = "paused";
    };

    adaptAnimationSpeed = () => {
        this.pointer.style.animationDuration =
            this.minutes * 60 + this.seconds + "s";
    };

    countTime = () => {
        if (this.minutes <= 0 && this.seconds <= 0) {
            this.goToNextTimer();

            return;
        }
        this.seconds--;
        this.formatTime();
    };

    goToNextTimer = () => {
        if (this.typeActiveID === "pomodoro") {
            this.numberCompletePomodoros++;
            if (this.numberCompletePomodoros >= 4) {
                this.setTimer.emit({ target: { id: "long-break" } });
                this.numberCompletePomodoros = 0;
            } else {
                this.setTimer.emit({ target: { id: "short-break" } });
            }
        } else {
            this.setTimer.emit({ target: { id: "pomodoro" } });
        }
        this.playOrPause(true);
        console.log(this.numberCompletePomodoros);
    };

    formatTime = () => {
        if (this.seconds < 0) {
            this.seconds = 59;
            this.minutes--;
        }

        this.formatedTime = this.fixDecimalPlacesAndBuildClock(
            this.minutes,
            this.seconds
        );
    };

    fixDecimalPlacesAndBuildClock = (
        minutes: string | number,
        seconds: string | number
    ) => {
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        return `${minutes}:${seconds}`;
    };

    restartTimerTo = (timer: number) => {
        this.minutes = timer;
        this.seconds = 0;
        this.playOrPause(false);
        this.formatTime();
    };
}
