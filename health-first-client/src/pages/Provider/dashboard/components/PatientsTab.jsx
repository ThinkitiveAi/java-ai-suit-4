import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function PatientsTab() {
  const patients = [
    { name: "John Doe", age: 45, gender: "Male" },
    { name: "Jane Smith", age: 32, gender: "Female" },
    { name: "Robert Brown", age: 51, gender: "Male" },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Gender</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map((p, index) => (
          <TableRow key={index}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.age}</TableCell>
            <TableCell>{p.gender}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PatientsTab;
