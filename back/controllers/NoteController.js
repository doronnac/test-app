const { Note } = require('../models/models')


class NoteController {
    async getNotes(req, res, next) {
        try {
            const notes = await Note.findAll()
            return res.json(notes)
        }
        catch (e) {
            throw new Error('Server Error')
        }
    }
    async addNote(req, res, next) {
        try {
            const { title, type, note, list, toDoList } = req.body
            const newNote = await Note.create({ title, type, note: { [type]: note || list || toDoList } })
            return res.json(newNote)
        }
        catch (e) {
            throw new Error('Server Error')
        }
    }

    async updateNote(req, res, next) {
        try {
            const { id, title, type, note, list, toDoList } = req.body
            const updatedNote = await Note.update({ title, type, note: { [type]: note || list || toDoList } }, {
                where: {
                    id
                }
            })
            return res.json(updatedNote)
        }
        catch (e) {
            throw new Error('Server Error')
        }
    }

    async deleteNote(req, res, next) {
        try {
            const { id } = req.query
            await Note.destroy({ where: { id } })
            return res.json({})
        }
        catch(e) {
            throw new Error('Server Error')
        }
    }
}

module.exports = new NoteController()
