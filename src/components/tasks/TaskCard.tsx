import { useState } from "react";
import { AddSubtaskForm } from "./AddSubTaskForm";
import { SubtaskList } from "./SubTaskList";
import { Edit2, Save, Clock, ChevronDown, ChevronRight } from "lucide-react";
import type { Task } from "@/types/types";
import { DatePicker } from "./DatePicker";
import { DeleteDialog } from "./DeleteDialog";

interface TaskCardProps {
  task: Task;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, tasks, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDeadline, setEditedDeadline] = useState(new Date(task.deadline));
  const [showSubtasks, setShowSubtasks] = useState(false);

  const handleDelete = () => setTasks(tasks.filter(t => t.id !== task.id));

  const handleSave = () => {
    const updatedTasks = tasks.map(t =>
      t.id === task.id
        ? { ...t, title: editedTitle, deadline: editedDeadline.toISOString() }
        : t
    );
    setTasks(updatedTasks);
    setIsEditing(false);
  };

  // Deadline + remaining days logic
  const today = new Date();
  const taskDeadline = new Date(task.deadline);
  const diffMs = taskDeadline.getTime() - today.setHours(0, 0, 0, 0);
  const remainingDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let deadlineColor = "text-green-400";
  if (remainingDays < 0) deadlineColor = "text-red-500";
  else if (remainingDays <= 3) deadlineColor = "text-yellow-400";

  return (
    <div className="bg-card/80 p-4 rounded-xl shadow-md flex flex-col gap-4 border border-white/10">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 flex flex-col gap-1">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full bg-background text-foreground border border-muted/50 rounded px-2 py-1"
            />
          ) : (
            <h3 className="font-semibold text-lg">{task.title}</h3>
          )}

          <div className="flex items-center gap-2 mt-1">
            <Clock className={`h-4 w-4 ${deadlineColor}`} />
            {isEditing ? (
              <DatePicker date={editedDeadline} setDate={setEditedDeadline} />
            ) : (
              <div className="flex gap-2 items-center">
                <p className={`text-sm ${deadlineColor}`}>
                  {taskDeadline.toLocaleDateString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {remainingDays < 0
                    ? `Overdue by ${Math.abs(remainingDays)} day(s)`
                    : remainingDays === 0
                    ? "Due today"
                    : `${remainingDays} day(s) left`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons row */}
        <div className="flex items-center gap-2 mt-1">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="p-2 rounded-md bg-accent hover:bg-accent/80 transition-colors flex items-center justify-center"
            >
              <Save className="h-4 w-4 text-accent-foreground" />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-md bg-blue-500/20 hover:bg-blue-500/30 transition-colors flex items-center justify-center"
            >
              <Edit2 className="h-4 w-4 text-blue-500" />
            </button>
          )}
          <DeleteDialog onConfirm={handleDelete} />
        </div>
      </div>

      {/* Subtasks toggle */}
      {task.subtasks.length > 0 && (
        <button
          onClick={() => setShowSubtasks(!showSubtasks)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {showSubtasks ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          Subtasks ({task.subtasks.length})
        </button>
      )}

      {/* Collapsible subtasks */}
      {showSubtasks && (
        <div className="mt-2">
          {/* <hr className="border-t border-green-950 my-2" /> */}
          <SubtaskList task={task} tasks={tasks} setTasks={setTasks} />
        </div>
      )}

      {/* Always allow adding new subtasks */}
      <AddSubtaskForm task={task} tasks={tasks} setTasks={setTasks} />
    </div>
  );
};
