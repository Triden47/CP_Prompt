import { useState, useEffect } from 'react'

//components
import Card from './Card.jsx'
import SavedCard from './SavedCard.jsx'

const Cards = (props) => {
    const [ contestArray, setContestArray ] = useState([])
    const [ ongoing, setOngoing ] = useState([])
    const [ upcoming, setUpcoming ] = useState([])
    const [ ongoingList, setOngoingList ] = useState([])
    const [ upcomingList, setUpcomingList ] = useState([])

    useEffect(() => {
        // const fetchData = () => {
            // console.log(1)
            setContestArray(props.contests)
        // }
        // fetchData()
    }, [props.contests])

    useEffect(() => {
        // console.log(contestArray)
        const time = new Date(new Date().getTime()).toISOString()
        setOngoing(contestArray.filter(contest => contest.start <= time).sort((first, second) => {
            if(first.end < second.end)
                return -1
            else if(first.end > second.end)
                return 1
            else
                return 0
        }))
        setUpcoming(contestArray.filter(contest => contest.start > time).sort((first, second) => {
            if(first.start < second.start)
                return -1
            else if(first.start > second.start)
                return 1
            else
                return 0
        }))

    }, [contestArray])

    useEffect(() => {

        var track = []
        for(let i = 0; i < ongoing.length; i++) {

            let value = ongoing[i].host
            if(track.find(element => element === value) === undefined) {
                const newArr = ongoing.filter(contest => contest.host === ongoing[i].host)
                setOngoingList((prev) => [...prev, newArr])
                track.push(value)
            }
        }
    }, [ongoing])

    useEffect(() => {

        var track = []
        for(let i = 0; i < upcoming.length; i++) {

            let value = upcoming[i].host
            if(track.find(element => element === value) === undefined) {
                const newArr = upcoming.filter(contest => contest.host === upcoming[i].host)
                setUpcomingList((prev) => [...prev, newArr])
                track.push(value)
            }
        }
    }, [upcoming])

    return (
        <div className="Cards">
            {
                props.type === "ongoing" && ongoingList.map((contest, index) => {
                    return (<Card details={contest} key={index} started={true}/>)
                })
            }
            {
                props.type === "upcoming" && upcomingList.map((contest, index) => {
                    return (<Card details={contest} key={index} started={false}/>)
                })
            }
            {
                props.type === "saved" && upcoming.map((contest, index) => {
                    return (<SavedCard details={contest} key={index}/>)
                })
            }
        </div>
    )
}

export default Cards