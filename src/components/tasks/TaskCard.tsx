import { Button } from "@/components/ui/button";
import { AddSubtaskForm } from "./AddSubTaskForm";
import { SubtaskList } from "./SubTaskList";
import type { Task } from "@/types/types";

interface TaskCardProps {
  task: Task;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, tasks, setTasks }) => {
  const handleDelete = () => {
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  return (
    <div className="bg-card p-4 rounded-xl shadow-md flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{task.title}</h3>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </div>

      <SubtaskList task={task} tasks={tasks} setTasks={setTasks} />
      <AddSubtaskForm task={task} tasks={tasks} setTasks={setTasks} />
    </div>
  );
};
