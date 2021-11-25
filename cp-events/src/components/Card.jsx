import { useState, useEffect, useContext } from 'react'
import moment from 'moment';
import { Link, Tooltip } from '@mui/material';

//components
import NoPrev from '../images/NoPreview.png'
import MoreOptions from './MoreOptions';
import CollapsableList from './CollapsableList';
import ChildCards from './ChildCards';
import Timer from './Timer';
import { SearchContext } from '../context/SearchProvider.jsx';
import { BwContext } from '../context/BwProvider.jsx'
import Save from './Save';

const hideStyle = {
    display: "none"
}

const Card = (props) => {

    const [ dropDown, setDropDown ] = useState(false)
    const [ open, setOpen ] = useState(false)
    const { search } = useContext(SearchContext)
    const { bw, setBw } = useContext(BwContext)

    useEffect(() => {
        if(props.details.length > 1)
            setDropDown(true)    
    }, [])

    const days = Math.floor(props.details[0].duration / 3600 / 24)

    const setDate = ((value) => {
        return moment.utc(value).local().format('ddd DD-MMM hh:mm a')
    })

    const hideCard = ((websiteId) => {
        setBw((prev) => [...prev, websiteId])
    })

    const config = ((website) => {
        const index = website.indexOf('/')
        if(index === -1)
            return website
        else
            return website.substr(0, index)
    })

    return (
        <>
            <div className="card" style={ (!(props.details[0].host).includes(search) || bw.find(element => element === props.details[0].host) !== undefined) ? hideStyle : {}}>
                <div className="primaryCard">
                    <div className="item1">
                        <Link 
                        color="inherit" 
                        underline="hover"
                        href={props.details[0].href}
                        target="_blank"
                        >
                            { props.details[0].event }
                        </Link>
                    </div>
                    <div className="item2">
                        <Tooltip title={props.details[0].host} arrow>
                            <Link
                            href={`https://www.${props.details[0].host}`}
                            target="_blank"
                            >
                                <img src={'https://logo.clearbit.com/' + config(props.details[0].host)} 
                                onError={(e)=>{e.target.onerror = null; e.target.src = NoPrev}}
                                alt="No Preview"/>
                            </Link>
                        </Tooltip>
                    </div>
                    <div className="item3"><p>{ props.started ? "End: " + setDate(props.details[0].end) : "Start: " + setDate(props.details[0].start ) }</p></div>  


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
                    <div className="item7">
                        <MoreOptions website={props.details[0].host} hide={hideCard}/>
                    </div>
                    {
                        !props.started && 
                        <div className="item6">
                            <Save host={props.details[0].host} event={props.details[0].event} />
                        </div>
                    }
                    <div className="item8">
                        { dropDown && <CollapsableList children={ props.details.filter((element, key) => (key !== 0)) } handleClick={() => setOpen(!open)} open={open}/> }
                    </div>
                </div>
                 { dropDown && <ChildCards children={ props.details.filter((element, key) => (key !== 0)) } started={ props.started } handleClick={() => setOpen(!open)} open={open}/> }
            </div>
        </>
    )
}

export default Card