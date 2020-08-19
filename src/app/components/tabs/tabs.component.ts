import { Component, OnInit, Output, EventEmitter } from "@angular/core";

type PomodoroTypes = "pomodoro" | "short-break" | "long-break";
type PomodoroTimes = 25 | 5 | 15;
type PomodoroEventType = {
    target: {
        id: PomodoroTypes;
    };
};

@Component({
    selector: "app-tabs",
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.css"]
})
export class TabsComponent implements OnInit {
    timeActive: PomodoroTimes = 25;
    typeActiveID: PomodoroTypes = "pomodoro";
    allTabs: NodeListOf<HTMLButtonElement>;
    @Output() setTime = new EventEmitter();

    constructor() {}

    ngOnInit(): void {
        this.allTabs = document
            .getElementById("tabs")
            .querySelectorAll("button");
    }

    activateTab = () => {
        this.allTabs.forEach(tab => {
            if (tab.id === this.typeActiveID) tab.classList.add("active");
            else if (tab.classList.contains("active"))
                tab.classList.remove("active");
        });
        document.getElementById(this.typeActiveID).classList.add("active");
    };

    switchTab = (event: PomodoroEventType) => {
        switch (event.target.id) {
            case "pomodoro":
                this.timeActive = 25;
                this.typeActiveID = "pomodoro";
                break;
            case "short-break":
                this.timeActive = 5;
                this.typeActiveID = "short-break";
                break;
            case "long-break":
                this.timeActive = 15;
                this.typeActiveID = "long-break";
                break;
        }
        this.setTime.emit(this.timeActive);
        console.log("Enviando Tempo Atual...", this.timeActive);
        this.activateTab();
    };
}
