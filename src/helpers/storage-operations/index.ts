import { Task } from "types";

export class LocalStorageOperations {
    getTasks: Task | any = () => JSON.parse(localStorage.getItem("tasks"));
    saveTasks = (tasks: Array<Task>) =>
        localStorage.setItem("tasks", JSON.stringify(tasks));
    getFirstTask: Task | null | any = () => {
        const tasks = this.getTasks();
        if (!tasks) return;
        if (tasks[0]) return tasks[0];
        return;
    };
    deleteATask = (index: number) => {
        const tasks: Array<Task> = this.getTasks();
        tasks.splice(index, 1);
        this.saveTasks(tasks);
    };
}
