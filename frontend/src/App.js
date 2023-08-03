import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo.js";
import EditTodo from "./components/EditTodo";
import Login from "./components/Login.js";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./provider/authProvider";
import PrivateRoutes from "./routes/private.route";
import { PublicRoutes } from "./routes/public.route";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            {/* <Route path="/:order" element={<TodoList/>}/>  */}
            <Route path="/" element={<TodoList />} />
            <Route path="/add" element={<AddTodo />} />
            <Route path="/edit/:id" element={<EditTodo />} />
          </Route>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
