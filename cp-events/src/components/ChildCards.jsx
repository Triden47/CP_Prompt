import { useState } from 'react'
import { Collapse, Divider, Badge, Zoom } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

//components
import MoreOptions from "./MoreOptions"

const ChildCards = (props) => {

    const [open, setOpen] = useState(false)
    const days = Math.floor(props.children.duration / 3600 / 24)

    return (
        <div>
            <div style={{ position: "relative", left: "200px" }}>
            <Zoom
                in={!open}
                // timeout="1000ms"
                >
                    <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                    >
                        {!open && <Badge badgeContent={props.children.length} color="secondary"><KeyboardArrowDownIcon style={{ color: "white" }}/></Badge> }
                    </IconButton>
                </Zoom>
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {
                    (props.children).map(child => (
                        <>
                            <Divider light style={{ border: "0.1px solid", margin: "10px" }}/>
                            <div className="primaryCard">
                                <div className="item1">{ child.event }</div>
                                <div className="item2">
                                <IconButton
                                    aria-label="expand row"
                                    size="large"
                                    onClick={() => setOpen(!open)}
                                    >
                                        {open && <KeyboardArrowUpIcon style={{ color: "white" }}/>}
                                    </IconButton>
                                </div>
                                <div className="item3"><p>{ props.started ? "End: " + child.end : "Start: " + child.start }</p></div>  
                                {/* <div className="item4"><p>ET: { props.details[0].end }</p></div> */}
                                <div className="item4"><p>Dur: { days ? days + " days" : new Date(child.duration * 1000).toISOString().substr(11, 5) }</p></div>  
                                <div className="item5"><p>TL: </p></div>
                                <div className="item6">
                                    <MoreOptions/>
                                </div>
                            </div>
                        </>
                    ))
                }
            </Collapse>
        </div>
    )
}

export default ChildCards