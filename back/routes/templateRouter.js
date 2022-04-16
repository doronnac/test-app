const Router = require('express')
const router = new Router()
const templateController = require('../controllers/templateController')

router.get('', templateController.getTemplates)
router.post('', templateController.addTemplate)
router.delete('', templateController.deleteTemplate)
router.put('', templateController.updateTemplate)

module.exports = router
