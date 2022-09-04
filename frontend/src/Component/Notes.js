import React, { useContext, useEffect,useRef,useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = () => {

    const navigate = useNavigate()
    const context = useContext(NoteContext);
    const { notes, getMyNotes,editNote } = context
    const ref = useRef(null)
    const refClose = useRef(null)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getMyNotes()
        } else {
            navigate('/login')
        }
    }, []);

    const [note, setnote] = useState({id:"",uTitle:"",uDescription:"",uTag:""});
    

    const updateNote = (currentNote) => {
        ref.current.click()
        setnote({ id: currentNote._id, uTitle: currentNote.title, uDescription: currentNote.description, uTag: currentNote.tag })
    }

    const onChange = (e) => {
        setnote({
            ...note, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        
        editNote(note.id,note.uTitle,note.uDescription,note.uTag)
        refClose.current.click()
    }

    return (
        <div>


            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="uTitle" name='uTitle' value={note.uTitle} onChange={onChange} minLength={6} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="uDescription" name='uDescription' value={note.uDescription} onChange={onChange} minLength={6} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="uTag" name='uTag' value={note.uTag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleSubmit} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <h4>My Notes</h4>
            <div>
                {notes.length === 0 && 'No Notes Available'}
            </div>
            <div className="row">
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote}/>
                })}
            </div>
        </div>
    )
}

export default Notes