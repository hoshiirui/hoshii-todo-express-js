import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAuth } from "../provider/authProvider";

const TodoList = () => {
  //a little internal css
  const buttonSpace = {
    marginRight: "1rem",
  };

  const customStyle = {
    color: "green",
  };

  const { credentials, resetToken, setToken} = useAuth();
  // For Getting Data
  const [todos, setTodos] = useState([]);
  const [orderMode, setOrderMode] = useState("id");
  const [filterMode, setFilterMode] = useState(3);
  const [name, setName] = useState("Shira");
  const [url, setUrl] = useState("http://localhost:5000/images/a083450jterpwerb7a966828c5c988fcb.png");
  const [userid, setUserid] = useState(jwt_decode(credentials.accessToken).userId);
  const history = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosJWT.get(
          `http://localhost:5000/todos/${orderMode}/${filterMode}/${userid}`,
          {
            headers: {
              Authorization: `Bearer ${credentials.accessToken}`,
            },
          }
        );
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, [credentials, orderMode,  filterMode]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosJWT.get(`http://localhost:5000/users/${userid}`, {
          headers: {
            Authorization: `Bearer ${credentials.accessToken}`,
          },
        })
        const data = response.data[0]
        setName(data.name)
        if(data.url != null){
          setUrl(data.url)
          // console.log("There's image")
          // console.log(url)
        }else{
          // console.log("no image")
          setUrl("http://localhost:5000/images/a083450jterpwerb7a966828c5c988fcb.png")
        }
      } catch (error) {
        console.log(error)
      }
    }
    const decoded = jwt_decode(credentials.accessToken)
    setUserid(decoded.userId)
    fetchUsers()
    console.log(decoded)
  }, [])

  const Logout = async () => {
    try {
      // await axios.delete("http://localhost:5000/logout", {
      //   headers: {
      //     Authorization: `Bearer ${credentials.accessToken}`,
      //   },
      // });
      resetToken();
    } catch (error) {
      console.log(error);
    }
  };
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

  const orderChange = (e) => {
    setOrderMode(e.target.value);
  };

  const filterChange = (e) => {
    setFilterMode(e.target.value);
    // console.log(filterMode)
  };

  const sortTodo = async () => {
    const response = await axios.get(
      `http://localhost:5000/todos/${orderMode}/${filterMode}/${userid}`,
      {
        header: {
          Authorization: `Bearer ${credentials.accessToken}`,
        },
      }
    );
    setTodos(response.data);
  };

  const changeStatus = async (
    id,
    title,
    description,
    status,
    deadline,
    userid
  ) => {
    console.log(id);
    try {
      if (status === 0) {
        status = 1;
      } else if (status === 1) {
        status = 2;
      } else {
        status = 0;
      }
      console.log(title);
      await axiosJWT.patch(`http://localhost:5000/todos/${id}`, {
        title,
        description,
        status,
        deadline,
        userid,
      });
      sortTodo();
    } catch (error) {
      // console.log(error);
      console.log("anj error")
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#e2d5de" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body p-5">
                <span className="text-center">
                  <div className="mt-3 mb-4">
                    <img src={url} className="rounded-circle img-fluid" style={{width: '100px'}}/>
                  </div>
                  <h4 className="mb-2">{name}</h4>
                  <p className="text-muted mb-4">UserID: {userid} <span className="mx-2">|</span> <Link to={`edituser/${userid}`}>Edit Profile</Link></p>
                  <h4 className="mb-3">Awesome Todo List</h4>
                </span>
                <div className="form-group mb-3">
                  <label htmlFor="orderMode" className="form-label">
                    Order By:
                  </label>
                  <select
                    className="form-control"
                    id="orderMode"
                    value={orderMode}
                    onChange={orderChange}
                  >
                    <option value="id">ID</option>
                    <option value="deadline">Deadline</option>
                    <option value="title">Title</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="filterMode" className="form-label">
                    Filter By:
                  </label>
                  <select
                    className="form-control"
                    id="filterMode"
                    value={filterMode}
                    onChange={filterChange}
                  >
                    <option value="3">All</option>
                    <option value="0">To-do</option>
                    <option value="1">In Progress</option>
                    <option value="2">Done</option>
                  </select>
                </div>

                {/* Menampilkan isinya */}
                <ul className="list-group mb-0">
                  <h6>
                    <b>Due Today</b>
                  </h6>
                  {todos.map((todo, index) => {
                    // Convert the todo.deadline to a Date object
                    const deadlineDate = new Date(todo.deadline);

                    // Get the options for customizing the time format
                    const options = { hour: "numeric", minute: "numeric" };

                    // Get the time portion (hour and minutes) in the user's local time zone
                    const deadlineTime = deadlineDate.toLocaleTimeString(
                      undefined,
                      options
                    );
                    if (todo.status === 0) {
                      return (
                        <li
                          key={todo.id}
                          className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-0"
                        >
                          <div className="d-flex align-items-center">
                            {/* <input className="form-check-input me-2" type="checkbox" onClick={()=> changeStatus(todo.id, todo.title, todo.description, todo.status, todo.deadline, todo.userid)} defaultValue aria-label="..."/> */}
                            <button
                              style={buttonSpace}
                              className="btn btn-primary"
                              type="button"
                              onClick={() =>
                                changeStatus(
                                  todo.id,
                                  todo.title,
                                  todo.description,
                                  todo.status,
                                  todo.deadline,
                                  todo.userid
                                )
                              }
                            >
                              To-Do
                            </button>
                            <b>{todo.title}</b>: {todo.description}
                          </div>
                          <p>{deadlineTime}</p>{" "}
                          {/* Display the extracted time */}
                          {/* <button className="btn btn-primary">More</button> */}
                          <Link
                            to={`edit/${todo.id}`}
                            className="btn btn-primary"
                          >
                            More
                          </Link>
                        </li>
                      );
                    } else if (todo.status === 2) {
                      return (
                        <li
                          key={todo.id}
                          className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-0"
                        >
                          <div className="d-flex align-items-center">
                            {/* <input className="form-check-input me-2" type="checkbox" onClick={()=> changeStatus(todo.id, todo.title, todo.description, todo.status, todo.deadline, todo.userid)} defaultValue aria-label="..." defaultChecked /> */}
                            <button
                              style={buttonSpace}
                              className="btn btn-success"
                              type="button"
                              onClick={() =>
                                changeStatus(
                                  todo.id,
                                  todo.title,
                                  todo.description,
                                  todo.status,
                                  todo.deadline,
                                  todo.userid
                                )
                              }
                            >
                              Done
                            </button>
                            <s>
                              <b>{todo.title}</b>: {todo.description}
                            </s>
                          </div>
                          <p>{deadlineTime}</p>{" "}
                          {/* Display the extracted time */}
                          {/* <button className="btn btn-primary">More</button> */}
                          <Link
                            to={`edit/${todo.id}`}
                            className="btn btn-primary"
                          >
                            More
                          </Link>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={todo.id}
                          className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-0"
                        >
                          <div className="d-flex align-items-center">
                            {/* <input className="form-check-input me-2" type="checkbox" onClick={()=> changeStatus(todo.id, todo.title, todo.description, todo.status, todo.deadline, todo.userid)} defaultValue aria-label="..." /> */}
                            <button
                              style={buttonSpace}
                              className="btn btn-warning"
                              type="button"
                              onClick={() =>
                                changeStatus(
                                  todo.id,
                                  todo.title,
                                  todo.description,
                                  todo.status,
                                  todo.deadline,
                                  todo.userid
                                )
                              }
                            >
                              In Progress
                            </button>
                            <span style={customStyle}>
                              <b>{todo.title}</b>: {todo.description}
                            </span>
                          </div>
                          <p>{deadlineTime}</p>{" "}
                          {/* Display the extracted time */}
                          {/* <button className="btn btn-primary">More</button> */}
                          <Link
                            to={`edit/${todo.id}`}
                            className="btn btn-primary"
                          >
                            More
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="card-footer text-end p-3">
                {/* <button className="me-2 btn btn-link">Log Out</button> */}
                <button onClick={Logout} className="mx-1 btn btn-danger">
                  Logout
                </button>
                <Link to={`add`} className="mx-2 btn btn-primary">
                  Add Todo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoList;
