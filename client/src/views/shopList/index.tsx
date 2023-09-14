import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormDataShop } from "@/types";
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

interface Shop extends FormDataShop {
  _id: any;
}

const ShopList: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios.get<Shop[]>("http://localhost:5001/get-shop").then((response) => {
      setShops(response.data);
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

  function handleUpdate() {
    console.log("Clicked for delete");
  }
  return (
    <Box marginTop={3}>
      <Typography variant="h4">Veículos</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Cidade</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shops.map((shop) => (
            <TableRow key={shop._id}>
              <TableCell>{shop.storeName}</TableCell>
              <TableCell>{shop.storeType}</TableCell>
              <TableCell>{shop.storePhone}</TableCell>
              <TableCell>{shop.storeEmail}</TableCell>
              <TableCell>{shop.storeCity}</TableCell>
              <TableCell>{shop.storeState}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleUpdate()}>
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
    </Box>
  );
};

export default ShopList;
