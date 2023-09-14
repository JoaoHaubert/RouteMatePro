import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormDataDriver } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "@/components/Header";
import FlexBetween from "@/components/FlexBetween";
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Swal from "sweetalert2";

interface Driver extends FormDataDriver {
  _id: string;
}

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios.get<Driver[]>("http://localhost:5001/get-driver").then((response) => {
      setDrivers(response.data);
    });
  }, []);

  function handleUpdate() {
    console.log("Clicked for edit");
  }
  const handleDelete = async (id: string) => {
    const confirmationMessage =
      "Tem certeza que deseja remover este condutor(a) ?";

    try {
      const result = await Swal.fire({
        title: "Confirmação",
        text: confirmationMessage,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Remover",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:5001/delete-driver/${id}`
        );

        if (response.status === 200) {
          Swal.fire("Removido!", "O arquivo foi removido.", "success");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          Swal.fire("Não removido.", "Houve algum problema.", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <Box marginTop={3}>
      <Header title="Condutores" subtitle="Lista de condutores"/>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Nome</Typography></TableCell>
            <TableCell><Typography variant="h6">Telefone</Typography></TableCell>
            <TableCell><Typography variant="h6">Email</Typography></TableCell>
            <TableCell><Typography variant="h6">Habilitações</Typography></TableCell>
            <TableCell><Typography variant="h6">Cidade</Typography></TableCell>
            <TableCell><Typography variant="h6">Ações</Typography></TableCell>
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
                <IconButton
                  color="error"
                  onClick={() => handleDelete(driver._id)}
                >
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
