import express, { json } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggeroutput from './swagger-output.json' assert { type: 'json' };
import session from 'express-session';

app.use(session({
    secret: 'averysecretsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
    }
}))

const app = express()
app.use(json())
const port = 3000

//generated with codium ai
const TODOSTESTDATA = [
    {
        'id': 1,
        'title': 'Buy groceries',
        'createdDate': '01.01.22',
        'completedDate': null
    },
    {
        'id': 2,
        'title': 'Clean the house',
        'createdDate': '31.12.21',
        'completedDate': '01.01.22'
    },
    {
        'id': 3,
        'title': 'Finish project',
        'createdDate': '02.01.22',
        'completedDate': null
    },
    {
        'id': 4,
        'title': 'Call mom',
        'createdDate': '03.01.22',
        'completedDate': '03.01.22'
    },
    {
        'id': 5,
        'title': 'Go for a run',
        'createdDate': '04.01.22',
        'completedDate': null
    }
]

const loginInfos = [{
    username: 'admin',
    password: 'admin'
}, {
    username: 'moo',
    password: 'password'
}]

app.get('/tasks', (req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Get all tasks'
    // #swagger.description = 'Get all tasks from the fictional database, if found'
    const tasks = TODOSTESTDATA
    if (!tasks) {
        res.status(404).json(tasks)
        return
    }
    res.status(200).json(tasks)
})

app.post('/tasks', (req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Create a new task'
    // #swagger.description = 'Create a new task if title is not empty.'
    /* #swagger.parameters['body'] = {
           in: 'body',
           description: 'New task',
           required: true,
           schema: {
            title: 'String',
            createdDate: 'String or null',
            completedDate: 'String or null'
        }
} */
    /* #swagger.parameters['titel'] = {
            description: 'Titel of the task',
            required: true,
            type: 'String',
            format: 'String'
    } */
    const createDate = new Date()
    const task = {
        'id': TODOSTESTDATA.length + 1,
        'title': req.body.title,
        'createdDate': req.body.createdDate ? req.body.createdDate : createDate.toLocaleDateString(),
        'completedDate': req.body.completedDate ? req.body.completedDate : null
    }
    if (!task || !task.title) {
        res.status(404).json(task)
        return
    }
    TODOSTESTDATA.push(task)
    res.status(201).json(task)
})

app.get('/tasks/:id', (req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Get a task by id'
    // #swagger.description = 'Get a task by id, if found'
    const taskId = req.params.id
    const taskById = TODOSTESTDATA.find(task => task.id === taskId)
    if (!taskById) {
        res.status(404).json(taskById)
        return
    }
    res.status(200).json(taskById)
})

app.put('/tasks/:id', (req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Update a task by id'
    // #swagger.description = 'Update a task by id, if found'
    // #swagger.responses['404'] = { description: 'Task not found'}

    const taskId = req.params.id
    const taskIndex = TODOSTESTDATA.findIndex(task => task.id === taskId)
    const taskToUpdate = req.body
    if (taskIndex === -1) {
        res.status(404).json({ message: 'Task not found' })
        return
    }
    TODOSTESTDATA[taskIndex] = {
        ...TODOSTESTDATA[taskIndex],
        ...taskToUpdate
    }
    res.status(200).json(TODOSTESTDATA[taskIndex])
})

app.delete('/tasks/:id', (req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Delete a task by id'
    // #swagger.description = 'Delete a task by id, if found'
    // #swagger.responses['404'] = { description: 'Task not found'}

    const taskId = req.params.id
    const taskIndex = TODOSTESTDATA.findIndex(task => task.id === taskId)
    if (taskIndex === -1) {
        res.status(404).json({ message: 'Task not found' })
        return
    }
    TODOSTESTDATA.splice(taskIndex, 1)
})

app.post('/login', (req, res) => {
    const { username, password } = req.body

    if (req.session.username) {
        res.status(401).json({ message: 'Already logged in' })
        return
    }
    const user = loginInfos.find(user => user.username === username && user.password === password)
    if (!user) {
        res.status(401).json({ message: 'Invalid username or password' })
        req.session.username = ''
        return
    }
    res.status(200).json(user.username)
    req.session.username = username
})

app.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(swaggeroutput)
)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})