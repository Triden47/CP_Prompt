import express from 'express'

//components
import contestJSON from '../api/api.js'

const route = express.Router()

route.get('/contest', async(req, res) => {
    try {
        // console.log(contestJSON.info)
        res.status(200).json(contestJSON.info)
    } catch(error) {
        res.status(500).json(error)
    }
})

export default route