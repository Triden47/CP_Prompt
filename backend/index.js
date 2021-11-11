import express from 'express'
import cors from 'cors'
import axios  from 'axios'
import {} from 'dotenv/config'
//components

const app = express()

app.use(cors())
// app.use('/', Routes)

const PORT = 5000
const URL = 'https://clist.by:443/api/v2/contest/'
const contestData = async(TIME) => {
    try {
        const contestInfo = await axios.get(`${URL}/?username=${process.env.API_USER}&api_key=${process.env.API_KEY}&total_count=true&with_problems=false&end__gt=${TIME}&order_by=start`)
        console.log(contestInfo)
    } catch(error) {
        console.log(error)
    }
}

const requestLoop = setInterval(() => {
    contestData(new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString())
}, 60000)

// requestLoop()

axios.get
app.listen(PORT, () => console.log(`The server is running successfully on port ${PORT}`))