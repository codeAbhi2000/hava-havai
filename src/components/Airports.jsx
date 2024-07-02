import { Add } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AirportsTable from './AirportsListTable'
import AddAirports from './AddAirPorts'
import { addDocument, getDocuments, updateDocument, deleteDocument } from '../firebase'; // Adjust the import path as per your project structure

function Airports() {
    const [openDialog, setOpenDialog] = useState(false)
    const [airports, setAirports] = useState([])

    useEffect(() => {
        fetchAirports()
    }, [])

    const fetchAirports = async () => {
        try {
            const fetchedAirports = await getDocuments('airports'); // Replace 'airports' with your collection name
            setAirports(fetchedAirports);
            console.log(fetchedAirports);
        } catch (error) {
            console.error('Error fetching airports:', error);
        }
    }

   

    const handleDeleteAirport = async (airportId) => {
        try {
            await deleteDocument('airports', airportId); // Replace 'airports' with your collection name
            console.log('Deleted airport with ID:', airportId);
            fetchAirports(); // Refresh the airports list after deleting
        } catch (error) {
            console.error('Error deleting airport:', error);
        }
    }

    const handleEditAirport = async (airportId, updatedAirportData) => {
        try {
            await updateDocument('airports', airportId, updatedAirportData); // Replace 'airports' with your collection name
            console.log('Updated airport with ID:', airportId);
            fetchAirports(); // Refresh the airports list after updating
        } catch (error) {
            console.error('Error updating airport:', error);
        }
    }

    const handleDialogOpen = () => {
        setOpenDialog(prev => !prev)
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
        }}>
            <Stack height={'100%'} width={'100%'} alignItems={'center'} justifyContent={'center'} p={2} spacing={3}>
                <Stack direction={'row'} width={'90%'} justifyContent={'space-between'} >
                    <Typography variant='h5' fontWeight={700} textAlign={'left'}>Airports</Typography>
                    <Button startIcon={<Add />} variant='contained' sx={{ borderRadius: '40px', backgroundColor: 'black', color: 'white' }} onClick={handleDialogOpen}>Add new</Button>
                </Stack>

                <Stack width={'85%'} overflow={'auto'} height={'60vh'} >
                    <AirportsTable airports={airports} onDelete={handleDeleteAirport} onEdit={handleEditAirport} />
                </Stack>
            </Stack>
            {openDialog ? <AddAirports open={openDialog} handleClose={handleDialogOpen} /> : <></>}
        </div>
    )
}

export default Airports;
