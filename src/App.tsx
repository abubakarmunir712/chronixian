import './App.css'
import { Button } from "@/components/ui/button";

function App() {
  return (
    <Button variant="default" onClick={() => alert("Clicked!")}>
      Click Me
    </Button>

  )
}

export default App
