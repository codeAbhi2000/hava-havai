import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Stack, Button, TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material';
import Terminals from './Terminals';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const AirportDetailsTabs = ({ airport }) => {
    // console.log("Tabs",airport);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' ,height : '100%'}}>
      <Tabs value={value} onChange={handleChange} aria-label="airport details tabs">
        <Tab label="Terminals" />
        <Tab label="transport" />
        <Tab label="Contact Details" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Terminals airport={airport}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        
      </TabPanel>
    </Box>
  );
};

export default AirportDetailsTabs;
 