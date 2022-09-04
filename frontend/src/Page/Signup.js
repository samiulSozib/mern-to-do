import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {

    const navigate=useNavigate()

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const handleSignup = async (e) => {
        e.preventDefault()

        if(credentials.cpassword!==credentials.password){
            alert('password not match')
        }else{
            const response=await fetch(`http://localhost:1000/api/auth/register`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
            })

            if(response.status===200 || response.status===201){
                navigate('/login')
            }else{
                alert('User create fail')
            }
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-5'>
            <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Singup</h1>
            <div className="row">
                <div className="col-lg-6 col-md-6 p-5 m-auto shadow-sm rounded-lg">
                    <form onSubmit={handleSignup}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name='name' aria-describedby="name" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' aria-describedby="email" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={6} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={6} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup