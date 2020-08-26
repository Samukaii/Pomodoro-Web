import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-task-item",
    templateUrl: "./task-item.component.html",
    styleUrls: ["./task-item.component.css"],
})
export class TaskItemComponent implements OnInit {
    @Input("task-ref") taskRef: HTMLElement;
    @Input("task-object") taskObject: {
        nameTask: string;
        numberPomodoros: number;
    };
    @Input("task-index") taskIndex: number;

    @Output("delete") deleteEvent = new EventEmitter<number>();
    @Output("select") selectEvent = new EventEmitter<number>();
    @Output("edit") editEvent = new EventEmitter<{
        taskIndex: number;
        taskValue: string;
    }>();
    constructor() {}

    ngOnInit(): void {}

    delete = (event: any, index: number) => {
        event.preventDefault();
        this.deleteEvent.emit(index);
    };

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
        }
    };

    edit = (taskInput: HTMLInputElement, taskIndex: number) => {
        if (!taskInput.readOnly) {
            this.editEvent.emit({
                taskIndex: taskIndex,
                taskValue: taskInput.value,
            });
            this.tasks[taskIndex].nameTask = taskInput.value;
        }
        taskInput.readOnly = !taskInput.readOnly;
    };

    select = (task: HTMLLIElement) => {
        if (task.classList.contains("active")) return;
        this.activeTask = task;
        this.desSelectAll();
        task.classList.add("active");
        console.log(task);
    };

    observeDesselectEvent = (element: HTMLLIElement) => {};

    desSelectAll = () => {};

    desSelectTask = (task: HTMLLIElement) => {
        if (!task.classList.contains("active")) return;
        task.classList.remove("active");
    };
}
