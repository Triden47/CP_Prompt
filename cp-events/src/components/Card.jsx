import { useState, useEffect } from 'react'


//components
import NoPrev from '../images/NoPreview.png'
import MoreOptions from './MoreOptions';
import CollapsableList from './CollapsableList';
import ChildCards from './ChildCards';
import Timer from './Timer';

const Card = (props) => {

    const [ dropDown, setDropDown ] = useState(false)
    const [ open, setOpen ] = useState(false)

    useEffect(() => {
      if(props.details.length > 1)
        setDropDown(true)
    }, [])

    const days = Math.floor(props.details[0].duration / 3600 / 24)

    return (
        <>
            <div className="card">
                <div className="primaryCard">
                    <div className="item1">{ props.details[0].event }</div>
                    <div className="item2">
                        <img src={NoPrev} alt="No Preview"/>
                    </div>
                    <div className="item3"><p>{ props.started ? "End: " + props.details[0].end : "Start: " + props.details[0].start }</p></div>  

                    <div className="item4"><p>Dur: { days ? days + " days" : new Date(props.details[0].duration * 1000).toISOString().substr(11, 5) }</p></div>  
                    <div className="item5">
                        <p>Time Left: <Timer start_end={props.started ? props.details[0].end : props.details[0].start} /></p>
                    </div>
                    <div className="item6">
                        <MoreOptions/>
                    </div>
                    <div className="item7">
                        {(dropDown && !open) && <CollapsableList children={ props.details.filter((element, key) => (key !== 0)) } handleClick={() => setOpen(!open)} open={open}/>}
                    </div>
                </div>
                 { (dropDown) && <ChildCards children={ props.details.filter((element, key) => (key !== 0)) } started={ props.started } handleClick={() => setOpen(!open)} open={open}/> }
            </div>
        </>
    )
}

export default Card