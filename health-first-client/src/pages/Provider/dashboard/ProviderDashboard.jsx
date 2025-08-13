import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import Navbar from "./components/Navbar";
import DashboardTab from "./components/DashboardTab";
import SchedulingTab from "./components/SchedulingTab";
import PatientsTab from "./components/PatientsTab";
import SettingsTab from "./components/SettingsTab";

function ProviderDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState("");

  return (
    <Box>
      <Navbar tabValue={tabValue} setTabValue={setTabValue} />

      <Container sx={{ marginTop: "20px" }}>
        {/* Conditional rendering of tabs */}
        {tabValue === 0 && <DashboardTab />}
        {tabValue === 1 && <SchedulingTab />}
        {tabValue === 2 && <PatientsTab />}
        {tabValue === 3 && (
          <SettingsTab
            selectedProvider={selectedProvider}
            setSelectedProvider={setSelectedProvider}
          />
        )}
      </Container>
    </Box>
  );
}

export default ProviderDashboard;
