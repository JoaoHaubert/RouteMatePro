import React, { useState } from "react";
import { TextField } from "@mui/material";
//components
import FlexBetween from "@/components/FlexBetween";
import { useFormShopContext } from "@/components/FormContextShops";

const AddressDetail: React.FC = () => {
  const { formData, setFormData } = useFormShopContext();

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    };

  return (
    <FlexBetween p="15px" flexDirection="column">
      <TextField id="outlined-required" label="CEP" />
      <TextField
        id="outlined-required"
        label="Endereço"
        helperText="Rua e número. Ex: Rua Coronel Bordini, 1151"
      />
      <TextField id="outlined-required" label="Cidade" />
      <TextField id="outlined-required" label="Estado" />
    </FlexBetween>
  );
};

export default AddressDetail;
