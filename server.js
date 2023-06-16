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
