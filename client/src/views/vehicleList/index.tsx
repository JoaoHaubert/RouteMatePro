import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormData } from "@/types";
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
import Swal from "sweetalert2";

interface Vehicle extends FormData {
  _id: string;
}

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
      .get<Vehicle[]>("http://localhost:5001/get-vehicle")
      .then((response) => {
        setVehicles(response.data);
      });
  }, []);

  function handleUpdate() {
    console.log("Clicked for edit");
  }
  const handleDelete = async (id: string) => {
    const confirmationMessage = "Tem certeza que deseja remover este veículo ?";

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
          `http://localhost:5001/delete-vehicle/${id}`
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

  function formatMileage(mileage: string) {
    if (!mileage) return "";
    return mileage.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return (
    <Box marginTop={1}>
      <Box m="0.3rem 0rem" p="0.4rem" flexDirection="column">
        <Typography variant="h2" m="0.2rem">
          Veículos
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Nome</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Tipo</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Placa</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Fabricante</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Status</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Quilometragem</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Grupo</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Ações</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle._id}>
              <TableCell>{vehicle.vehicleName}</TableCell>
              <TableCell>{vehicle.vehicleType}</TableCell>
              <TableCell>{vehicle.vehicleTag}</TableCell>
              <TableCell>{vehicle.vehicleBrand}</TableCell>
              <TableCell>{vehicle.vehicleStatus}</TableCell>
              <TableCell>{formatMileage(vehicle.vehicleOdometer)} Km</TableCell>
              <TableCell>{vehicle.vehicleGroup}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleUpdate()}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(vehicle._id)}
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

export default VehicleList;
