import swaggerAutogen from 'swagger-autogen'

const doc = {
	info: {
		title: 'Todo API',
		description: 'This is a Todo API which can be used to create, read, update and delete a Todo',
	},
	host: 'localhost:3000',
	schemes: ['http'],
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./server.js']


swaggerAutogen(outputFile, endpointsFiles, doc)