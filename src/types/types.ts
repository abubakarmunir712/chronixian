export type Task = {
    id: string;
    title: string;
    deadline: string; // ISO date string
    subtasks: Subtask[];
};

export type Subtask = {
    id: string;
    title: string;
    deadline: string; // ISO date string
    completed: boolean;
};
