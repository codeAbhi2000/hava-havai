import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
  IconButton
} from '@mui/material';
import { addDocument, uploadImageAndGetURL } from '../firebase';
import { Add } from '@mui/icons-material';

const AddAirports = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    code: '',
    country: 'India',
    name: '',
    services: [
      {
        category: '',
        description: '',
        proof: '',
        'service-name': '',
        'sub-category': '',
      },
    ],
    'terminal-details': [
      { name: 'Terminal 1', description: '', image: '' },
      { name: 'Terminal 2', description: '', image: '' },
    ],
    terminals: 3,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTerminalChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTerminals = formData['terminal-details'].map((terminal, i) => 
      i === index ? { ...terminal, [name]: value } : terminal
    );
    setFormData((prevData) => ({
      ...prevData,
      'terminal-details': updatedTerminals,
    }));
  };

  const handleFileChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await uploadImageAndGetURL(file, 'terminal-images');
      const updatedTerminals = formData['terminal-details'].map((terminal, i) => 
        i === index ? { ...terminal, image: imageUrl } : terminal
      );
      setFormData((prevData) => ({
        ...prevData,
        'terminal-details': updatedTerminals,
      }));
    }
  };

  const addTerminal = () => {
    setFormData((prevData) => ({
      ...prevData,
      'terminal-details': [...prevData['terminal-details'], { name: '', description: '', image: '' }],
    }));
  };

  const handleSubmit = async () => {
    try {
      await addDocument("airports",formData);
      handleClose();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Airport</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Terminals"
            name="terminals"
            value={formData.terminals}
            onChange={handleChange}
            type="number"
            fullWidth
          />
          <Stack spacing={1}>
            {formData['terminal-details'].map((terminal, index) => (
              <Stack key={index} spacing={2}>
                <TextField
                  label={`Terminal ${index + 1} Name`}
                  name="name"
                  value={terminal.name}
                  onChange={(e) => handleTerminalChange(index, e)}
                  fullWidth
                />
                <TextField
                  label={`Terminal ${index + 1} Description`}
                  name="description"
                  value={terminal.description}
                  onChange={(e) => handleTerminalChange(index, e)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(index, e)}
                  />
                </Button>
                {terminal.image && (
                  <img src={terminal.image} alt={`Terminal ${index + 1}`} width="100%" />
                )}
              </Stack>
            ))}
            <Button variant="outlined" onClick={addTerminal} startIcon={<Add />}>
              Add Terminal
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose} sx={{ color: 'black', borderRadius: '20px', border: "2px solid black" }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: '20px', color: 'white', backgroundColor: "black" }}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAirports;
