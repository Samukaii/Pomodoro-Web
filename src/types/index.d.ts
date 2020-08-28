export type PomodoroTypes = "pomodoro" | "short-break" | "long-break";
export type PomodoroTimes = 25 | 5 | 15;
export type PomodoroEventType = {
    target: {
        id: PomodoroTypes;
    };
};
export interface Task {
    nameTask: string;
    numberPomodoros: number;
    active: boolean;
    checked: boolean;
}
