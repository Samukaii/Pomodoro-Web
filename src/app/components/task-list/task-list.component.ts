import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {
    activeTask: HTMLLIElement;
    pomodorosToFinish: number = 0;
    tasks: Array<{ nameTask: string; numberPomodoros: number }> = [];
    disableAllSelectTasks = new Event("desselectAllTasks");

    constructor() {}

    ngOnInit(): void {
        if (localStorage.getItem("tasks")) {
            this.tasks = JSON.parse(localStorage.getItem("tasks"));
        }
    }

    delete = (event: any, index: number) => {
        event.preventDefault();
        this.tasks.splice(index, 1);
    };

    add = (
        nameTaskRef: HTMLInputElement,
        numberPomodorosRef: HTMLParagraphElement
    ) => {
        const newTask = {
            nameTask: "",
            numberPomodoros: 0,
        };
        newTask.nameTask = nameTaskRef.value;
        newTask.numberPomodoros = parseInt(numberPomodorosRef.innerHTML);

        if (newTask.nameTask.length < 1) return;
        this.tasks.push(newTask);

        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    };

    addOrSubtractPomodoro = (event: any, amount: number) => {
        event.preventDefault();
        if (this.pomodorosToFinish <= 0) amount < 0 ? (amount = 0) : 1;

        this.pomodorosToFinish += amount;
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

    desSelectAll = () => {
        document.dispatchEvent(this.disableAllSelectTasks);
    };

    desSelectTask = (task: HTMLLIElement) => {
        if (!task.classList.contains("active")) return;
        task.classList.remove("active");
    };
}
