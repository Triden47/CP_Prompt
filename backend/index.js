import express from 'express'
import cors from 'cors'

//components
// import contestInfo from './api/api.js'
import Routes from './routes/Route.js'

const app = express()

app.use(cors())
app.use('/', Routes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`The server is running successfully on port ${PORT}`))