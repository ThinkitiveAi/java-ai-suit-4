import React from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";

function Navbar({ tabValue, setTabValue }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          EMR - Provider Portal
        </Typography>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab label="Dashboard" />
          <Tab label="Scheduling" />
          <Tab label="Patients" />
          <Tab label="Settings" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
