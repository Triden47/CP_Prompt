import axios  from 'axios'
import {} from 'dotenv/config'

var contest = {info: ""}
const URL = 'https://clist.by:443/api/v2/contest/'
const contestData = async(TIME) => {
    try {
        contest.info = await axios.get(`${URL}/?username=${process.env.API_USER}&api_key=${process.env.API_KEY}&total_count=true&with_problems=false&end__gt=${TIME}&order_by=start`)

        // console.log(contest.info.data)
    } catch(error) {
        console.log(error)
    }
}

const requestLoop = setInterval(() => {
    contestData(new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString())
}, 10000)

export default contest