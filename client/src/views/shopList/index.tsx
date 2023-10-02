import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormDataShop } from "@/types";
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
interface Shop extends FormDataShop {
  _id: string;
}

const ShopList: React.FC = () => {
  const [shop, setShop] = useState<Shop[]>([]);
  const [editShop, setEditShop] = useState<Shop | null>(null);
  const [formData, setFormData] = useState<Shop>({
    _id: "",
    storeName: "",
    storePhone: "",
    storeEmail: "",
    storeType: "",
    storePost: "",
    storeAddress: "",
    storeNumber: "",
    storeCity: "",
    storeState: "",
  });

  const shopTypes = [
    { value: "Autopeças", label: "Autopeças" },
    { value: "Compra e venda veículos", label: "Compra e venda veículos" },
    { value: "Mecânica e manutenção", label: "Mecânica e manutenção" },
    { value: "Pneus e borracharia", label: "Pneus e borracharia" },
    { value: "Ferramentas", label: "Ferramentas" },
    { value: "Outros", label: "Outros" },
  ];

  const openEditForm = (shop: Shop) => {
    setEditShop(shop);
    setFormData(shop);
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
    axios.get<Shop[]>("http://localhost:5001/get-shop").then((response) => {
      setShop(response.data);
    });
  }, []);

  const handleDelete = async (id: string) => {
    const confirmationMessage = "Tem certeza que deseja remover esta loja ?";

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
          `http://localhost:5001/delete-shop/${id}`
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        if (response.status === 200) {
          Swal.fire("Removido!", "O arquivo foi removido.", "success");
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
        `http://localhost:5001/update-shop/${id}`,
        formData
      );
      if (response.status === 200) {
        Swal.fire("Atualizado!", "A loja foi atualizada.", "success");
        // Update the shops state to reflect the changes
        setShop((prevShops) =>
          prevShops.map((shop) =>
            shop._id === id ? { ...shop, ...formData } : shop
          )
        );
        setEditShop(null); // Close the edit form
      } else {
        Swal.fire("Não atualizado.", "Houve algum problema.", "error");
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const consultCep = async () => {
    const cep = formData.storePost; // Assuming postCode is the CEP field
    try {
      const response = await axios.get(`http://viacep.com.br/ws/${cep}/json`);

      if (response.status === 200) {
        const data = response.data;
        setFormData((prevData) => ({
          ...prevData,
          storeAddress: data.logradouro,
          storeCity: data.localidade,
          storeState: data.uf,
        }));
      } else {
        console.log("Não foi possível consultar CEP");
      }
    } catch (error: any) {
      console.error("Erro na consulta do CEP", error.message);
    }
  };

  function formatPhone(telefone: string | undefined) {
    if (!telefone) return "";
    // Assuming telefone is a string in the format "XXXXXXXXXXX"
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(
      7
    )}`;
  }

  return (
    <Box marginTop={1}>
      <Box m="0.3rem 0rem" p="0.4rem" flexDirection="column">
        <Typography variant="h2" m="0.2rem">
          Lojas
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
              <Typography variant="h6">Telefone</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Email</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Cidade</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Estado</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Ações</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shop.map((shop) => (
            <TableRow key={shop._id}>
              <TableCell>{shop.storeName}</TableCell>
              <TableCell>{shop.storeType}</TableCell>
              <TableCell>{formatPhone(shop.storePhone)}</TableCell>
              <TableCell>{shop.storeEmail}</TableCell>
              <TableCell>{shop.storeCity}</TableCell>
              <TableCell>{shop.storeState}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => openEditForm(shop)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(shop._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*DIALOG CONTENT WITH THE INPUTS FOR UPDATE */}
      {editShop && (
        <Dialog open={Boolean(editShop)} onClose={() => setEditShop(null)}>
          <DialogTitle>Editar Dados da Loja</DialogTitle>
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
                label="Name"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
              />
              <TextField
                label="Telefone"
                name="storePhone"
                value={formData.storePhone}
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
                name="storeEmail"
                label="Email"
                value={formData.storeEmail}
                onChange={handleInputChange}
              />
              <TextField
                select
                name="storeType"
                label="Tipo da loja"
                id="outlined-select-store-type"
                value={formData.storeType}
                onChange={handleInputChange}
              >
                {shopTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-postCode"
                name="storePost"
                label="CEP"
                onChange={handleInputChange}
                onBlurCapture={consultCep}
                value={formData.storePost}
                inputProps={{
                  maxLength: 10,
                }}
              />
              <TextField
                id="outlined-Address"
                name="storeAddress"
                label="Endereço"
                value={formData.storeAddress}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-number"
                name="storeNumber"
                label="Número"
                value={formData.storeNumber}
                onChange={handleInputChange}
                inputProps={{
                  maxLength: 8,
                }}
              />
              <TextField
                id="outlined-city"
                name="storeCity"
                label="Cidade"
                value={formData.storeCity}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-state"
                name="storeState"
                label="Estado"
                value={formData.storeState}
                onChange={handleInputChange}
              />
              {/* Add more fields for other shop properties */}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleUpdate(editShop._id)}
            >
              Atualizar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setEditShop(null)}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ShopList;
