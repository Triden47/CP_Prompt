import { useState, useEffect } from 'react'
import moment from 'moment';
import { Link, Tooltip } from '@mui/material';

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
                    <div className="item1">
                        <Link 
                        color="inherit" 
                        underline="hover"
                        href={props.details[0].href}
                        >
                            { props.details[0].event }
                        </Link>
                    </div>
                    <div className="item2">
                        <Tooltip title={props.details[0].host} arrow>
                            <Link
                            href={`https://www.${props.details[0].host}`}
                            >
                                <img src={NoPrev} alt="No Preview"/>
                            </Link>
                        </Tooltip>
                    </div>
                    <div className="item3"><p>{ props.started ? "End: " + moment(props.details[0].end).format('ddd DD-MMM hh:mm a') : "Start: " + moment(props.details[0].start).format('ddd DD-MMM hh:mm a') }</p></div>  

                    <div className="item4">
                        <Tooltip title="Duration" placement="left" arrow>
                            <p>Dur: { days ? days + " days" : new Date(props.details[0].duration * 1000).toISOString().substr(11, 5) }</p>
                        </Tooltip>
                    </div>  
                    <div className="item5">
                        <Tooltip title="Time Left" placement="left" arrow>
                            <p>TL: <Timer start_end={props.started ? props.details[0].end : props.details[0].start} /></p>
                        </Tooltip>
                    </div>
                    <div className="item6">
                        <MoreOptions/>
                    </div>
                    <div className="item7">
                        { dropDown && <CollapsableList children={ props.details.filter((element, key) => (key !== 0)) } handleClick={() => setOpen(!open)} open={open}/> }
                    </div>
                </div>
                 { dropDown && <ChildCards children={ props.details.filter((element, key) => (key !== 0)) } started={ props.started } handleClick={() => setOpen(!open)} open={open}/> }
            </div>
        </>
    )
}

export default Card