import React, {useState, useEffect} from 'react'
import axios from "axios"

const TodoList = () => {

  return (
    <section className="vh-100" style={{backgroundColor: '#e2d5de'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius: '15px'}}>
                <div className="card-body p-5">
                <h4 className="mb-3">Create New Todos</h4>

                  <form>
                  <div className="form-group mb-3">
                    <label htmlFor="titleInput" className="form-label">Todo Title</label>
                    <input type="text" className="form-control" id="titleInput" placeholder="E.g. completing my mathemathics tasks" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="descriptionInput" className="form-label">Todo Description</label>
                    <textarea className="form-control" id="descriptionInput" rows={3} defaultValue={""} />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="deadlineInput" className="form-label">Todo Deadline</label>
                    <input type="text" className="form-control" id="deadlineInput" placeholder="E.g. completing my mathemathics tasks" />
                  </div>

                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">Create Todos!</button>
                  </div>
                  </form>
                  <ul className="list-group mb-0">
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
                
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default TodoList