import express, { json } from 'express'
const app = express()
app.use(json())
const port = 3000
import swaggerUi from 'swagger-ui-express'
import swaggeroutput from './swagger-output.json' assert { type: 'json' }
import session from 'express-session'

app.use(session({
    secret: 'averysecretsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
    }
}))



//generated with codium ai
const TODOSTESTDATA = [
    {
        'id': 1,
        'title': 'Buy groceries',
        'createdDate': '01.01.22',
        'completedDate': null,
        'email': 'admin@zli.ch'

    },
    {
        'id': 2,
        'title': 'Clean the house',
        'createdDate': '31.12.21',
        'completedDate': '01.01.22',
        'email': 'admin@zli.ch'
    },
    {
        'id': 3,
        'title': 'Finish project',
        'createdDate': '02.01.22',
        'completedDate': null,
        'email': 'admin@zli.ch'

    },
    {
        'id': 1,
        'title': 'Call mom',
        'createdDate': '03.01.22',
        'completedDate': '03.01.22',
        'email': 'moo@gmail.com'
    },
    {
        'id': 2,
        'title': 'Go for a run',
        'createdDate': '04.01.22',
        'completedDate': null,
        'email': 'moo@gmail.com'
    }
]

const loginInfos = [{
    email: 'admin@zli.ch',
    password: 'm295'
}, {
    email: 'moo@gmail.com',
    password: 'm295'
}]

app.get('/tasks', (req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Get all tasks'
    // #swagger.description = 'Get all tasks from the fictional database, if found'

    if (!req.session.email) {
        res.status(403).json({ message: 'Not logged in' })
        return
    }

    const userTasks = TODOSTESTDATA.filter(task => task.email === req.session.email)
    if (!userTasks) {
        res.status(500).json({ message: 'Internal server error' })
        return
    }
    res.status(200).json(userTasks)
})

app.post('/tasks', (req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Create a task'
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

    if (!req.session.email) {
        res.status(403).json({ message: 'Not logged in' })
        return
    }

    if (!req.body.title) {
        res.status(406).json({ message: 'Title is required' })
    }

    const taskId = TODOSTESTDATA.filter(task => task.email === req.session.email).length + 1
    const createDate = new Date()
    const task = {
        'id': taskId,
        'title': req.body.title,
        'createdDate': req.body.createdDate ? req.body.createdDate : createDate.toLocaleDateString(),
        'completedDate': req.body.completedDate ? req.body.completedDate : null,
        'email': req.session.email
    }

    TODOSTESTDATA.push(task)
    res.status(201).json(task)
})

app.get('/tasks/:id', (req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Get a task by id'
    // #swagger.description = 'Get a task by id, if found and logged in'

    if (!req.session.email) {
        res.status(404).json({ message: 'Not logged in' })
        return
    }

    const taskId = req.params.id
    const taskById = TODOSTESTDATA.find(task => task.id === parseInt(taskId) && task.email === req.session.email)
    if (!taskById) {
        res.status(404).json(taskById)
        return
    }
    res.status(200).json(taskById)
})

app.put('/tasks/:id', (req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Update a task by id'
    // #swagger.description = 'Update a task by id, if found and logged in'
    // #swagger.responses['404'] = { description: 'Task not found'}

    if (!req.session.email) {
        res.status(403).json({ message: 'Not logged in' })
        return
    }

    if (!req.body.title) {
        res.status(406).json({ message: 'Title is required' })
        return
    }

    const taskId = req.params.id
    const taskIndex = TODOSTESTDATA.findIndex(task => task.id === taskId && task.email === req.session.email)
    const taskToUpdate = {
        ...TODOSTESTDATA[taskIndex],
        ...req.body
    }
    if (taskIndex === -1) {
        res.status(404).json({ message: 'Task not found' })
        return
    }
    TODOSTESTDATA[taskIndex] = taskToUpdate
    res.status(200).json(TODOSTESTDATA[taskIndex])
})

app.delete('/tasks/:id', (req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Delete a task by id'
    // #swagger.description = 'Delete a task by id, if found and logged in'
    // #swagger.responses['404'] = { description: 'Task not found'}

    if (!req.session.email) {
        res.status(403).json({ message: 'Not logged in' })
        return
    }

    const taskId = req.params.id
    const taskIndex = TODOSTESTDATA.findIndex(task => task.id === taskId && task.email === req.session.email)
    if (taskIndex === -1) {
        res.status(404).json({ message: 'Task not found' })
        return
    }
    TODOSTESTDATA.splice(taskIndex, 1)
})

app.post('/login', (req, res) => {
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'Login a user by email and password'
    // #swagger.description = 'Login a user by email and password and get an session cookie'
    // #swagger.parameters['body'] = { in: 'body', description: 'Login info', required: true, schema: { email: 'String', password: 'String' } }

    const { email, password } = req.body

    // generated with codium ai
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (req.session.email) {
        res.status(401).json({ message: 'Already logged in' })
        return
    }

    if (!emailRegex.test(email)) {
        res.status(401).json({ message: 'Invalid email' })
        return
    }

    const user = loginInfos.find(user => user.email === email && user.password === password)
    if (!user) {
        res.status(401).json({ message: 'Invalid email or password' })
        req.session.email = ''
        return
    }
    req.session.email = email
    res.status(200).json({ email: user.email })
})

app.get('/verify', (req, res) => {
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'Verify a user'
    // #swagger.description = 'Verify a user by their session cookie'

    const email = req.session.email
    if (!email) {
        res.status(401).json({ message: 'Not logged in' })
        return
    }
    const user = loginInfos.find(user => user.email === email)
    if (!user) {
        res.status(401).json({ message: 'Invalid token' })
        return
    }
    res.status(200).json({ email: req.session.email })
})

app.delete('/logout', (req, res) => {
    // #swagger.tags = ['Authentication']
    // #swagger.summary = 'Logout a user'
    // #swagger.description = 'Logout a user and delete the session cookie'
    req.session.email = ''
    res.sendStatus(204)
})

app.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(swaggeroutput)
)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})