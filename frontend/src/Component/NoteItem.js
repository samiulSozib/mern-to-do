import React, { useContext, useState, useRef } from 'react'
import NoteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context
    const { note,updateNote } = props
    return (

        <div className='col-md-3 mb-2'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <i className="fa fa-trash-o fa-sm" style={{ color: 'red' }} onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fas fa-edit fa-sm" style={{ color: 'green' }} onClick={() => {updateNote(note)}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem