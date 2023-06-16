import express, { json } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggeroutput from './swagger-output.json' assert { type: 'json' };

const app = express()
app.use(json())
const port = 3000

//generated with codium ai
const TODOSTESTDATA = [
    {
        'title': 'Buy groceries',
        'createdDate': '01.01.22',
        'completedDate': null
    },
    {
        'title': 'Clean the house',
        'createdDate': '31.12.21',
        'completedDate': '01.01.22'
    },
    {
        'title': 'Finish project',
        'createdDate': '02.01.22',
        'completedDate': null
    },
    {
        'title': 'Call mom',
        'createdDate': '03.01.22',
        'completedDate': '03.01.22'
    },
    {
        'title': 'Go for a run',
        'createdDate': '04.01.22',
        'completedDate': null
    }
]

app.get('/tasks', (req, res) => {
    // #swagger.tags = ['Tasks']
    // #swagger.summary = 'Get all tasks'
    // #swagger.description = 'Get all tasks from the fictional database, if there are no tasks found you'll get an empty array'
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
    // #swagger.defaults = {createdDate: new Date().toLocaleDateString()}
    const createDate = new Date()
    const task = {
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



app.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(swaggeroutput)
)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})