import React, {useState, useEffect} from 'react'
import axios from "axios"

const TodoList = () => {
    const[todos, setTodos] = useState([])

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async() => {
        const response = await axios.get('http://localhost:5000/todos')
        setTodos(response.data)
    }

  return (
    <section className="vh-100" style={{backgroundColor: '#e2d5de'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius: '15px'}}>
                <div className="card-body p-5">
                  <h6 className="mb-3">Awesome Todo List</h6>
                  <form className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill">
                      <input type="text" id="form3" className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="form3">What do you need to do today?</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg ms-2">Add</button>
                  </form>
                  <ul className="list-group mb-0">
                    {todos.map((todo, index) => (
                        <li key={todo.id} className="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-0">
                            <div className="d-flex align-items-center">
                                <input className="form-check-input me-2" type="checkbox" defaultValue aria-label="..." defaultChecked />
                                <b>{todo.title} </b>: {todo.description} 
                            </div>
                            <a href="#!" title="edit-todo">
                                <button className="btn btn-primary">Edit</button>
                            </a>
                        </li>
                    ))}

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
                    <button className="me-2 btn btn-link">Log Out</button>
                    <button className="btn btn-primary">Add Task</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default TodoList