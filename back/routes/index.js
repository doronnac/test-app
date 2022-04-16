const Router = require('express')
const router = new Router()
const noteRouter = require('./noteRouter')
const typeRouter = require('./templateRouter')

router.use('/note', noteRouter)
router.use('/template', typeRouter)

module.exports = router
