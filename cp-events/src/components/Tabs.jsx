import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

//components
import Cards from './Cards';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ position: "fixed", top: "50px", zIndex: "5", width: "min(100%, 450px)", borderBottom: "1px solid black" }}>
        <Tabs 
        value={value} 
        onChange={handleChange} variant="fullWidth" 
        aria-label="basic tabs example"
        style={{ backgroundColor: "#3F0071", color: "white" }}
        indicatorColor="secondary"
        textColor="inherit"
        >
          <Tab label="Ongoing" {...a11yProps(0)} />
          <Tab label="Upcoming" {...a11yProps(1)} />
          <Tab label="Saved" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Cards type="ongoing"/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Cards type="upcoming"/>
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Saved
      </TabPanel> */}
    </Box>
  );
}
