import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-clock",
    templateUrl: "./clock.component.html",
    styleUrls: ["./clock.component.css"]
})
export class ClockComponent implements OnInit {
    @Input("actual-timer") actualTimer: number = 25;
    seconds = 0;
    minutes: number = 25;
    formatedTime: string = "25:00";
    interval: any;
    pointer: HTMLElement;

    constructor() {}
    ngOnInit(): void {
        this.pointer = document.getElementById("pointer");
        this.restartTimerTo(this.actualTimer);
        this.adaptAnimationSpeed();
    }

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
        this.seconds--;
        this.formatTime();
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
        this.formatTime();
    };
}
