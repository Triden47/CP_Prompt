import axios from 'axios'
const url = 'http://localhost:5000'

export const getContestData = async() => {
    try {
        const contestData = await axios.get(`${url}/contest`)
        console.log(contestData.data)
        return contestData.data
    } catch(error) {
        console.log('Error while calling getContestData api', error)
    }
}