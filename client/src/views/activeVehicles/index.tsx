import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormData } from "@/types";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

interface Vehicle extends FormData {
  _id: string;
}

const ActiveVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  return (
    <Box>
      <Box
        bgcolor="white"
        m="0.3rem 0rem"
        p="0.8rem"
        borderRadius="8px"
        border="solid 2px #DDE6ED"
        flexDirection="column"
      >
        <Typography variant="h2" m="0.2rem 0.5rem">
          Veículos Ativos
        </Typography>
      </Box>
      <Button
        onClick={() => {
          console.log("clicked");
        }}
        type="submit"
        size="small"
        variant="contained"
        color="primary"
        sx={{ marginLeft: "0.5rem", marginTop: "0.5rem" }}
      >
        + Criar Serviço
      </Button>
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
              <Typography variant="h6">Distância</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Data Início</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Data Fim</Typography>
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
              <TableCell>
                <IconButton color="primary" onClick={() => "a"}></IconButton>
                <IconButton color="error" onClick={() => "a"}></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ActiveVehicles;
