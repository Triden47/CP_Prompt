import { useContext } from 'react'
import moment from 'moment'
import { Link, Tooltip } from '@mui/material'

//components
import NoPrev from '../../../images/NoPreview.png'
// import MoreOptions from './MoreOptions';
import Timer from '../Timer';
import { SearchContext } from '../../../context/SearchProvider'
import { SaveContext } from '../../../context/SaveProvider'
import Save from '../Save'

const hideStyle = {
    display: "none"
}


const SavedCard = (props) => {
    const { search } = useContext(SearchContext)
    const { savedEvent } = useContext(SaveContext)

    // useEffect(() => {
    //     console.log(props.details)
    // })

    const days = Math.floor(props.details.duration / 3600 / 24)

    const setDate = ((value) => {
        return moment.utc(value).local().format('ddd DD-MMM hh:mm a')
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
            <div className="card" style={ ((props.details.host).includes(search) && savedEvent.find(event => event.host === props.details.host && event.event === props.details.event) !== undefined) ? {} : hideStyle}>
                <div className="primaryCard">
                    <div className="item1">
                        <Link 
                        color="inherit" 
                        underline="hover"
                        href={props.details.href}
                        target="_blank"
                        >
                            { props.details.event }
                        </Link>
                    </div>
                    <div className="item2">
                        <Tooltip title={props.details.host} arrow>
                            <Link
                            href={`https://www.${props.details.host}`}
                            target="_blank"
                            >
                                <img src={'https://logo.clearbit.com/' + config(props.details.host)} 
                                onError={(e)=>{e.target.onerror = null; e.target.src = NoPrev}}
                                alt="No Preview"/>
                            </Link>
                        </Tooltip>
                    </div>
                    <div className="item3"><p>{ props.started ? "End: " + setDate(props.details.end) : "Start: " + setDate(props.details.start ) }</p></div>  


                    <div className="item4">
                        <Tooltip title="Duration" placement="left" arrow>
                            <p>Dur: { days ? days + " days" : new Date(props.details.duration * 1000).toISOString().substr(11, 5) }</p>
                        </Tooltip>
                    </div>  
                    <div className="item5">
                        <Tooltip title="Time Left" placement="left" arrow>
                            <p>TL: <Timer start_end={props.started ? props.details.end : props.details.start} /></p>
                        </Tooltip>
                    </div>
                    {/* <div className="item6">
                        <MoreOptions website={props.details.host} hide={hideCard}/>
                    </div> */}
                    <div className="item7">
                        <Save host={props.details.host} event={props.details.event} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SavedCard