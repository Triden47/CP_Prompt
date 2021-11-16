import { Zoom, Badge } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CollapsableList = ((props) => {
    // const [open, setOpen] = useState(false)
    return (
        <div>
            <Zoom in={!props.open}>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => props.handleClick()}
                >
                    <Badge badgeContent={props.children.length} color="secondary"><KeyboardArrowDownIcon style={{ color: "white" }}/></Badge>
                </IconButton>
            </Zoom>
        </div>
    )
})

export default CollapsableList