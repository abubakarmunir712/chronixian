import { TaskCard } from "./TaskCard";
import type { Task } from "@/types/types";

interface TaskListProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  return (
    <div className="flex flex-col gap-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
      ))}
    </div>
  );
};
