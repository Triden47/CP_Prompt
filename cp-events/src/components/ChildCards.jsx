import { Collapse, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

//components
import MoreOptions from "./MoreOptions"
import Timer from './Timer';

const ChildCards = (props) => {

    // const [open, setOpen] = useState(true)

    const days = Math.floor(props.children.duration / 3600 / 24)

    // useEffect(() => {
    //     props.handleClick()
    // }, [open])

    return (
        <div>
            <Collapse in={props.open} timeout="auto">
                {
                    (props.children).map((child, index) => (
                        <div key={index}>
                            <Divider light style={{ border: "0.1px solid", margin: "10px" }}/>
                            <div className="primaryCard">
                                <div className="item1">{ child.event }</div>
                                <div className="item2">
                                <IconButton
                                    aria-label="expand row"
                                    size="large"
                                    onClick={() => props.handleClick()}
                                    >
                                        <KeyboardArrowUpIcon style={{ color: "white" }}/>
                                    </IconButton>
                                </div>
                                <div className="item3"><p>{ props.started ? "End: " + child.end : "Start: " + child.start }</p></div>  
                                {/* <div className="item4"><p>ET: { props.details[0].end }</p></div> */}
                                <div className="item4"><p>Dur: { days ? days + " days" : new Date(child.duration * 1000).toISOString().substr(11, 5) }</p></div>  
                                <div className="item5">
                                    <p>Time Left: <Timer start_end={props.started ? child.end : child.start} /></p>
                                </div>
                                <div className="item6">
                                    <MoreOptions secondary="true"/>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Collapse>
        </div>
    )
}

export default ChildCards