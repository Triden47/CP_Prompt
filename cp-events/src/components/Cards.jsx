import { useState, useEffect } from 'react'
import Card from './Card.jsx'
import { getContestData } from '../api/api.js'


const Cards = () => {
    const [ contestArray, setContestArray ] = useState([])
    const [ ongoing, setOngoing ] = useState([])
    const [ upcoming, setUpcoming ] = useState([])
    const [ current, setCurrent ] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const contestData = await getContestData()
            //   console.log(data.objects)
            setContestArray(Object.keys(contestData.objects).map(key => {
                return contestData.objects[key]
            }))
        }
        fetchData()
    }, [])

    useEffect(() => {
        const time = new Date(new Date().getTime()).toISOString()
        setOngoing(contestArray.filter(contest => contest.start <= time).sort((first, second) => {
            if(first.end < second.end)
                return -1
            else if(first.end > second.end)
                return 1
            else
                return 0
        }))
        setUpcoming(contestArray.filter(contest => contest.start > time))

    }, [contestArray])

    useEffect(() => {
        // Sort is working correctly store value into current now
        // console.log(ongoing)
        var track = []
        for(let i = 0; i < ongoing.length; i++) {

            let value = ongoing[i].host
            if(track.find(element => element === value) === undefined) {
                const newArr = ongoing.filter(contest => contest.host === ongoing[i].host)
                setCurrent((prev) => [...prev, newArr])
                track.push(value)
            }
        }
    }, [ongoing])

    // useEffect(() => {
    //     console.log(upcoming)
    // }, [upcoming])
    // useEffect(() => {
    //     console.log(current)
    // }, [current])
    return (
        <div className="Cards">
            {
                current.map((contest, index) => {
                    {/* console.log(contest) */}
                    return (<Card details={contest} key={index} started="true"/>)
                })
            }
            {/* <Card/> */}
            {/* <Card/> */}
        </div>
    )
}

export default Cards