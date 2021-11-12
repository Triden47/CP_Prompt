import express from 'express'

//components
import contest from '../api/api.js'

const route = express.Router()

route.get('/contest', async(req, res) => {
    try {
        // console.log(contest.info.data)
        res.status(200).json(contest.info.data)
    } catch(error) {
        res.status(500).json(error)
    }
})

export default route