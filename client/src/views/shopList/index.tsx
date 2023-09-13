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

interface Shop extends FormDataShop {
  _id: string;
}

const ShopList: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
    .get<Shop[]>("http://localhost:5001/get-shop")
    .then((response) => {
      setShops(response.data);
    });
  }, []);

  const handleDelete = async (id: any) => {
    axios.delete(`http://localhost:5001/delete-shop/${id}`).then((response) => {
      if (response.status===200) {
        console.log("Shop deleted sucessfuly")
      } else {
        console.log("Failed to delete shop")
      }
    })
    ;
  }
  function handleUpdate() {
    console.log("Clicked for delete")
  }
  return(
    <Box
      marginTop={3}
    >
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
                <IconButton color="error" onClick={() => handleDelete(shop._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )

}

export default ShopList;
