import { useState, useEffect } from 'react'


//components
import NoPrev from '../images/NoPreview.png'
import MoreOptions from './MoreOptions';
import ChildCards from './ChildCards';

const Card = (props) => {
    // console.log(props.details[0])
    console.log(props.started)
    const [ dropDown, setDropDown ] = useState(false)
    useEffect(() => {
      if(props.details.length > 1)
        setDropDown(true)
    }, [])
    const days = Math.floor(props.details[0].duration / 3600 / 24)
    return (
      <div className="card">
        <div className="primaryCard">
            <div className="item1">{ props.details[0].event }</div>
            <div className="item2">
                <img src={NoPrev} alt="No Preview"/>
            </div>
            <div className="item3"><p>{ props.started ? "End: " + props.details[0].end : "Start: " + props.details[0].start }</p></div>  

            <div className="item4"><p>Dur: { days ? days + " days" : new Date(props.details[0].duration * 1000).toISOString().substr(11, 5) }</p></div>  
            <div className="item5"><p>TL: </p></div>
            <div className="item6">
                <MoreOptions/>
            </div>
        </div>
            { dropDown && <ChildCards children={ props.details.filter((element, key) => (key !== 0)) } started={ props.started }/> }
        </div>
    )
}

export default Card