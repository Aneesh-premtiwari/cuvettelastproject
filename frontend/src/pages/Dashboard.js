import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png"; // Add your logo image path here

const Dashboard = () => {
  return (
    <Box display="flex" height="100vh">
      <Box
        width="200px"
        bgcolor="#f4f4f4"
        p={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Box display="flex" alignItems="center" mb={4}>
          <img src={logo} alt="logo" style={{ width: 40, marginRight: 10 }} />
          <Typography variant="h6">App</Typography>
        </Box>
        <List>
          <ListItem button component={Link} to="board">
            <ListItemText primary="Board" />
          </ListItem>
          <ListItem button component={Link} to="analytics">
            <ListItemText primary="Analytics" />
          </ListItem>
          <ListItem button component={Link} to="settings">
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Box>
      <Box flex={1} p={2}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
