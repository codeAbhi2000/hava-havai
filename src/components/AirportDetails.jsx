import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Stack } from '@mui/material';
import Breadcrumbs from './Breadcrumbs';
import AirportDetailsTabs from './AirportDetailsTabs';
import { getDocumentById } from '../firebase'; // Adjust path as per your project structure

function AirportDetails() {
  const { airportId } = useParams();
  const [airport, setAirport] = useState(null);

  useEffect(() => {
    const fetchAirport = async () => {
      try {
        // console.log("Fetching airport with ID:", airportId);
        const airportData = await getDocumentById('airports', airportId);
        // console.log("Airport Data:", airportData); // Log airportData for debugging
        if (airportData) {
          setAirport(airportData);
        } else {
          console.error(`Airport with ID ${airportId} not found`);
        }
      } catch (error) {
        console.error('Error fetching airport:', error);
      }
    };

    fetchAirport();
  }, [airportId]);

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
    }}>
      <Stack width={'100%'} height={'100%'} alignItems={'center'} justifyContent={'center'} spacing={2}>
        <Stack width={'90%'} alignItems={'start'} justifyContent={'center'}>
          <Breadcrumbs />
        </Stack>
        <Stack width={'90%'} alignItems={'start'} justifyContent={'center'}>
          <Typography variant='h4' fontWeight={600}>{airport?.name}</Typography>
        </Stack>
        <Stack width={'90%'} alignItems={'start'} justifyContent={'center'}>
          <AirportDetailsTabs airport={airport} />
        </Stack>
      </Stack>
    </Box>
  );
}

export default AirportDetails;
