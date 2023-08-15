import React, { useState } from "react";
import { InputAdornment, TextField, MenuItem } from "@mui/material";
//components
import FlexBetween from "@/components/FlexBetween";
import { useFormShopContext } from "@/components/FormContextShops";

const BasicDetails: React.FC = () => {
  const { formData, setFormData } = useFormShopContext();

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    };
  const shopTypes = [
    { value: "parts", label: "Autopeças" },
    { value: "sellBuy", label: "Compra e venda veículos" },
    { value: "maintenance", label: "Mecânica e manutenção" },
    { value: "tires", label: "Pneus e borracharia" },
    { value: "tools", label: "Ferramentas" },
    { value: "others", label: "Outros" },
  ];

  return (
    <FlexBetween p="15px" flexDirection="column">
      <TextField required id="outlined-required" label="Nome da loja" />
      <TextField
        type="number"
        label="Telefone"
        InputProps={{
          startAdornment: <InputAdornment position="start">+55</InputAdornment>,
        }}
      />
      <TextField id="outlined-required" label="Email" />
      <TextField select label="Status do Veículo" id="outlined-select-car-type">
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
