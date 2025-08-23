import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Task, Subtask } from "@/types/types";
import { DatePicker } from "./DatePicker";

interface AddSubtaskFormProps {
  task: Task;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const AddSubtaskForm: React.FC<AddSubtaskFormProps> = ({
  task,
  tasks,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  const handleAdd = () => {
    if (!title) return;
    const newSubtask: Subtask = {
      id: Date.now().toString(),
      title,
      completed: false,
      deadline: deadline ? deadline.toISOString() : new Date().toISOString(),
    };

    const updatedTasks = tasks.map((t) =>
      t.id === task.id
        ? { ...t, subtasks: [...t.subtasks, newSubtask] }
        : t
    );

    setTasks(updatedTasks);
    setTitle("");
    setDeadline(undefined);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-2 items-center">
      <Input
        placeholder="Add subtask..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
      />
      <DatePicker date={deadline} setDate={setDeadline} />
      <Button size="sm" onClick={handleAdd} className="text-accent-foreground">
        Add
      </Button>
    </div>
  );
};
