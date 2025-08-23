import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Task, Subtask } from "@/types/types";
import { DatePicker } from "./DatePicker";
import { toast } from "sonner"

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

  const normalizeDate = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const handleAdd = () => {
    if (!title) return;
    if (!deadline) return;

    const parentDeadline = normalizeDate(new Date(task.deadline));
    const subtaskDeadline = normalizeDate(deadline);

    console.log(parentDeadline)
    console.log(subtaskDeadline)


    if (subtaskDeadline > parentDeadline) {
      toast.error("Subtask deadline cannot be later than the parent task deadline!");
      return;
    }

    const newSubtask: Subtask = {
      id: Date.now().toString(),
      title,
      completed: false,
      deadline: deadline.toISOString(),
    };

    const updatedTasks = tasks.map((t) =>
      t.id === task.id
        ? { ...t, subtasks: [...t.subtasks, newSubtask] }
        : t
    );

    setTasks(updatedTasks);
    toast.success("Task added successfully!");
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
