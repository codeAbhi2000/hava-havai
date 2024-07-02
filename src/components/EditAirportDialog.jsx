import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Stack
} from '@mui/material';

const EditAirportDialog = ({ open, handleClose, airport, onEdit }) => {
  const [airportData, setAirportData] = useState({
    name: '',
    country: '',
    code: '',
    terminals: '',
  });

  useEffect(() => {
    if (airport) {
      setAirportData(airport);
    }
  }, [airport]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAirportData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onEdit(airport.id, airportData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Airport</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Name"
            value={airportData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="country"
            label="Country"
            value={airportData.country}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="code"
            label="Code"
            value={airportData.code}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="terminals"
            label="Terminals"
            value={airportData.terminals}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAirportDialog;
