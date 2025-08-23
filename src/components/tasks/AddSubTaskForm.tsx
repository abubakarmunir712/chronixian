import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Task } from "@/types/types";

interface AddSubtaskFormProps {
    task: Task;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

export const AddSubtaskForm: React.FC<AddSubtaskFormProps> = ({ task, tasks, setTasks }) => {
    const [title, setTitle] = useState("");

    const handleAdd = () => {
        if (!title) return;
        const updatedTasks = tasks.map(t =>
            t.id === task.id ? { ...t, subtasks: [...t.subtasks, { id: Date.now(), title }] } : t
        );
        setTasks(updatedTasks);
        setTitle("");
    };

    return (
        <div className="flex gap-2 mt-2">
            <Input
                placeholder="Add subtask..."
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <Button size="sm" onClick={handleAdd}>Add</Button>
        </div>
    );
};
