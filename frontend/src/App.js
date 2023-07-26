import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo.js";
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList/>}/>
        <Route path="/add" element={<AddTodo/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
