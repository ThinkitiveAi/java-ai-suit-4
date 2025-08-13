import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Divider,
} from "@mui/material";

function AddAppointmentModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    patient: "",
    dob: "",
    contact: "",
    mode: "",
    provider: "",
    type: "",
    amount: "",
    dateTime: "",
    reason: "",
  });

  const appointmentModes = ["In-person", "Video Call", "Home Visit"];
  const providers = ["Dr. Smith", "Dr. Johnson", "Dr. Lee"];
  const appointmentTypes = ["Consultation", "Follow-up", "Physical Exam"];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("New Appointment:", formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Schedule New Appointment
      </DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Patient Name */}
          <TextField
            label="Patient Name"
            placeholder="Enter full name"
            value={formData.patient}
            onChange={(e) => handleChange("patient", e.target.value)}
            fullWidth
          />

          {/* Date of Birth */}
          <TextField
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          {/* Contact Number */}
          <TextField
            label="Contact Number"
            placeholder="+1-555-123-4567"
            value={formData.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
            fullWidth
          />

          {/* Appointment Mode */}
          <RadioGroup
            row
            value={formData.mode}
            onChange={(e) => handleChange("mode", e.target.value)}
          >
            {appointmentModes.map((m) => (
              <FormControlLabel
                key={m}
                value={m}
                control={<Radio />}
                label={m}
              />
            ))}
          </RadioGroup>

          {/* Provider */}
          <TextField
            select
            label="Provider"
            value={formData.provider}
            onChange={(e) => handleChange("provider", e.target.value)}
            fullWidth
          >
            <MenuItem value="">Select Provider</MenuItem>
            {providers.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </TextField>

          {/* Appointment Type */}
          <TextField
            select
            label="Appointment Type"
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            fullWidth
          >
            <MenuItem value="">Select Type</MenuItem>
            {appointmentTypes.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>

          {/* Amount */}
          <TextField
            label="Estimated Amount ($)"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            fullWidth
          />

          {/* Date & Time */}
          <TextField
            label="Date & Time"
            type="datetime-local"
            value={formData.dateTime}
            onChange={(e) => handleChange("dateTime", e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          {/* Reason for Visit */}
          <TextField
            placeholder="Enter reason for appointment"
            value={formData.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save Appointment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddAppointmentModal;
