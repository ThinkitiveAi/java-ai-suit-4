import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import AddAppointmentModal from "./AddAppointmentModal"; // new component

function SchedulingTab() {
  const [openModal, setOpenModal] = useState(false);

  const appointments = [
    {
      dateTime: "2025-08-14 10:00 AM",
      patient: "John Doe",
      type: "Consultation",
      dob: "1985-04-15",
      contact: "+1-555-123-4567",
      provider: "Dr. Smith",
      reason: "General Checkup",
      status: "Scheduled",
    },
    {
      dateTime: "2025-08-14 11:30 AM",
      patient: "Jane Smith",
      type: "Follow-up",
      dob: "1990-07-22",
      contact: "+1-555-987-6543",
      provider: "Dr. Johnson",
      reason: "Post-surgery follow-up",
      status: "Scheduled",
    },
    {
      dateTime: "2025-08-15 02:00 PM",
      patient: "Robert Brown",
      type: "Physical Exam",
      dob: "1978-11-03",
      contact: "+1-555-222-3333",
      provider: "Dr. Lee",
      reason: "Annual physical examination",
      status: "Confirmed",
    },
    {
      dateTime: "2025-08-15 03:30 PM",
      patient: "Emily Davis",
      type: "Consultation",
      dob: "1995-02-10",
      contact: "+1-555-444-5555",
      provider: "Dr. Smith",
      reason: "Skin rash",
      status: "Scheduled",
    },
    {
      dateTime: "2025-08-16 09:00 AM",
      patient: "Michael Johnson",
      type: "Follow-up",
      dob: "1982-09-17",
      contact: "+1-555-666-7777",
      provider: "Dr. Johnson",
      reason: "Blood pressure check",
      status: "Pending",
    },
  ];

  return (
    <>
      {/* Top bar with Add button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Add New Appointment
        </Button>
      </Box>

      {/* Appointments Table */}
      <Table>
        <TableHead>
          <TableRow style={{ background: "#E6E4E3" }}>
            <TableCell>Date & Time</TableCell>
            <TableCell>Patient Name</TableCell>
            <TableCell>Appointment Type</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Contact Details</TableCell>
            <TableCell>Provider Name</TableCell>
            <TableCell>Reason for Visit</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((a, index) => (
            <TableRow key={index}>
              <TableCell>{a.dateTime}</TableCell>
              <TableCell>{a.patient}</TableCell>
              <TableCell>{a.type}</TableCell>
              <TableCell>{a.dob}</TableCell>
              <TableCell>{a.contact}</TableCell>
              <TableCell>{a.provider}</TableCell>
              <TableCell>{a.reason}</TableCell>
              <TableCell>{a.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  Start
                </Button>
                <Button variant="outlined" color="secondary" size="small">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Appointment Modal */}
      <AddAppointmentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

export default SchedulingTab;
