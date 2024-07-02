import { GridView, Home } from '@mui/icons-material'
import { Box, Stack ,Button} from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

function Aside() {
  return (
    
         <Box
          sx={{
          
            width: "100%", // Use flex basis to ensure proper layout
            height: "100%",
            boxSizing: "border-box", // Ensure padding and border are included in the element's total width and height
          }}
        >
          <Stack alignItems={"center"} spacing={2} height={"100%"}>
            <Box
              width={"80%"}
              sx={{
                // border: "2px solid black",
                height: "20%",
              }}
            >
              <Stack
                alignItems={"self-start"}
                justifyContent={"center"}
                width={"100%"}
                height={"100%"}
              >
                <Button
                  startIcon={<Home />}
                  sx={{
                    color: "black",
                    fontWeight: 600,
                  }}
                >
                  Home
                </Button>
                <Button
                  startIcon={<GridView />}
                  sx={{
                    color: "black",
                    fontWeight: 600,
                  }}
                >
                  Dashboard
                </Button>
              </Stack>
            </Box>
            <Box
              width={"80%"}
              sx={{
                // border: "2px solid black",
                height: "20%",
              }}
            >
              <Stack
                alignItems={"self-start"}
                justifyContent={"center"}
                width={"100%"}
                height={"100%"}
              >
                <Button
                 
                  sx={{
                    color: "black",
                    fontWeight: 600,
                  }}
                >
                  Services
                </Button>
                <Button
                  component={RouterLink}
                  to="/airports"
                  sx={{
                    color: "black",
                    fontWeight: 600,
                  }}
                >
                  Airports
                </Button>
                <Button
                  
                  sx={{
                    color: "black",
                    fontWeight: 600,
                  }}
                >
                  Videos
                </Button>
              </Stack>
            </Box>
            <Box
              width={"80%"}
              sx={{
                // border: "2px solid black",
                height: "30%",
              }}
            >
              <Stack
                alignItems={"self-start"}
                justifyContent={"center"}
                width={"100%"}
                height={"100%"}
              >
                <Button
                  
                  sx={{
                    color: "black",
                    fontWeight: 600,
                  }}
                >
                  Other
                </Button>
                <Button
                  
                  sx={{
                    color: "black",
                    fontWeight: 400,
                  }}
                >
                  List 1
                </Button>
                <Button
                  
                  sx={{
                    color: "black",
                    fontWeight: 400,
                  }}
                >
                  List 2
                </Button>
                <Button
                  
                  sx={{
                    color: "black",
                    fontWeight: 400,
                  }}
                >
                  List 3
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
    
  )
}

export default Aside