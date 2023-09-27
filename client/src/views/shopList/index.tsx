//@ts-nocheck
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
} from "@mui/material";
import Swal from "sweetalert2";
import UpdateShop from "./UpdateShop";
interface Shop extends FormDataShop {
  _id: string;
}

const ShopList: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState<FormDataShop | null>(null);

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

  function formatPhone(telefone: string | undefined) {
    if (!telefone) return "";
    // Assuming telefone is a string in the format "XXXXXXXXXXX"
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(
      7
    )}`;
  }

  // Function to open the dialog for editing
  const openEditDialog = (data: any) => {
    setEditData(data);
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
    // Optionally, you can reload the data here
  };

  const handleUpdate = async (id: string) => {
    const confirmationMessage =
      "Tem certeza que você deseja editar o arquivo ?";

    try {
      const result = await Swal.fire({
        title: "Confirmação",
        text: confirmationMessage,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Editar",
      });
      if (result.isConfirmed) {
        openEditDialog(shops);
        const response = await axios.put(
          `http://localhost:5001/update-shop/${id}`
        );

        if (response.status === 200) {
          console.log("Deu boa!")
        } else {
          console.log("Deu ruim!")
        }
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

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
          {shops.map((shop) => (
            <TableRow key={shop._id}>
              <TableCell>{shop.storeName}</TableCell>
              <TableCell>{shop.storeType}</TableCell>
              <TableCell>{formatPhone(shop.storePhone)}</TableCell>
              <TableCell>{shop.storeEmail}</TableCell>
              <TableCell>{shop.storeCity}</TableCell>
              <TableCell>{shop.storeState}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleUpdate(shop._id)}
                >
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
      {isEditDialogOpen && editData !== null && (
  <UpdateShop
    open={isEditDialogOpen}
    onClose={handleEditClose}
    data={editData}
  />
)}
    </Box>
  );
};

export default ShopList;
