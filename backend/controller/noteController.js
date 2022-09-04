const Notes = require('../models/Notes')
const { validationResult } = require('express-validator')


// get all note
exports.getAllNotes = async(req, res, next) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (e) {
        return res.status(500).json({ error: 'Something Wrong', msg: e.message })
    }
}

// create note 

exports.createNote = async(req, res, next) => {
    try {
        let { title, description, tag } = req.body
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        //console.log(title, description)
        let createNote = await Notes.create({
            user: req.user.id,
            title,
            description,
            tag
        })

        res.json(createNote)

    } catch (e) {
        return res.status(500).json({ error: 'Something Wrong', msg: e.message })
    }
}

// update note

exports.updateNote = async(req, res, next) => {
    try {
        const { title, description, tag } = req.body
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(400).json({ error: 'NOte Not Found' })
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(400).json({ error: 'Not Allowed' })
        }

        let updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(updatedNote)


    } catch (e) {
        return res.status(500).json({ error: 'Something Wrong', msg: e.message })
    }
}

// delete note

exports.deleteNote = async(req, res, next) => {
    try {

        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(400).json({ error: 'NOte Not Found' })
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(400).json({ error: 'Not Allowed' })
        }

        await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" })


    } catch (e) {
        return res.status(500).json({ error: 'Something Wrong', msg: e.message })
    }
}