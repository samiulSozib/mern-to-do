import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React,{useState} from 'react'
import Navbar from './Component/Navbar';
import Home from './Page/Home';
import Login from './Page/Login';
import Signup from './Page/Signup';
import Alert from './Component/Alert';
import NoteState from './context/notes/NoteState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return (
    <div>
      <AlertState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert/>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='signup' element={<Signup />}></Route>
          </Routes>
        </Router>
      </NoteState>
      </AlertState>
      
    </div>
  )
}

export default App


