export interface Subtask {
    id: number;
    title: string;
  }
  
  export interface Task {
    id: number;
    title: string;
    subtasks: Subtask[];
  }
  