import React from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate()
    const logout=()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">My TO-DO</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end text-bg-dark"  id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">My TO-DO</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                                </li>
                                
                                
                            </ul>
                            {!localStorage.getItem('token')?<div>
                                <Link className='btn btn-secondary mx-1' to="/login" role="button">Login</Link>
                                <Link className='btn btn-secondary mx-1' to="/signup" role="button">Signup</Link>
                            </div>:<div>
                                <button className='btn btn-secondary' onClick={logout}>Logout</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar