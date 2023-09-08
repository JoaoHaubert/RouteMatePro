import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormDataDriver } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface Driver extends FormDataDriver {
  _id: string;
}

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
    .get<Driver[]>("http://localhost:5001/get-driver")
    .then((response) => {
      setDrivers(response.data);
    });
  }, []);

  function handleUpdate() {
    console.log("Clicked for edit");
  }
  function handleDelete() {
    console.log("Clicked for delete");
  }

  return (
    <Box marginTop={3}>
      <Typography variant="h4">Condutores</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Habilitações</TableCell>
            <TableCell>Cidade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver._id}>
              <TableCell>{driver.fullName}</TableCell>
              <TableCell>{driver.phone}</TableCell>
              <TableCell>{driver.email}</TableCell>
              <TableCell>{driver.license}</TableCell>
              <TableCell>{driver.city}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleUpdate()}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete()}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DriverList;
