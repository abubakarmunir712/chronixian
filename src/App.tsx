import './App.css';
import { AddTaskForm } from "@/components/tasks/AddTaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import type { Task } from "@/types/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("chronixian-tasks", []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-background text-foreground relative overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 w-[80rem] h-[60rem] bg-gradient-radial from-primary/10 via-transparent to-accent/10 rounded-full -translate-x-1/2 pointer-events-none"></div>

      {/* Logo */}
      <div className="mb-6 flex flex-col items-center z-10 relative">
        <h1 className="text-5xl font-extrabold mt-4 bg-gradient-to-r from-primary/70 to-accent/70 bg-clip-text text-transparent">
          Chronixian
        </h1>
      </div>

      {/* Add Task Form */}
      <div className="w-full max-w-10/12 mb-6 z-10 relative">
        <AddTaskForm tasks={tasks} setTasks={setTasks} />
      </div>

      {/* Task List */}
      <div className="w-full max-w-10/12 z-10 relative">
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;
