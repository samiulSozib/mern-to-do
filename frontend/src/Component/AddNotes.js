import React, { useState } from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';


const AddNotes = () => {
    const context=useContext(NoteContext)
    const {addNote}=context

    const [note, setnote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    const handleAddNote=async(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setnote({title: "", description: "", tag: ""})
    }

    return (
        <div className='container mt-5'>
            <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Add Note</h1>
            <div className="row">
                <div className="col-lg-6 col-md-6 p-5 m-auto shadow-sm rounded-lg">
                    <form onSubmit={handleAddNote}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} minLength={6} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" name='description' onChange={onChange} required rows="3" value={note.description}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Note</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNotes
