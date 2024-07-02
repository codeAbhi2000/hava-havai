import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { FileUpload } from "@mui/icons-material";
import { updateDocument, uploadImageAndGetURL, getDocumentById } from '../firebase';

export default function AlertDialog({ open, handleClose, airportId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    console.log("Selected file:", file); // Debugging: Check if file is being selected
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImageAndGetURL(imageFile, 'terminal-images');
        console.log("Image URL:", imageUrl); // Debugging: Check if image URL is obtained
      }

      const terminal = {
        name: title,
        description,
        image: imageUrl,
      };

      // Fetch current airport data
      const airportData = await getDocumentById('airports', airportId);

      // Add new terminal to the existing terminals array
      const updatedTerminals = [...airportData['terminal-details'], terminal];

      // Update the airport document with the new terminal details
      await updateDocument('airports', airportId, { 'terminal-details': updatedTerminals , "terminals" : (parseInt(airportData?.terminals)+1).toString() });
      alert("Terminal Added")
      handleClose(); // Close the dialog after submission
    } catch (error) {
      console.error('Error adding terminal: ', error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Terminal Details</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
            direction={"row"}
            spacing={2}
          >
            <Stack alignItems={"center"} justifyContent={"center"}>
              <Button
                variant="contained"
                component="label"
                startIcon={<FileUpload />}
                sx={{
                  borderRadius: "20px",
                  color: "black",
                  backgroundColor: "grey",
                }}
              >
                Upload Image
                <input type="file" accept="image/*" hidden onChange={handleFileChange} />
              </Button>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={0.5}
            >
              <Button
                onClick={handleClose}
                sx={{
                  color: "black",
                  border: "2px solid grey",
                  borderRadius: "20px",
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="outlined"
                sx={{
                  color: "black",
                  border: "2px solid black",
                  borderRadius: "20px",
                }}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
