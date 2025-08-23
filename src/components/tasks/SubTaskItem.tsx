import { useState } from "react";
import type { Task, Subtask } from "@/types/types";
import { Trash2, Calendar, Pencil, Check } from "lucide-react";
import { DatePicker } from "./DatePicker";

interface SubtaskItemProps {
    subtask: Subtask;
    task: Task;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

export const SubtaskItem: React.FC<SubtaskItemProps> = ({
    subtask,
    task,
    tasks,
    setTasks,
}) => {
    const [deadline, setDeadline] = useState<Date>(
        subtask.deadline ? new Date(subtask.deadline) : new Date()
    );
    const [title, setTitle] = useState(subtask.title);
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        const updatedTasks = tasks.map((t) =>
            t.id === task.id
                ? { ...t, subtasks: t.subtasks.filter((s) => s.id !== subtask.id) }
                : t
        );
        setTasks(updatedTasks);
    };

    const handleDeadlineChange = (date: Date | undefined) => {
        if (!date) return;
        setDeadline(date);

        const updatedTasks = tasks.map((t) =>
            t.id === task.id
                ? {
                    ...t,
                    subtasks: t.subtasks.map((s) =>
                        s.id === subtask.id ? { ...s, deadline: date.toISOString() } : s
                    ),
                }
                : t
        );
        setTasks(updatedTasks);
    };

    const handleSave = () => {
        const updatedTasks = tasks.map((t) =>
            t.id === task.id
                ? {
                    ...t,
                    subtasks: t.subtasks.map((s) =>
                        s.id === subtask.id
                            ? { ...s, title: title, deadline: deadline.toISOString() }
                            : s
                    ),
                }
                : t
        );
        setTasks(updatedTasks);
        setIsEditing(false);
    };

    // deadline color logic
    const today = new Date();
    let deadlineColor = "text-green-400";
    if (deadline < today) deadlineColor = "text-red-500";
    else if ((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 2)
        deadlineColor = "text-yellow-400";

    return (
        <div className="flex justify-between items-start bg-muted/50 p-4 mb-2 rounded-md gap-3">
            <div className="flex flex-col gap-1 flex-1">
                {/* Title */}
                {!isEditing ? (
                    <span className="font-medium">{subtask.title}</span>
                ) : (
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="font-medium px-2 py-1 rounded-md border border-border bg-background/50"
                    />
                )}

                {/* Deadline */}
                <div className="flex items-center gap-2 text-sm">
                    {!isEditing ? (<>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className={deadlineColor}>{deadline.toLocaleDateString()}</span>
                    </>
                    ) : (
                        <DatePicker date={deadline} setDate={handleDeadlineChange} />
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Toggle edit mode */}
                <button
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    className="p-2 rounded-md bg-primary/20 hover:bg-primary/30 transition-colors flex items-center justify-center"
                >
                    {isEditing ? (
                        <Check className="h-4 w-4 text-primary" />
                    ) : (
                        <Pencil className="h-4 w-4 text-primary" />
                    )}
                </button>

                {/* Delete */}
                <button
                    onClick={handleDelete}
                    className="p-2 rounded-md bg-destructive/20 hover:bg-destructive/30 transition-colors flex items-center justify-center"
                >
                    <Trash2 className="h-4 w-4 text-destructive" />
                </button>
            </div>
        </div>
    );
};
