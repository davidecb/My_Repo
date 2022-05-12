const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const { NotFoundMiddleware, ErrorMiddleware } = require('../middleware')

module.exports = ({
    StreamateRoutes,
    LivejasminRoutes,
    Flirt4FreeRoutes,
    ImLiveRoutes,
    CamsodaRoutes,
    UserRoutes,
    NoteRoutes,
    PerformerRoutes,
    TestRoutes
}) => {
    const router = express.Router()
    const apiRouter = express.Router()

    apiRouter
        .use(bodyParser.urlencoded({ extended: false }))
        .use(bodyParser.json())
        .use(helmet())
        .use(cors())
        .use('/streamate', StreamateRoutes)
        .use('/livejasmin', LivejasminRoutes)
        .use('/flirt4free', Flirt4FreeRoutes)
        .use('/imlive', ImLiveRoutes)
        .use('/camsoda', CamsodaRoutes)
        .use('/user', UserRoutes)
        .use('/note', NoteRoutes)
        .use('/performer', PerformerRoutes)
        .use('/test', TestRoutes)

    router.use('/api/v1', apiRouter)
    router.use(NotFoundMiddleware)
    router.use(ErrorMiddleware)

    return router
}
