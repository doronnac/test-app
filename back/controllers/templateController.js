const { Template } = require('../models/models')


class TemplateController {
    async getTemplates(req, res, next) {
        try {
            const templates = await Template.findAll()
            return res.json(templates)
        }
        catch (e) {
            throw new Error('Server Error')
        }
    }
    async addTemplate(req, res, next) {
        try {
            const { title, type, note, list, toDoList } = req.body
            const newTemplate = await Template.create({ title, type, note: { [type]: note || list || toDoList } })
            return res.json(newTemplate)
        }
        catch (e) {
            throw new Error('Server Error')
        }
    }

    async updateTemplate(req, res, next) {
        try {
            const { id, title, type, note, list, toDoList } = req.body
            const updateTemplate = await Template.update({ title, type, note: { [type]: note || list || toDoList } }, {
                where: {
                    id
                }
            })
            return res.json(updateTemplate)
        }
        catch (e) {
            throw new Error('Server Error')
        }
    }

    async deleteTemplate(req, res, next) {
        try {
            const { id } = req.query
            await Template.destroy({ where: { id } })
            return res.json({})
        }
        catch(e) {
            throw new Error('Server Error')
        }
    }
}

module.exports = new TemplateController()