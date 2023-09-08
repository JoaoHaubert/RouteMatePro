import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormData } from "@/types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";


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
  console.log("Clicked for edit")
}
function handleDelete() {
  console.log("Clicked for delete")
}
  return (
    <div>
      <h2>Vehicle List</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Placa</TableCell>
            <TableCell>Fabricante</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Quilometragem</TableCell>
            <TableCell>Grupo</TableCell>
            <TableCell>Ações</TableCell>
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
              <TableCell>{vehicle.vehicleOdometer}</TableCell>
              <TableCell>{vehicle.vehicleGroup}</TableCell>
              <TableCell>
              <IconButton
                  color="primary"
                  onClick={() => handleUpdate()}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete()}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VehicleList;
