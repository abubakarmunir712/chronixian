import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Task } from "@/types/types";

interface AddTaskFormProps {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ tasks, setTasks }) => {
    const [title, setTitle] = useState("");

    const handleAdd = () => {
        if (!title) return;
        setTasks([...tasks, { id: Date.now(), title, subtasks: [] }]);
        setTitle("");
    };

    return (
        <div className="flex gap-2 mb-6">
            <Input
                placeholder="Add new task..."
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <Button onClick={handleAdd}>Add Task</Button>
        </div>
    );
};
