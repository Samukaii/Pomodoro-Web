import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-clock",
    templateUrl: "./clock.component.html",
    styleUrls: ["./clock.component.css"]
})
export class ClockComponent implements OnInit {
    seconds = 0;
    minutes = 25;
    formatedTime: string = "25:00";
    isPlaying: boolean = true;
    interval: any;
    pointer: HTMLElement;

    constructor() {}
    ngOnInit(): void {
        this.pointer = document.getElementById("pointer");
        if (this.isPlaying) this.interval = setInterval(this.countTime, 1000);
        this.adaptAnimationSpeed();
    }

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

    fixDecimalPlacesAndBuildClock = (minutes, seconds) => {
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        return `${minutes}:${seconds}`;
    };
}
