import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Fab, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookIcon from '@mui/icons-material/Book';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//components
import NoPrev from '../images/NoPreview.png'

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 5,
      color: theme.palette.grey[300],
      backgroundColor: "#610094",
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          marginRight: theme.spacing(1),
        },
        '&:hover': {
            backgroundColor: "black",
        },
        '&:active': {
            backgroundColor: "black"
        },
      },
    },
  }));

const Card = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="Card">
            <div className="item1">Codeforces Round #755 Divison II</div>
            <div className="item2">
                <img src={NoPrev} alt="No Preview"/>
            </div>
            <div className="item3"><p>ST:</p></div>  
            <div className="item4"><p>ET:</p></div>
            <div className="item5"><p>Dur:</p></div>  
            <div className="item6"><p>TL:</p></div>
            <div className="item7">
                <Fab size="small" style={{backgroundColor: "inherit", boxShadow: "0 0 0",
                color: "white"}}
                id="demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                // disableElevation
                onClick={handleClick}>
                    <MoreVertIcon/>
                </Fab>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} disableRipple>
                    <BookIcon style={{color: "white"}}/>
                    Bookmark
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                    <DoneAllIcon style={{color: "white"}}/>
                    Subscribe website
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                    <VisibilityOffIcon style={{color: "white"}}/>
                    Hide website
                    </MenuItem>

                </StyledMenu>
            </div>
        </div>
    )
}

export default Card