import React, { useState,useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alert/alertContext';

const Login = () => {
    const contex=useContext(AlertContext)
    const {alert,showAlert}=contex

  

    const navigate = useNavigate()

    const [credentials, setcredentials] = useState({ email: "", password: "" });

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/")
        }else{
            navigate("/login")
        }
    }, [])


    const handleLogin = async (e) => {
        
        e.preventDefault()
        console.log(credentials)

        const response = await fetch(`http://localhost:1000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })

        const json = await response.json()
        //console.log(json)


        if (response.status === 200 || response.status === 201) {
            showAlert("Login Success","success")
            console.log(alert)
            localStorage.setItem("token", json.authToken)
            setTimeout(() => {
                navigate('/')
            }, 1000);
            
        } else {
            showAlert('Login Fail','danger')
        }
    }



    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-5'>
            <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Login</h1>
            <div className="row">
                <div className="col-lg-6 col-md-6 p-5 m-auto shadow-sm rounded-lg">
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' aria-describedby="email" onChange={onChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' onChange={onChange} required />
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login