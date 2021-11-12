import { useEffect } from 'react'
import Card from './Card.jsx'
import { getContestData } from '../api/api.js'


const Cards = () => {

    useEffect(() => {
        const fetchData = async () => {
          const data = await getContestData()
          if(data === Array)
            console.log("yes")
          else
            console.log('no')
        }
        fetchData()
    }, [])
    return (
        <div className="Cards">
            <Card/>
            <Card/>
        </div>
    )
}

export default Cards