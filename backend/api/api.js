import axios  from 'axios'
import {} from 'dotenv/config'

var contest = {info: ""}
const URL = 'https://clist.by:443/api/v2/contest/'
const contestData = async(TIME) => {
    try {
        contest.info = await axios.get(`${URL}/?username=${process.env.API_USER}&limit=1000&api_key=${process.env.API_KEY}&total_count=true&with_problems=false&end__gte=${TIME}`)

    } catch(error) {
        console.log(error)
    }
}

const requestLoop = setInterval(() => {
    contestData(new Date(new Date().getTime()).toISOString())
}, 10000)

export default contest