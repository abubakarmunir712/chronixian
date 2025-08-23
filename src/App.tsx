import './App.css'
import { AddTaskForm } from "@/components/tasks/AddTaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import type { Task } from "@/types/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";


function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("chronixo-tasks", []);
  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Chronixian</h1>

      <AddTaskForm tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>

  )
}

export default App
