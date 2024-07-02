import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import EditAirportDialog from './EditAirportDialog'; // Make sure to import the dialog component

const AirportsTable = ({ airports, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState(null);

  const handleClick = (index) => {
    navigate(`/airports/${index}`);
  };

  const handleEditClick = (airport) => {
    setSelectedAirport(airport);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedAirport(null);
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '100%' }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox size="small" />
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>All Airports</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Country</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Terminals</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {airports.map((airport) => (
            <TableRow key={airport?.id}>
              <TableCell padding="checkbox">
                <Checkbox size="small" />
              </TableCell>
              <TableCell sx={{ padding: '6px' }} onClick={() => handleClick(airport?.id)}>{airport.name}</TableCell>
              <TableCell sx={{ padding: '6px' }}>{airport.country}</TableCell>
              <TableCell sx={{ padding: '6px' }}>{airport.code}</TableCell>
              <TableCell sx={{ padding: '6px' }}>{airport.terminals}</TableCell>
              <TableCell sx={{ padding: '6px' }} align="right">
                <IconButton size="small" onClick={() => handleEditClick(airport)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete(airport?.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedAirport && (
        <EditAirportDialog
          open={editDialogOpen}
          handleClose={handleEditClose}
          airport={selectedAirport}
          onEdit={onEdit}
        />
      )}
    </TableContainer>
  );
};

export default AirportsTable;
