import { useState } from "react";
import { Box, Drawer, Divider } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterListIcon from "@mui/icons-material/FilterList";

//components
import ListedWebsites from "./ListedWebsites";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "start",
  padding: theme.spacing(2, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-begin",
}));

export default function TemporaryDrawer() {
  const theme = useTheme();
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const list = () => (
    <Box sx={{ width: "80vw" }} role="presentation">
      <DrawerHeader
        sx={{ backgroundColor: "rgb(50, 80, 133)", height: "70px" }}
      >
        <div style={{ position: "relative", top: "5px" }}>
          <IconButton
            onClick={toggleDrawer(false)}
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{ color: "white" }} />
            ) : (
              <ChevronRightIcon style={{ color: "white" }} />
            )}
          </IconButton>
          <h2
            style={{
              display: "inline",
              position: "relative",
              top: "3px",
              left: "100px",
            }}
          >
            Blacklist
          </h2>
        </div>
      </DrawerHeader>
      <Divider sx={{ backgroundColor: "rgb(18, 15, 24)" }} />
      <ListedWebsites />
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
        PaperProps={{
          sx: {
            backgroundColor: "rgb(18, 15, 24)",
            color: "white",
          },
        }}
      >
        {list("right")}
      </Drawer>
    </>
  );
}
