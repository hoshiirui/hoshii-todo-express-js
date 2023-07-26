import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const TodoList = () => {
    // For Getting Data
    const[todos, setTodos] = useState([])
    const[orderMode, setOrderMode] = useState("")

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async() => {
        const response = await axios.get('http://localhost:5000/todos')
        setTodos(response.data)
    }

    const changeStatus = async(id, title, description, status, deadline, userid) => {
      console.log(id)
      try {
        if(status===0){
          status=1
        }else{
          status=0
        }
        console.log(title)
        await axios.patch(`http://localhost:5000/todos/${id}`, {
          title,
          description, 
          status, 
          deadline,
          userid
        })
        getTodos()
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <section className="vh-100" style={{backgroundColor: '#e2d5de'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius: '15px'}}>
                <div className="card-body p-5">
                  <h4 className="mb-3">Awesome Todo List</h4>
                  <div className="form-group mb-3">
                    <label htmlFor="orderMode" className="form-label">Order By:</label>
                    <select className="form-control" id="orderMode" value={orderMode} onChange={(e) => setOrderMode(e.target.value)}>
                      <option value="id">ID</option>
                      <option value="deadline">Deadline</option>
                      <option value="title">Title</option>
                    </select>
                  </div>
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
                        if(todo.status === 0){
                          return (
                            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-0">
                            <div className="d-flex align-items-center">
                                <input className="form-check-input me-2" type="checkbox" onClick={()=> changeStatus(todo.id, todo.title, todo.description, todo.status, todo.deadline, todo.userid)} defaultValue aria-label="..."/>
                                <b>{todo.title}</b>: {todo.description}
                            </div>
                            <p>{deadlineTime}</p> {/* Display the extracted time */}
                            <a href="#!" title="edit-todo">
                                {/* <button className="btn btn-primary">More</button> */}
                                <Link to={`edit/${todo.id}`} className="btn btn-primary">More</Link>
                            </a>
                            </li>
                          );
                        }else{
                          return (
                            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-0">
                            <div className="d-flex align-items-center">
                                <input className="form-check-input me-2" type="checkbox" onClick={()=> changeStatus(todo.id, todo.title, todo.description, todo.status, todo.deadline, todo.userid)} defaultValue aria-label="..." defaultChecked />
                                <s><b>{todo.title}</b>: {todo.description}</s>
                            </div>
                            <p>{deadlineTime}</p> {/* Display the extracted time */}
                            <a href="#!" title="edit-todo">
                                {/* <button className="btn btn-primary">More</button> */}
                                <Link to={`edit/${todo.id}`} className="btn btn-primary">More</Link>
                            </a>
                            </li>
                          );
                        }
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