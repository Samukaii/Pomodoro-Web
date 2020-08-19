import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-button-play",
    templateUrl: "./button-play.component.html",
    styleUrls: ["./button-play.component.css"]
})
export class ButtonPlayComponent implements OnInit {
    @Output("is-timing") isTimingEmitter = new EventEmitter();
    isTiming: boolean = false;
    buttonIcon: HTMLElement;

    constructor() {}

    ngOnInit(): void {
        this.buttonIcon = document.getElementById("button-icon");
    }

    switchPlayPause = (play?: boolean) => {
        console.log("Tentando pausar ou dar play");
        if (play !== undefined) {
            console.log("Play é diferente de undefined");
            this.isTiming = play;
            this.isTimingEmitter.emit(this.isTiming);
            this.changeIcon();
            return;
        }
        this.isTiming = !this.isTiming;
        this.isTimingEmitter.emit(this.isTiming);
        console.log("O valor de isTiming em button-play é:", this.isTiming);
        this.changeIcon();
    };

    changeIcon = () => {
        console.log("Tentando mudar o ícone");
        if (this.isTiming) {
            this.buttonIcon.innerHTML = "pause";
            return;
        }

        this.buttonIcon.innerHTML = "play_arrow";
    };
}
