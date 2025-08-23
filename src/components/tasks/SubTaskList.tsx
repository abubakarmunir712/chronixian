import { SubtaskItem } from "./SubTaskItem";
import type { Task } from "@/types/types";

interface SubtaskListProps {
    task: Task;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

export const SubtaskList: React.FC<SubtaskListProps> = ({ task, tasks, setTasks }) => {
    return (
        <div className="flex flex-col gap-1 mt-2">
            {task.subtasks.map(subtask => (
                <SubtaskItem key={subtask.id} subtask={subtask} task={task} tasks={tasks} setTasks={setTasks} />
            ))}
        </div>
    );
};
