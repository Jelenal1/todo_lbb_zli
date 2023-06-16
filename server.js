import express, { json } from 'express'
import swaggerUi from 'swagger-ui-express'

const app = express()
app.use(json())

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