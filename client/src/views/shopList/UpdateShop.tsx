import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { FormDataShop } from "@/types";
import { useFormShopContext } from "@/components/FormContextShops";
import axios from "axios";
import FlexBetween from "@/components/FlexBetween";

interface UpdateShopProps extends FormDataShop {
  open: boolean;
  onClose: () => void;
  data: any
}
const UpdateShop: React.FC<UpdateShopProps> = ({ open, onClose, data }) => {
  const { submitForms } = useFormShopContext();
  const [formData, setFormData] = useState<UpdateShopProps>({
    storeName: "",
    storePhone: "",
    storeEmail: "",
    storeType: "",
    storePost: "",
    storeAddress: "",
    storeNumber: "",
    storeCity: "",
    storeState: "",
    ...data
  });

  const handleChange =
    (field: keyof UpdateShopProps) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    };

    const shopTypes = [
      { value: "Autopeças", label: "Autopeças" },
      { value: "Compra e venda veículos", label: "Compra e venda veículos" },
      { value: "Mecânica e manutenção", label: "Mecânica e manutenção" },
      { value: "Pneus e borracharia", label: "Pneus e borracharia" },
      { value: "Ferramentas", label: "Ferramentas" },
      { value: "Outros", label: "Outros" },
    ];

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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Altere os dados da loja</DialogTitle>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FlexBetween p="15px" flexDirection="column">
          <DialogContent>
          <TextField
        required
        id="outlined-required"
        label="Nome da loja"
        value={formData.storeName}
        onChange={handleChange("storeName")}
      />
      <TextField
        required
        type="number"
        label="Telefone"
        value={formData.storePhone}
        onChange={handleChange("storePhone")}
        InputProps={{
          startAdornment: <InputAdornment position="start">+55</InputAdornment>,
        }}
      />
      <TextField
        required
        id="outlined-required"
        label="Email"
        value={formData.storeEmail}
        onChange={handleChange("storeEmail")}
      />
      <TextField
        required
        select
        label="Tipo da loja"
        id="outlined-select-store-type"
        value={formData.storeType}
        onChange={handleChange("storeType")}
      >
        {shopTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
            <TextField
              required
              id="outlined-required"
              label="CEP"
              value={formData.storePost}
              onChange={handleChange("storePost")}
              onBlurCapture={consultCep}
              inputProps={{
                maxLength: 10,
              }}
            />
            <TextField
              id="outlined-required"
              label="Endereço"
              value={formData.storeAddress}
              onChange={handleChange("storeAddress")}
            />
            <TextField
              required
              id="outlined-required"
              label="Número"
              value={formData.storeNumber}
              onChange={handleChange("storeNumber")}
              inputProps={{
                maxLength: 8,
              }}
            />
            <TextField
              id="outlined-required"
              label="Cidade"
              value={formData.storeCity}
              onChange={handleChange("storeCity")}
            />
            <TextField
              id="outlined-required"
              label="Estado"
              value={formData.storeState}
              onChange={handleChange("storeState")}
            />
          </DialogContent>
        </FlexBetween>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={1}
      >
        <DialogActions>
          <Button
            onClick={onClose}
            size="small"
            color="error"
            sx={{
              marginLeft: "2rem",
            }}
          >
            Cancelar
          </Button>

          <Button
            onClick={() => {
              submitForms
              onClose();
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UpdateShop;
