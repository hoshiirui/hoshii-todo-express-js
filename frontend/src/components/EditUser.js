import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const EditUser = () => {
    const buttonSpace = {
      marginRight: "1rem",
    };

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState("")
    const [file, setFile] = useState("")
    const [preview, setPreview] = useState("")
    const {id} = useParams();
    const history = useNavigate()

    useEffect(() => {
      getUsersById();
    }, []);    

    const getUsersById = async () => {
      const response = await axios.get(`http://localhost:5000/users/${id}`)
      const data = response.data[0]
      setName(data.name)
      setEmail(data.email)
      setFile(data.image)
      setPreview(data.url)
    }

    const loadImage = (e) => {
      const image = e.target.files[0]
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }

    const Register = async(e) => {
        e.preventDefault();
        try {
            if(preview){
              const formData = new FormData();
              formData.append("name", name);
              formData.append("email", email);
              // formData.append("varTest", "lalala")
              formData.append("file", file);
              console.log(file)
              await axios.patch(`http://localhost:5000/users/${id}`, formData, {
                headers:{
                  "Content-Type": "multipart/form-data"
                }
              })
            }else{
              await axios.patch(`http://localhost:5000/users/${id}`, {
                  name: name,
                  email: email,
                  file: null
              })
            }
            history("/login")
            // console.log(preview)
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

                  <h4 className="mb-3">Edit Your Profile</h4>
                  <form onSubmit={ Register } encType="multipart/form-data">
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
                      <label htmlFor="fileInput" className="form-label">Profile Picture (Optional)</label>
                      <input type="file" className="form-control" onChange={loadImage}/>
                    </div>
                    <p className="text-danger mt-1" style={{ display: "block" }}>
                          {msg}
                    </p>
                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary" style={buttonSpace}>Update</button>
                        <Link to={`../login`} className="btn btn-outline-primary">Login</Link>
                    </div>
                    {preview?(
                      <figure>
                        <img src={preview} alt='Preview' className='w-128 h-128'></img>
                      </figure>
                    ): (
                      ""
                    )}
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default EditUser