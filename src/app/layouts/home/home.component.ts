import { Component, OnInit } from "@angular/core";
import { PomodoroEventType, PomodoroTimes, PomodoroTypes } from "types";
import { TabsComponent } from "../../components/tabs/tabs.component";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
    actualTimer: number = 25;
    isTiming: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    receiveActualTimer = (eventTimer, clock: any) => {
        this.actualTimer = eventTimer.timeActive;
        clock.setActualTimer(eventTimer);
    };

    switchTab = (timer: PomodoroEventType, tabs: TabsComponent) => {
        tabs.switchTab(timer);
    };

    receiveIsTiming = (isTiming: boolean) => {
        this.isTiming = isTiming;
        console.log("o valor de isTiming em app-home é:", isTiming);
    };
}
