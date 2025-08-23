import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Task } from "@/types/types";
import { DatePicker } from "./DatePicker";
import { toast } from "sonner"

interface AddTaskFormProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ tasks, setTasks }) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState<Date>();

  const handleAdd = () => {
    if (!title) return;
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title,
        deadline: deadline ? deadline.toISOString() : new Date().toISOString(),
        subtasks: [],
      },
    ]);
    setTitle("");
    toast.success("Task Added successfully!")
    setDeadline(undefined);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-6 p-4 bg-card/70 border border-accent/50 rounded-xl shadow-md backdrop-blur-sm">
      <Input
        placeholder="Add new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-background text-foreground border border-muted/50 focus:border-primary focus:ring-0 placeholder:text-muted-foreground "
      />
      <DatePicker date={deadline} setDate={setDeadline}  />
      <Button
        onClick={handleAdd}
        className="bg-primary hover:bg-primary/90 text-accent-foreground shadow-md sm:min-w-[100px]"
      >
        Add Task
      </Button>
    </div>
  );
};
