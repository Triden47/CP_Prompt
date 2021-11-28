// import { useState, useEffect } from 'react'
import { memo } from 'react'

//components
import Card from './Upcoming_OngoingCard/Card.jsx'
import SavedCard from './SavedCard/SavedCard.jsx'

const Cards = (props) => {

    return (
        <div className="Cards">
            {
                props.type === "ongoing" && props.contests.map((contest, index) => {
                    return (<Card details={contest} key={index} started={true}/>)
                })
            }
            {
                props.type === "upcoming" && props.contests.map((contest, index) => {
                    return (<Card details={contest} key={index} started={false}/>)
                })
            }
            {
                props.type === "saved" && props.contests.map((contest, index) => {
                    return (<SavedCard details={contest} key={index}/>)
                })
            }
        </div>
    )
}

export default memo(Cards)