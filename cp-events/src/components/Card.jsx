import { useState, useEffect, useContext } from 'react'
import moment from 'moment';
import { Link, Tooltip } from '@mui/material';

//components
import NoPrev from '../images/NoPreview.png'
import MoreOptions from './MoreOptions';
import CollapsableList from './CollapsableList';
import ChildCards from './ChildCards';
import Timer from './Timer';
import { SearchContext } from '../context/SearchProvider';
/* global chrome */

const Card = (props) => {

    const [ dropDown, setDropDown ] = useState(false)
    const [ open, setOpen ] = useState(false)
    const { search } = useContext(SearchContext)


    useEffect(() => {
      if(props.details.length > 1)
        setDropDown(true)
    }, [])

    const days = Math.floor(props.details[0].duration / 3600 / 24)

    const setDate = ((value) => {
        return moment.utc(value).local().format('ddd DD-MMM hh:mm a')
    })

    const hideCard = ((websiteId) => {
        chrome.storage.sync.get('hiddenWebsites', function (result) {
            // the input argument is ALWAYS an object containing the queried keys
            // so we select the key we need
            var websites = result.hiddenWebsites;
            if(typeof websites === 'undefined')
                websites = []
            websites.push(websiteId);
            // set the new array value to the same key
            chrome.storage.sync.set({hiddenWebsites: websites}, function () {
                // you can use strings instead of objects
                // if you don't  want to define default values
                
                    console.log(result.hiddenWebsites)
            });
        });
    })

    return (
        <>
            <div className="card" style={ !(props.details[0].host).includes(search) ? {display: "none"} : {}}>
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
                    <div className="item6">
                        <MoreOptions website={props.details[0].host} hide={hideCard}/>
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