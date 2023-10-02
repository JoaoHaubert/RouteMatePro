import React from "react";
import { InputAdornment, TextField, MenuItem } from "@mui/material";
//components
import FlexBetween from "@/components/FlexBetween";
import { useFormShopContext } from "@/components/FormContextShops";
import { FormDataShop } from "@/types";

const BasicDetails: React.FC = () => {
  const { formData, setFormData } = useFormShopContext();

  const handleChange =
    (field: keyof FormDataShop) =>
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

  return (
    <FlexBetween p="15px" flexDirection="column">
      <TextField
        required
        id="outlined-required"
        label="Nome da loja"
        value={formData.storeName}
        onChange={handleChange("storeName")}
      />
      <TextField
        required
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
    </FlexBetween>
  );
};

export default BasicDetails;
