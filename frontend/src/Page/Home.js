import React from 'react'
import AddNotes from '../Component/AddNotes'
import Notes from '../Component/Notes'

const Home = () => {
  return (
    <div className='container mt-5'>
      <AddNotes/>
      <Notes/>
    </div>
  )
}

export default Home
