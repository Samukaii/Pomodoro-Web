import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"]
})
export class TaskListComponent implements OnInit {
    activeTask: HTMLLIElement;

    constructor() { }

    ngOnInit(): void { }

    delete = (event: any) => {
        const target: HTMLElement = event.target;
        let task: HTMLElement;

        if (target.nodeName === "BUTTON") {
            task = target.parentElement;
        } else {
            task = target.parentElement.parentElement;
        }

        task.remove();
    };

    add = () => { };

    check = (event: any, taskname: HTMLInputElement) => {
        const target: HTMLElement = event.target;
        let checkIcon: any;


        if (target.nodeName === "BUTTON") {
            checkIcon = target.firstElementChild;
        } else {
            checkIcon = target;
        }

        let isChecked = checkIcon.getAttribute("checked");

        if (isChecked === "true") {
            checkIcon.innerText = "check_box_outline_blank";
            taskname.style.textDecoration = "none";
            checkIcon.setAttribute("checked", "false");
        } else if (isChecked === "false") {
            checkIcon.innerText = "check_box";
            checkIcon.setAttribute("checked", "true");
            taskname.style.textDecoration = "line-through";
            console.log(taskname)
        }
    };

    edit = (event: any) => {
        const target: HTMLElement = event.target;
        let task: HTMLElement;

        if (target.nodeName === "BUTTON") {
            task = target.parentElement;
        } else {
            task = target.parentElement.parentElement;
        }

        let content = task.getElementsByClassName("select-task");
        let input = content[0].querySelector("input");
        input.readOnly = !input.readOnly;
    };

    select = (event: any) => {
        this.activeTask && this.activeTask.classList.remove("active");
        this.activeTask = event.target.parentElement;
        this.activeTask.classList.add("active");
    };
}
