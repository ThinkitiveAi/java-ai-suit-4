import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

function DashboardTab() {
  return (
    <Grid container spacing={2}>
      {[
        { title: "Total Patients", value: 120 },
        { title: "Upcoming Appointments", value: 8 },
        { title: "Pending Lab Results", value: 5 },
      ].map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="h4">{item.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Performance Chart (Dummy)</Typography>
            <Box
              height={200}
              bgcolor="#f0f0f0"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Chart Placeholder
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DashboardTab;
