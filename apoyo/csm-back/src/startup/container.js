const { asClass, asFunction, asValue, createContainer } = require('awilix')

// config
const config = require('../config')
const app = require('.')

// services
const { 
    TestService, 
    StreamateService, 
    LivejasminService, 
    Flirt4FreeService, 
    ImLiveService, 
    CamsodaService, 
    UserService, 
    NoteService,
    PerformerService
} = require('../api/services')

// controllers
const { 
    TestController,
    StreamateController,
    LivejasminController,
    Flirt4FreeController,
    ImLiveController,
    CamsodaController,
    UserController,
    NoteController,
    PerformerController
} = require('../api/controllers')

// models
const { 
    Streamate,
    Livejasmin,
    Flirt4Free,
    ImLive,
    Camsoda,
    User,
    Note,
    Performer
} = require('../api/models')

// repositorios
const { 
    StreamateRepository,
    LivejasminRepository,
    Flirt4FreeRepository,
    ImLiveRepository,
    CamsodaRepository,
    UserRepository,
    NoteRepository,
    PerformerRepository
} = require('../api/repositories')

// routes
const { 
    TestRoutes,
    StreamateRoutes,
    LivejasminRoutes,
    Flirt4FreeRoutes,
    ImLiveRoutes,
    CamsodaRoutes,
    UserRoutes,
    NoteRoutes,
    PerformerRoutes
} = require('../api/routes/index.routes')

const Routes = require('../api/routes')

const container = createContainer()

container.register({
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config)
}).register({
    TestService: asClass(TestService).singleton(),
    StreamateService: asClass(StreamateService).singleton(),
    LivejasminService: asClass(LivejasminService).singleton(),
    Flirt4FreeService: asClass(Flirt4FreeService).singleton(),
    ImLiveService: asClass(ImLiveService).singleton(),
    CamsodaService: asClass(CamsodaService).singleton(),
    UserService: asClass(UserService).singleton(),
    NoteService: asClass(NoteService).singleton(),
    PerformerService: asClass(PerformerService).singleton()
}).register({
    TestController: asClass(TestController.bind(TestController)).singleton(),
    StreamateController: asClass(StreamateController.bind(StreamateController)).singleton(),
    LivejasminController: asClass(LivejasminController.bind(LivejasminController)).singleton(),
    Flirt4FreeController: asClass(Flirt4FreeController.bind(Flirt4FreeController)).singleton(),
    ImLiveController: asClass(ImLiveController.bind(ImLiveController)).singleton(),
    CamsodaController: asClass(CamsodaController.bind(CamsodaController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    NoteController: asClass(NoteController.bind(NoteController)).singleton(),
    PerformerController: asClass(PerformerController.bind(PerformerController)).singleton()
}).register({
    TestRoutes: asFunction(TestRoutes).singleton(),
    StreamateRoutes: asFunction(StreamateRoutes).singleton(),
    LivejasminRoutes: asFunction(LivejasminRoutes).singleton(),
    Flirt4FreeRoutes: asFunction(Flirt4FreeRoutes).singleton(),
    ImLiveRoutes: asFunction(ImLiveRoutes).singleton(),
    CamsodaRoutes: asFunction(CamsodaRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    NoteRoutes: asFunction(NoteRoutes).singleton(),
    PerformerRoutes: asFunction(PerformerRoutes).singleton()
}).register({
    StreamateRepository: asClass(StreamateRepository).singleton(),
    LivejasminRepository: asClass(LivejasminRepository).singleton(),
    Flirt4FreeRepository: asClass(Flirt4FreeRepository).singleton(),
    ImLiveRepository: asClass(ImLiveRepository).singleton(),
    CamsodaRepository: asClass(CamsodaRepository).singleton(),
    UserRepository: asClass(UserRepository).singleton(),
    NoteRepository: asClass(NoteRepository).singleton(),
    PerformerRepository: asClass(PerformerRepository).singleton()
}).register({
    Streamate: asValue(Streamate),
    Livejasmin: asValue(Livejasmin),
    Flirt4Free: asValue(Flirt4Free),
    ImLive: asValue(ImLive),
    Camsoda: asValue(Camsoda),
    User: asValue(User),
    Note: asValue(Note),
    Performer: asValue(Performer)
});

module.exports = container
