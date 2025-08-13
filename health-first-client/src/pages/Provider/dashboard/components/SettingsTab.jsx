import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";

function SettingsTab({ selectedProvider, setSelectedProvider }) {
  return (
    <Box>
      {/* Provider Selection */}
      <Typography variant="h6" gutterBottom>
        Provider Availability - Select Provider
      </Typography>
      <TextField
        select
        label="Select Provider"
        value={selectedProvider}
        onChange={(e) => setSelectedProvider(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
        <MenuItem value="Dr. Johnson">Dr. Johnson</MenuItem>
        <MenuItem value="Dr. Lee">Dr. Lee</MenuItem>
      </TextField>

      {/* Set Availability */}
      <Typography variant="h6" gutterBottom mt={4}>
        Provider Availability - Set Availability
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            label="Select Date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="time"
            label="Start Time"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="time"
            label="End Time"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Save Availability
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SettingsTab;
