import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { FormDataShop } from "@/types";
import axios from "axios";

interface UpdateShopProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormDataShop) => void;
  data: FormDataShop;
}
const UpdateShop: React.FC<UpdateShopProps> = ({
  open,
  onClose,
  onSave,
  data,
}) => {
  const [formData, setFormData] = useState(data);

  const handleChange =
    (field: keyof FormDataShop) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Altere os dados da loja</DialogTitle>
      <DialogContent>
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
          onBlurCapture={consultCep}
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
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={() => {
            onSave(formData);
            onClose();
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateShop;