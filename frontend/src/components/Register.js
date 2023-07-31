import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [msg, setMsg] = useState("")
    const history = useNavigate()

    const Register = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            })
            history("/login")
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

                  <h4 className="mb-3">Register</h4>
                  <form onSubmit={ Register }>
                    <div className="form-group mb-3">
                      <p>Kindly fill this form to start using our to-do list!</p>
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="nameInput" className="form-label">Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="E.g. Kadek Ayumi Mutiara Wandhana" />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="emailInput" className="form-label">Email</label>
                      <input type="text" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="E.g. ayumi@decube.it" />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="passwordInput" className="form-label">Password</label>
                      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="confPasswordInput" className="form-label">Confirm Password</label>
                      <input type="password" onChange={(e) => setConfPassword(e.target.value)} value={confPassword} className="form-control" />
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

export default Register