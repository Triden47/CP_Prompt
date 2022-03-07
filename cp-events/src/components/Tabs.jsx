import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//components
import Cards from "./Cards/Cards";
import { SaveContext } from "../context/SaveProvider";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs = ({ contestData }) => {
  const [value, setValue] = useState(0);
  const { savedEvent, setSavedEvent } = useContext(SaveContext);

  const [upcoming, setUpcoming] = useState([]);
  const [ongoingList, setOngoingList] = useState([]);
  const [upcomingList, setUpcomingList] = useState([]);

  useEffect(() => {
    setOngoingList(contestData.ongoingList);
    setUpcomingList(contestData.upcomingList);
    setUpcoming(contestData.upcoming);
  }, []);

  useEffect(() => {
    console.log(upcoming);
    if (upcoming.length > 0) {
      setSavedEvent(
        savedEvent.filter((element) => {
          return (
            upcoming.find((contests) => {
              return (
                contests.host === element.host &&
                contests.event === element.event
              );
            }) !== undefined
          );
        })
      );
    }
  }, [upcoming]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        style={{
          position: "fixed",
          top: "55px",
          zIndex: "5",
          width: "min(100%, 450px)",
          borderBottom: "1px solid black",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="basic tabs example"
          style={{ backgroundColor: "rgb(50, 80, 133)", color: "white" }}
          indicatorColor="primary"
          textColor="inherit"
        >
          <Tab label="Ongoing" {...a11yProps(0)} />
          <Tab label="Upcoming" {...a11yProps(1)} />
          <Tab label="Saved" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <div style={value !== 0 ? { display: "none" } : {}}>
        <Cards contests={ongoingList} type="ongoing" />
      </div>
      <div style={value !== 1 ? { display: "none" } : {}}>
        <Cards contests={upcomingList} type="upcoming" />
      </div>
      <div style={value !== 2 ? { display: "none" } : {}}>
        <Cards contests={upcoming} type="saved" />
      </div>
    </Box>
  );
};

export default BasicTabs;
