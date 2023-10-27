import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormDataDriver } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Typography,
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
  Button,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";

interface Driver extends FormDataDriver {
  _id: string;
}

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [editDriver, setEditDriver] = useState<Driver | null>(null);
  const [formData, setFormData] = useState<Driver>({
    _id: "",
    fullName: "",
    phone: "",
    license: "",
    email: "",
    address: "",
    city: "",
    birthDate: "",
    postCode: "",
    state: "",
    id: "",
    number: "",
    complement: "",
  });

  const openEditForm = (driver: Driver) => {
    setEditDriver(driver);
    setFormData(driver);
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
    axios.get<Driver[]>("http://localhost:5001/get-driver").then((response) => {
      setDrivers(response.data);
    });
  }, []);

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

  const handleUpdate = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/update-driver/${id}`,
        formData
      );
      if (response.status === 200) {
        Swal.fire("Atualizado!", "O motorista foi atualizado.", "success");
        // Update the shops state to reflect the changes
        setDrivers((prevDrivers) =>
          prevDrivers.map((driver) =>
            driver._id === id ? { ...driver, ...formData } : driver
          )
        );
        setEditDriver(null); // Close the edit form
      } else {
        Swal.fire("Não atualizado.", "Houve algum problema.", "error");
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  function formatPhone(telefone: string | undefined) {
    if (!telefone) return "";
    // Assuming telefone is a string in the format "XXXXXXXXXXX"
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(
      7
    )}`;
  }

  const consultCep = async () => {
    const cep = formData.postCode; // Assuming postCode is the CEP field
    try {
      const response = await axios.get(`http://viacep.com.br/ws/${cep}/json`);

      if (response.status === 200) {
        const data = response.data;
        setFormData((prevData) => ({
          ...prevData,
          address: data.logradouro,
          city: data.localidade,
          state: data.uf,
        }));
      } else {
        console.log("Não foi possível consultar CEP");
      }
    } catch (error: any) {
      console.error("Erro na consulta do CEP", error.message);
    }
  };

  return (
    <Box marginTop={1}>
      <Box m="0.3rem 0rem" p="0.4rem" flexDirection="column">
        <Typography variant="h2" m="0.2rem">
          Condutores
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Nome</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Telefone</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Email</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Habilitações</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Cidade</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Ações</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver._id}>
              <TableCell>{driver.fullName}</TableCell>
              <TableCell>{formatPhone(driver.phone)}</TableCell>
              <TableCell>{driver.email}</TableCell>
              <TableCell>{driver.license}</TableCell>
              <TableCell>{driver.city}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => openEditForm(driver)}
                >
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
      {/* DIALOG CONTENT WITH THE INPUTS FOR UPDATE */}
      {editDriver && (
        <Dialog open={Boolean(editDriver)} onClose={() => setEditDriver(null)}>
          <DialogTitle>Editar Dados do Motorista</DialogTitle>
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
                type="text"
                name="fullName"
                id="outlined-fullName"
                label="Nome completo"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <TextField
                type="text"
                name="phone"
                label="Telefone"
                value={formData.phone}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+55</InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 15,
                }}
              />
              <TextField
                id="outlined-email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-license"
                name="license"
                label="Habilitação"
                type="text"
                helperText="Exemplo: AB, B ou ABCDE."
                value={formData.license}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-post"
                name="postCode"
                label="CEP"
                onChange={handleInputChange}
                onBlurCapture={consultCep}
                value={formData.postCode}
                inputProps={{
                  maxLength: 10,
                }}
              />
              <TextField
                id="outlined-address"
                name="address"
                label="Endereço"
                value={formData.address}
                onChange={handleInputChange}
              />
              <TextField
                type="number"
                name="number"
                id="outlined-number"
                label="Número"
                value={formData.number}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-city"
                name="city"
                label="Cidade"
                value={formData.city}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-state"
                name="state"
                label="Estado"
                value={formData.state}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-complement"
                name="complement"
                label="Complemento"
                value={formData.complement}
                onChange={handleInputChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleUpdate(editDriver._id)}
            >
              Atualizar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setEditDriver(null)}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default DriverList;
