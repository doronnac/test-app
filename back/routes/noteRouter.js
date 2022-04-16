const Router = require('express')
const router = new Router()
const noteController = require('../controllers/NoteController')

router.get('', noteController.getNotes)
router.post('', noteController.addNote)
router.delete('', noteController.deleteNote)
router.put('', noteController.updateNote)

module.exports = router
