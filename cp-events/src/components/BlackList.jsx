import { useState } from "react";
import { Box, Drawer, List, Divider } from '@mui/material'
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterListIcon from "@mui/icons-material/FilterList";

//components
import ListedWebsites from './ListedWebsites.jsx'

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "start",
    padding: theme.spacing(2, 3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-begin",
}));

export default function TemporaryDrawer() {
    const theme = useTheme();
    const [ state, setState ] = useState(false)

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState(open);
    };

    const list = (anchor) => (
        <Box
            sx={{ width: "80vw" }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >
            <DrawerHeader>
                <div style={{ position: "relative", top: "5px" }}>
                    <IconButton onClick={toggleDrawer(false)}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                    <h3
                        style={{
                            display: "inline",
                            position: "relative",
                            top: "3px",
                            left: "100px",
                        }}
                    >
                        Blacklist
                    </h3>
                </div>
            </DrawerHeader>
            <Divider />
            <ListedWebsites/>
            <Divider />
        </Box>
    );

    return (
        <>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2, ml: 5 }}
                onClick={toggleDrawer(true)}
            >
                <FilterListIcon />
            </IconButton>
            <Drawer
                anchor={"left"}
                open={state}
                onClose={toggleDrawer(false)}
            >
                {list("right")}
                {/* <h1 onClick={() => {props.close(false)}}>Close</h1> */}
            </Drawer>
        </>
    );
}
