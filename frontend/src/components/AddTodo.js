import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker'
import jwt_decode from "jwt-decode";
import dayjs from "dayjs"
import { useAuth } from "../provider/authProvider";

const TodoList = (props) => {
  const { credentials, resetToken, setToken} = useAuth();
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [deadline, setdeadline] = useState(new Date());
  const [userid, setuserid] = useState("");
  const [status, setstatus] = useState(0);
  const navigate = useNavigate();
  const {id} = useParams();

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async req => {
    const decoded = jwt_decode(credentials.accessToken)
    const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;
    console.log('isExpired: ', isExpired)
    if(!isExpired) return req

    const result = await axios.get("http://localhost:5000/token", {
      headers: {
        Authorization: `Bearer ${credentials.refreshToken}`,
      },
    });
    console.log(result.data)
    setToken(result.data.accessToken, credentials.refreshToken)

    return req
  })

  useEffect(() => {
    if(props.status == 'isEdit'){
      console.log(props.status)
      const getTodoById = async () =>{
        const response = await axiosJWT.get(`http://localhost:5000/todos/${id}`)
        const data = response.data[0]
        settitle(data.title)
        setdescription(data.description)
        setdeadline(data.deadline)
        setstatus(data.status)
        setuserid(data.userid)
      }
      getTodoById()
    }
  }, [])

  const actionButton = () => {
    if(props.status == 'isAdd'){
      return (
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary">Create Todos!</button>
        </div>
      )
    }else{
      return(
        <div className="form-group mb-3">
          <button type="button" onClick={()=> deleteTodo(id)} className="btn btn-danger">Delete Todos!</button>
          <button type="submit" className="btn btn-primary">Update Todos!</button>
        </div>
      )
    }
  }

  const deleteTodo = async (id) =>{
    try {
      await axiosJWT.delete(`http://localhost:5000/todos/${id}`)
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  const saveTodo = async (e) =>{
    e.preventDefault();

    if (title.length > 50){
      alert("Title terlalu panjang")
      return;
    }
    try {
      if(props.status == 'isAdd'){
        await axios.post('http://localhost:5000/todos',{
          title, 
          description, 
          status,
          deadline,
          userid
        });
      }else{
        await axiosJWT.patch(`http://localhost:5000/todos/${id}`,{
          title, 
          description, 
          status,
          deadline,
          userid
        });
      }
      navigate("/");

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
                    <label htmlFor="titleInput" className="form-label">
                      Todo Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="titleInput"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
                      placeholder="E.g. completing my mathematics tasks"
                    />
                    {/* Conditional rendering of the warning */}
                    {title.length > 50 && (
                      <p className="text-danger mt-1" style={{ display: "block" }}>
                        Title maksimal 50 karakter.
                      </p>
                    )}
                  </div>
                    <div className="form-group mb-3">
                      <label htmlFor="descriptionInput" className="form-label">Todo Description</label>
                      <textarea className="form-control" id="descriptionInput" value={description} onChange={(e)=> setdescription(e.target.value)} rows={3} />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="deadlineInput" className="form-label">Todo Deadline</label>
                    </div>
                    <div className="form-group mb-3">
                      {/* <Datepicker value={deadline} onChange={(e)=> setdeadline(e.target.value)} className="form-control"/> */}
                      <DateTimePicker onChange={setdeadline} value={deadline} className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="useridInput" className="form-label">User ID</label>
                      <input type="text" value={userid} onChange={(e)=> setuserid(e.target.value)} className="form-control" placeholder="E.g. 0 for Krisna Wandhana" />
                    </div>
                    {actionButton()}
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