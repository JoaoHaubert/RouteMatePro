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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";

interface Vehicle extends FormData {
  _id: string;
}

const VehicleList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<Vehicle>({
    _id: "",
    vehicleName: "",
    vehicleTag: "",
    vehicleType: "",
    vehicleStatus: "",
    vehicleOwnership: "",
    vehicleGroup: "",
    vehicleBrand: "",
    vehicleConsume: "",
    vehicleLoadCap: "",
    vehicleOdometer: "",
    vehicleOperationCost: "",
    vehicleIpva: "",
    vehicleInsurance: "",
    vehicleMaintenance: "",
  });

  const vehicleType = [
    { value: "Carro", label: "Carro" },
    { value: "Caminhão", label: "Caminhão" },
    { value: "Empilhadeira", label: "Empilhadeira" },
    { value: "Furgão", label: "Furgão" },
    { value: "Moto", label: "Moto" },
    { value: "Ônibus", label: "Ônibus" },
    { value: "Pickup", label: "Pickup" },
    { value: "Outros", label: "Outros" },
  ];

  const vehicleStatus = [
    { value: "Ativo", label: "Ativo" },
    { value: "Em Serviço", label: "Em Serviço" },
    { value: "Inativo", label: "Inativo" },
    { value: "Fora de Serviço", label: "Fora de serviço" },
    { value: "Vendido", label: "Vendido" },
  ];

  const vehicleOwnership = [
    { value: "Próprio", label: "Próprio" },
    { value: "Alugado", label: "Alugado" },
    { value: "Cliente", label: "Cliente" },
    { value: "Arrendado", label: "Arrendado" },
  ];

  const openEditForm = (vehicle: Vehicle) => {
    setEditVehicle(vehicle);
    setFormData(vehicle);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
      .get<Vehicle[]>("http://localhost:5001/get-vehicle")
      .then((response) => {
        setVehicles(response.data);
      });
  }, []);

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

  const handleUpdate = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/update-vehicle/${id}`,
        formData
      );

      if (response.status === 200) {
        Swal.fire("Atualizado!", "O veículo foi atualizado.", "success");
        // Update the vehicles state to reflect the changes
        setVehicles((prevVehicles) =>
          prevVehicles.map((vehicle) =>
            vehicle._id === id ? { ...vehicle, ...formData } : vehicle
          )
        );
        setEditVehicle(null)
      } else {
        Swal.fire("Não atualizado.", "Houve algum problema.", "error");
      }
    } catch (error) {
      console.error("Error updating:", error);
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
              <TableCell>{formatMileage(vehicle.vehicleOdometer)} km</TableCell>
              <TableCell>{vehicle.vehicleGroup}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => openEditForm(vehicle)}
                >
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
      {editVehicle && (
        <Dialog
          open={Boolean(editVehicle)}
          onClose={() => setEditVehicle(null)}
        >
          <DialogTitle>Editar dados do veículo</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              bgcolor="#fff"
              m="1rem 1.5rem"
              sx={{
                "& .MuiTextField-root": { m: 2, width: "25ch" },
              }}
            >
              <TextField
                id="outlined-vehicle-name"
                name="vehicleName"
                label="Nome do Veiculo"
                helperText="Dê um nome, código ou apelido para o veículo."
                value={formData.vehicleName}
                onChange={handleInputChange}
              />
              <TextField
                label="Placa do Veículo"
                name="vehicleTag"
                value={formData.vehicleTag}
                onChange={handleInputChange}
              />
              <TextField
                select
                label="Tipo do Veículo"
                name="vehicleType"
                id="outlined-select-car-type"
                onChange={handleInputChange}
                value={formData.vehicleType}
              >
                {vehicleType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Fabricante do Veículo"
                name="vehicleBrand"
                value={formData.vehicleBrand}
                onChange={handleInputChange}
                helperText="Exemplo: Ford ou Volkswagen."
              />
              <TextField
                select
                label="Status do Veículo"
                name="vehicleStatus"
                id="outlined-select-car-type"
                onChange={handleInputChange}
                value={formData.vehicleStatus}
              >
                {vehicleStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Propriedade"
                name="vehicleOwnership"
                id="outlined-select-car-type"
                onChange={handleInputChange}
                value={formData.vehicleOwnership}
              >
                {vehicleOwnership.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Grupo do Veículo"
                name="vehicleGroup"
                helperText="Defina o grupo do veículo. Ex: Jardinagem, Laticínios, etc."
                value={formData.vehicleGroup}
                onChange={handleInputChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleUpdate(editVehicle._id)}
            >
              Atualizar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setEditVehicle(null)}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default VehicleList;
