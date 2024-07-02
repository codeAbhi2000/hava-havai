// layout/Dashboard.js
import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { GridView, Home } from "@mui/icons-material";
import Aside from "../components/Aside";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        overflow: "hidden", // Prevents overflow
      }}
    >
      <Stack direction="row" width="100%" height="100%" spacing={1}>
      <Box
          sx={{
            // border: "2px solid red",
            width: "20%", // Use flex basis to ensure proper layout
            height: "100%",
            boxSizing: "border-box", // Ensure padding and border are included in the element's total width and height
          }}
        >

       <Aside/>
        </Box>
        <Box
          sx={{
            // border: "2px solid blue",
            width: "80%", // Use flex basis to ensure proper layout
            height: "100%",
            display:'flex',
            justifyContent : 'center',
            boxSizing: "border-box", // Ensure padding and border are included in the element's total width and height
          }}
        >
            <Outlet/>
        </Box>
      </Stack>
    </Box>
  );
}

export default Dashboard;
