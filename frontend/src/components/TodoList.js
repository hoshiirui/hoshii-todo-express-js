import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const TodoList = () => {
    // For Getting Data
    const[todos, setTodos] = useState([])

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async() => {
        const response = await axios.get('http://localhost:5000/todos')
        setTodos(response.data)
    }

    //For Adding Data
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(0);
    const [deadline, setDeadline] = useState("");
    const [userid, setUserid] = useState("");


  return (
    <section className="vh-100" style={{backgroundColor: '#e2d5de'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius: '15px'}}>
                <div className="card-body p-5">
                  <h4 className="mb-3">Awesome Todo List</h4>
                  
                  {/* Menampilkan isinya */}
                  <ul className="list-group mb-0">
                  <h6><b>Due Today</b></h6>
                    {todos.map((todo, index) => {
                        // Convert the todo.deadline to a Date object
                        const deadlineDate = new Date(todo.deadline);

                        // Get the options for customizing the time format
                        const options = { hour: 'numeric', minute: 'numeric' };

                        // Get the time portion (hour and minutes) in the user's local time zone
                        const deadlineTime = deadlineDate.toLocaleTimeString(undefined, options);
                        
                        return (
                            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-0">
                            <div className="d-flex align-items-center">
                                <input className="form-check-input me-2" type="checkbox" defaultValue aria-label="..." defaultChecked />
                                <b>{todo.title}</b>: {todo.description}
                            </div>
                            <p>{deadlineTime}</p> {/* Display the extracted time */}
                            <a href="#!" title="edit-todo">
                                {/* <button className="btn btn-primary">More</button> */}
                                <Link to={`edit/${todo.id}`} className="btn btn-primary">More</Link>
                            </a>
                            </li>
                        );
                    })}


                    {/* <li className="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                      <div className="d-flex align-items-center">
                        <input className="form-check-input me-2" type="checkbox" defaultValue aria-label="..." defaultChecked />
                        <s>Dapibus ac facilisis in</s>
                      </div>
                      <a href="#!" data-mdb-toggle="tooltip" title="Remove item">
                        <i className="fas fa-times text-primary" />
                      </a>
                    </li>
                    <li className="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                      <div className="d-flex align-items-center">
                        <input className="form-check-input me-2" type="checkbox" defaultValue aria-label="..." />
                        Morbi leo risus
                      </div>
                      <a href="#!" data-mdb-toggle="tooltip" title="Remove item">
                        <i className="fas fa-times text-primary" />
                      </a>
                    </li> */}
                  </ul>
                </div>
                <div className="card-footer text-end p-3">
                    {/* <button className="me-2 btn btn-link">Log Out</button> */}
                    <Link to={`add`} className="btn btn-primary">Add Todo</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default TodoList