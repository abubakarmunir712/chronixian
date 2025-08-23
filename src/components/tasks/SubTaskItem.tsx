import { Button } from "@/components/ui/button";
import type { Task, Subtask } from "@/types/types";

interface SubtaskItemProps {
    subtask: Subtask;
    task: Task;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

export const SubtaskItem: React.FC<SubtaskItemProps> = ({ subtask, task, tasks, setTasks }) => {
    const handleDelete = () => {
        const updatedTasks = tasks.map(t =>
            t.id === task.id
                ? { ...t, subtasks: t.subtasks.filter(s => s.id !== subtask.id) }
                : t
        );
        setTasks(updatedTasks);
    };

    return (
        <div className="flex justify-between items-center bg-background/20 p-2 rounded-md">
            <span>{subtask.title}</span>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
                Delete
            </Button>
        </div>
    );
};
