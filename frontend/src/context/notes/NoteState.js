import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{

    const host = 'http://localhost:1000'

    const myNotes=[]

    const [notes, setnotes] = useState(myNotes);

    const getMyNotes=async()=>{
        const response=await fetch(`${host}/api/notes/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
        })

        const json=await response.json()
        //console.log(json)
        setnotes(json)
    }

    const addNote=async(title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/add-note`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        })

        const json=await response.json()
        setnotes(notes.concat(json))
    }

    const deleteNote=async(noteId)=>{
        await fetch(`${host}/api/notes/delete-note/${noteId}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        })

        
        const newNotes=notes.filter((note)=>{return note._id!==noteId})
        setnotes(newNotes)
    }

    const editNote=async(noteId,title,description,tag)=>{
        await fetch(`${host}/api/notes/update-note/${noteId}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        })

        let newNotes=JSON.parse(JSON.stringify(notes))

        for(let index=0;index<newNotes.length;index++){
            const element=newNotes[index]
            if(element._id===noteId){
                newNotes[index].title=title;
                newNotes[index].description=description;
                newNotes[index].tag=tag
                break
            }
        }

        setnotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{getMyNotes,notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState