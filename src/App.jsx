// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MenuAppBar from './components/Navbar';
import Dashboard from './layout/Dashboard';
import { Box } from '@mui/material';
import Airports from './components/Airports';
import AirportDetails from './components/AirportDetails';


const App = () => {
  return (
    <Box sx={{ margin: 0, padding: 0, height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <MenuAppBar />
      
      <Routes>
        <Route path="/" element={<Dashboard />}>
         <Route path="airports" element={<Airports/>}/>
         <Route path="airports/:airportId" element={<AirportDetails />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
