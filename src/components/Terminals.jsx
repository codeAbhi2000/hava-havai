import {
    Box,
    Stack,
    Button,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControlLabel,
    FormLabel,
    Select,
    MenuItem,
    InputLabel,
    Switch,
  } from "@mui/material";
  import React, { useState } from "react";
  import Terminal from "../assets/terminal.jpg";
  import { FileUpload } from "@mui/icons-material";
  import AlertDialog from "./AlertDialog";
  import { updateDocument, uploadImageAndGetURL, getDocumentById } from '../firebase';
  
  function Terminals({ airport }) {
    const [expanded, setExpanded] = useState(false);
    const [lostFoundData, setLastFoundData] = useState({
      name: "lost & found",
      category: "",
      subCategory: "",
      description: "",
    });
  
    const [open, setOpen] = useState(false);
  
    const handleDialog = () => {
      setOpen(prev => !prev);
    };
  
    const handleExpansion = () => {
      setExpanded(prevExpanded => !prevExpanded);
    };
  
    const handleServiceChange = (field, value) => {
      setLastFoundData(prevData => ({
        ...prevData,
        [field]: value,
      }));
    };
  
    const handleServiceSave = async () => {
      try {
        const updatedServices = airport.services.map(service =>
          service.name === lostFoundData.name ? lostFoundData : service
        );
  
        await updateDocument('airports', airport.id, { services: updatedServices });
        alert("Service updated successfully!");
      } catch (error) {
        console.error('Error updating service: ', error);
      }
    };
  
    const inputHeight = "40px"; // Define a consistent height for all inputs
  
    return (
      <Box
        sx={{
          width: "100%",
          height: "53vh",
          overflow: "auto",
          py: 1,
        }}
      >
        <Stack
          width={"100%"}
          height={"100%"}
          spacing={2}
          alignItems={"start"}
          justifyContent={"center"}
        >
          <Stack
            direction={"row"}
            width={"100%"}
            alignItems={"center"}
            spacing={2}
            justifyContent={"start"}
          >
            {airport && Array.isArray(airport['terminal-details']) && airport['terminal-details'].map((terminal, index) => (
              <Box
                key={index}
                border="1px solid grey"
                borderRadius="8px"
                width="30%"
                height="85%"
              >
                <Stack
                  direction={"row"}
                  width={"100%"}
                  height={"100%"}
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Box
                    sx={{
                      width: "45%",
                      height: "100%",
                      borderRadius: "20px",
                    }}
                  >
                    <Stack
                      alignItems={"center"}
                      justifyContent={"center"}
                      width={"100%"}
                      height={"100%"}
                    >
                      <img
                        src={Terminal}
                        alt={terminal.name}
                        width={"100%"}
                        height={"100%"}
                      />
                    </Stack>
                  </Box>
                  <Box
                    sx={{
                      width: "55%",
                      height: "100%",
                    }}
                  >
                    <Stack
                      alignItems={"center"}
                      justifyContent={"center"}
                      width={"100%"}
                      height={"100%"}
                    >
                      <Typography>{terminal.name}</Typography>
                      <Typography>
                        {terminal.description}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            ))}
            <Button
              onClick={handleDialog}
              variant="outlined"
              sx={{ borderRadius: "20px", color: "black", borderColor: "black" }}
            >
              + Add Terminal
            </Button>
          </Stack>
          <Stack
            width={"100%"}
            alignItems={"center"}
            spacing={2}
            justifyContent={"start"}
          >
            <Stack width={"100%"} alignItems={"start"}>
              <Typography variant="h5" fontWeight={600}>
                Services
              </Typography>
            </Stack>
            <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
              <Accordion expanded={expanded} onChange={handleExpansion}>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>Lost&Found</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <form>
                      <Stack
                        direction={"row"}
                        width={"100%"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        spacing={2}
                      >
                        <Stack
                          width={"100%"}
                          flexWrap={"wrap"}
                          direction={"row"}
                          spacing={3}
                          alignItems={"center"}
                          justifyContent={"start"}
                        >
                          <Stack>
                            <FormLabel htmlFor="service-name">
                              Service Name
                            </FormLabel>
                            <input
                              type="text"
                              id="service-name"
                              defaultValue={lostFoundData.name}
                              disabled
                              style={{ height: inputHeight }}
                            />
                          </Stack>
                          <Stack>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                              labelId="category"
                              id="category"
                              value={lostFoundData.category}
                              onChange={(e) =>
                                handleServiceChange("category", e.target.value)
                              }
                              sx={{ height: inputHeight }}
                            >
                              <MenuItem value={10}>Option 1</MenuItem>
                              <MenuItem value={20}>Option 2</MenuItem>
                              <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                          </Stack>
                          <Stack>
                            <InputLabel id="sub-category">
                              Sub category
                            </InputLabel>
                            <Select
                              labelId="sub-category"
                              id="sub-category"
                              value={lostFoundData.subCategory}
                              onChange={(e) =>
                                handleServiceChange("subCategory", e.target.value)
                              }
                              sx={{ height: inputHeight }}
                            >
                              <MenuItem value={10}>Option 1</MenuItem>
                              <MenuItem value={20}>Option 2</MenuItem>
                              <MenuItem value={30}>Option 3</MenuItem>
                            </Select>
                          </Stack>
                          <Stack>
                            <Button
                              variant="contained"
                              component="label"
                              startIcon={<FileUpload />}
                              sx={{
                                height: inputHeight,
                                borderRadius: "20px",
                                color: "black",
                                backgroundColor: "grey",
                              }}
                            >
                              Upload Image
                              <input type="file" accept="image/*" hidden />
                            </Button>
                          </Stack>
                          <Stack direction={"row"}>
                            <FormControlLabel
                              control={<Switch />}
                              label="Show image"
                            />
                          </Stack>
                          <Stack>
                            <FormLabel htmlFor="desc">Description</FormLabel>
                            <input
                              type="text"
                              id="desc"
                              value={lostFoundData.description}
                              onChange={(e) =>
                                handleServiceChange("description", e.target.value)
                              }
                              placeholder="type here"
                              style={{ height: inputHeight }}
                            />
                          </Stack>
                        </Stack>
                        <Stack>
                          <Button
                            sx={{
                              height: inputHeight,
                              color: "white",
                              backgroundColor: "black",
                              borderRadius: "20px",
                            }}
                            onClick={handleServiceSave}
                          >
                            Save
                          </Button>
                        </Stack>
                      </Stack>
                    </form>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Lounge</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                    eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <Typography>Money Exchange</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                    eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Stack>
        </Stack>
        {open && (
          <AlertDialog
            open={open}
            handleClose={handleDialog}
            airportId={airport?.id}
          />
        )}
      </Box>
    );
  }
  
  export default Terminals;
  