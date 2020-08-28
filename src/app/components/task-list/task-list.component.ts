import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LocalStorageOperations } from "helpers/storage-operations";
import { Task } from "types";

@Component({
    selector: "app-task-list",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {
    pomodorosToFinish: number = 0;
    taskList = new TaskList();
    disableAllSelectTasks = new Event("desselectAllTasks");
    storageOperations = new LocalStorageOperations();

    constructor() {}

    ngOnInit(): void {
        this.updateTasksOfLocalStorage();
    }

    isChecked = this.taskList.isChecked;
    updateTasksOfLocalStorage = () => {
        this.taskList.update(this.storageOperations.getTasks());
        this.taskList.selectFirstTask();
    };

    delete = (event: any, index: number) => {
        this.taskList.delete(index);
        this.storageOperations.deleteATask(index);
    };
    add = (
        nameTaskRef: HTMLInputElement,
        numberPomodorosRef: HTMLParagraphElement
    ) => {
        const newTask: Task = {
            nameTask: nameTaskRef.value,
            numberPomodoros: parseInt(numberPomodorosRef.innerHTML),
            active: this.taskList.getSelected() ? false : true,
            checked: true,
        };

        this.taskList.add(newTask);
        this.storageOperations.saveTasks(this.taskList.getAll());
    };

    addOrSubtractPomodoro = (event: any, amount: number) => {
        event.preventDefault();
        if (this.pomodorosToFinish <= 0) amount < 0 ? (amount = 0) : 1;

        this.pomodorosToFinish += amount;
    };

    check = this.taskList.checkOne;

    edit = (taskInput: HTMLInputElement, taskIndex: number) => {
        //if (!taskInput.readOnly) {
        //    this.tasks[taskIndex].nameTask = taskInput.value;
        //}
        //taskInput.readOnly = !taskInput.readOnly;
    };

    select = this.taskList.select;
}

class TaskList {
    active: Task;
    list: Array<Task>;

    getOne = (index: number) => this.list[index];
    getSelected = () => this.active;
    getAll = () => this.list;

    checkOne = (index: number) => (this.list[index].checked = true);
    isChecked = (index: number) => this.list[index].checked;

    update = (tasks: Array<Task>) => {
        this.list = tasks;
    };

    add = (task: Task) => {
        if (!this.validate(task)) return false;
        this.list.push(task);
        const index = this.list.indexOf(task);

        if (this.getSelected()) return;

        this.select(index);
    };

    validate = (task: Task) => {
        return task.nameTask.length >= 0;
    };

    edit = () => {};
    delete = (index: number) => {
        this.list.splice(index, 1);
        delete this.active;
    };

    select = (index: number) => {
        this.desselectAll();

        this.list[index].active = true;
        this.active = this.list[index];
    };

    selectFirstTask = () => {
        this.select(0);
    };

    desselectAll = () => {
        this.list.map((task) => {
            task.active = false;
        });
    };
}
