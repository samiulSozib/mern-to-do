const router = require('express').Router()
const { getAllNotes, createNote, updateNote, deleteNote } = require('../controller/noteController')
const { fetchUser } = require('../middleware/fetchUser')
const noteValidator = require('../validator/noteValidator')

router.get('/', fetchUser, getAllNotes)
router.post('/add-note', fetchUser, noteValidator, createNote)
router.put('/update-note/:id', fetchUser, updateNote)
router.delete('/delete-note/:id', fetchUser, deleteNote)

module.exports = router