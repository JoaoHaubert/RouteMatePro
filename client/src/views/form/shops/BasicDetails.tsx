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
    { value: "parts", label: "Autopeças" },
    { value: "sellBuy", label: "Compra e venda veículos" },
    { value: "maintenance", label: "Mecânica e manutenção" },
    { value: "tires", label: "Pneus e borracharia" },
    { value: "tools", label: "Ferramentas" },
    { value: "others", label: "Outros" },
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
        type="number"
        label="Telefone"
        value={formData.storePhone}
        onChange={handleChange("storePhone")}
        InputProps={{
          startAdornment: <InputAdornment position="start">+55</InputAdornment>,
        }}
      />
      <TextField
        id="outlined-required"
        label="Email"
        value={formData.storeEmail}
        onChange={handleChange("storeEmail")}
      />
      <TextField
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
