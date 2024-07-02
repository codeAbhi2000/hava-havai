import React, { useEffect, useState } from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { getDocumentById } from '../firebase'; // Ensure this function exists and is correctly implemented

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [airportName, setAirportName] = useState('');

  useEffect(() => {
    const fetchAirportName = async () => {
      // Identify if the path contains 'airports' followed by an ID
      const airportIndex = pathnames.indexOf('airports');
      if (airportIndex !== -1 && pathnames[airportIndex + 1]) {
        const airportId = pathnames[airportIndex + 1];
        try {
          const airport = await getDocumentById('airports', airportId);
          setAirportName(airport.name || 'Unknown Airport');
        } catch (error) {
          console.error('Error fetching airport:', error);
        }
      }
    };
    fetchAirportName();
  }, [pathnames]);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb" separator=">">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        let displayValue = value.toUpperCase();

        // Replace the airport ID with the fetched airport name
        if (pathnames[index - 1] === 'airports' && value === pathnames[index]) {
          displayValue = airportName.toUpperCase();
        }

        return last ? (
          <Typography color="textPrimary" key={to}>
            {displayValue}
          </Typography>
        ) : (
          <Link component={RouterLink} to={to} key={to}>
            {displayValue}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
