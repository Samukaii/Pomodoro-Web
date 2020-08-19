import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    actualTimer: number = 25;
    isTiming: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    receiveActualTimer = (timer: number, clock: any) => {
        this.actualTimer = timer;
        clock.restartTimerTo(this.actualTimer);
    };

    receiveIsTiming = (isTiming: boolean) => {
        this.isTiming = isTiming;
        console.log("o valor de isTiming em app-home é:", isTiming);
    };
}
