import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState("")
    const history = useNavigate()

    const Auth = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            })
            history("/")
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg)
            }
        }
    }

  return (
    <section className="vh-100" style={{backgroundColor: '#e2d5de'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius: '15px'}}>
                <div className="card-body p-5">

                  <h4 className="mb-3">Login</h4>
                  <form onSubmit={ Auth }>
                    <div className="form-group mb-3">
                      <label htmlFor="emailInput" className="form-label">Email</label>
                      <input type="text" value={email}  onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="E.g. udeltolol@gmail.com" />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="passwordInput" className="form-label">Password</label>
                      <input type="password" value={password}  onChange={(e) => setPassword(e.target.value)} className="form-control" />
                    </div>
                    <p className="text-danger mt-1" style={{ display: "block" }}>
                          {msg}
                    </p>
                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Login