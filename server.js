import express, { json } from 'express'
import swaggerUi from 'swagger-ui-express'

const app = express()
app.use(json())