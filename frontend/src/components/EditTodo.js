import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker'



const EditTodo = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [deadline, setdeadline] = useState(new Date());
  const [userid, setuserid] = useState("");
  const [status, setstatus] = useState(0);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    getTodoById()
  }, [])
  
  const deleteTodo = async (id) =>{
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`)
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  const getTodoById = async () =>{
    const response = await axios.get(`http://localhost:5000/todos/${id}`)
    const data = response.data[0]
    settitle(data.title)
    setdescription(data.description)
    setdeadline(data.deadline)
    setstatus(data.status)
    setuserid(data.userid)
  }

  const saveTodo = async (e) =>{
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/todos/${id}`,{
        title, 
        description, 
        status,
        deadline,
        userid
      });
      navigate("/");

      // console.log("title:", title);
      // console.log("description:", description);
      // console.log("deadline:", deadline);
      // console.log("status:", status);
      // console.log("userid:", userid);

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
                <h4 className="mb-3">Create New Todos</h4>

                  <form onSubmit={saveTodo}>
                    <div className="form-group mb-3">
                      <label htmlFor="titleInput" className="form-label">Todo Title</label>
                      <input type="text" className="form-control" id="titleInput" value={title} onChange={(e)=> settitle(e.target.value)} placeholder="E.g. completing my mathemathics tasks" />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="descriptionInput" className="form-label">Todo Description</label>
                      <textarea className="form-control" id="descriptionInput" value={description} onChange={(e)=> setdescription(e.target.value)} rows={3} />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="deadlineInput" className="form-label">Todo Deadline</label>
                      <DateTimePicker onChange={setdeadline} value={deadline} className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="useridInput" className="form-label">User ID</label>
                      <input type="text" value={userid} onChange={(e)=> setuserid(e.target.value)} className="form-control" placeholder="E.g. 0 for Krisna Wandhana" />
                    </div>
                    <div className="form-group mb-3">
                      <button type="button" onClick={()=> deleteTodo(id)} className="btn btn-danger">Delete Todos!</button>
                      <button type="submit" className="btn btn-primary">Update Todos!</button>
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

export default EditTodo