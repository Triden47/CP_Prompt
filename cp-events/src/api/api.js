import axios from 'axios'
const url = 'https://pure-oasis-32759.herokuapp.com/'

export const getContestData = async() => {
    try {
        const contestData = await axios.get(`${url}`)
        // console.log(contestData.data)
        return contestData.data
    } catch(error) {
        console.log('Error while calling getContestData api', error)
    }
}