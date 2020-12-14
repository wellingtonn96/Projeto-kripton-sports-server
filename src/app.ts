import express from 'express';
import { connection } from './database/dbConnection'
import  CollaboradoresDao from './models/ColaboradoresDao'

const app = express();

connection().connect((err) => {
  if(err) {
    return console.error(`error:${err.message}`)
  }

  console.log('Connected to the mysql server')
})

app.use(express.json())

app.post('/', async (request, response) => {
  try {
    const data = request.body;

    const colaboradoresDAO = new CollaboradoresDao()

    await colaboradoresDAO.create(data)

    return response.json(data)
  } catch (error) {
    return response.status(400).json({ err: error.message })
  }
})

export default app
