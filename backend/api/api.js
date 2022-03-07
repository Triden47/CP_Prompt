import axios  from 'axios'
import {} from 'dotenv/config'

var contestJSON = {info: {upcoming: [], ongoingList: [], upcomingList: []}}

const URL = 'https://clist.by:443/api/v2/contest/'
const contestData = async(TIME) => {
    try {
        let contest = await axios.get(`${URL}/?username=${process.env.API_USER}&limit=1000&api_key=${process.env.API_KEY}&total_count=true&with_problems=false&end__gte=${TIME}`)
        dataRearrange(contest)
    } catch(error) {
        console.log(error)
    }
}

const requestLoop = setInterval(() => {
    contestData(new Date(new Date().getTime()).toISOString())
}, 10000)


const dataRearrange = ((contest) => {

    let contestArray = [], ongoing = [], upcoming = [], ongoingList = [], upcomingList = []

    let contestData = contest.data
    contestArray = Object.keys(contestData.objects).map(key => {
        return contestData.objects[key]
    })

    const time = new Date(new Date().getTime()).toISOString()
    ongoing = (contestArray.filter(contest => contest.start <= time).sort((first, second) => {
        if(first.end < second.end)
            return -1
        else if(first.end > second.end)
            return 1
        else
            return 0
    }))

    upcoming = (contestArray.filter(contest => contest.start > time).sort((first, second) => {
        if(first.start < second.start)
            return -1
        else if(first.start > second.start)
            return 1
        else
            return 0
    }))

    var track = []
    for(let i = 0; i < ongoing.length; i++) {

        let value = ongoing[i].host
        if(track.find(element => element === value) === undefined) {
            const newArr = ongoing.filter(contest => contest.host === ongoing[i].host)
            ongoingList = [...ongoingList, newArr]
            track.push(value)
        }
    }
    track = []
    for(let i = 0; i < upcoming.length; i++) {

        let value = upcoming[i].host
        if(track.find(element => element === value) === undefined) {
            const newArr = upcoming.filter(contest => contest.host === upcoming[i].host)
            upcomingList = [...upcomingList, newArr]
            track.push(value)
        }
    }
    contestJSON.info = {upcoming: upcoming, ongoingList: ongoingList, upcomingList: upcomingList}
})


export default contestJSON