import { Zoom, Badge } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const CollapsableList = ((props) => {
    // const [open, setOpen] = useState(false)
    return (
        <div>
        {
            !props.open ? 
                <Zoom in={!props.open}>
                    <IconButton
                    aria-label="expand row"
                    size="small"
                    style={{ position: "relative", top: "3px" }}
                    onClick={() => props.handleClick()}
                    >
                        <Badge badgeContent={props.children.length} color="secondary"><KeyboardArrowDownIcon style={{ color: "white" }}/></Badge>
                    </IconButton>
                </Zoom> : 
                <IconButton
                    aria-label="collapse row"
                    size="small"
                    onClick={() => props.handleClick()}
                    >
                        <KeyboardArrowUpIcon style={{ color: "white" }}/>
                </IconButton>
        }
            
        </div>
    )
})

export default CollapsableList