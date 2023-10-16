import React from "react";
import { TextField, InputAdornment } from "@mui/material";
//components
import FlexBetween from "@/components/FlexBetween";
import { useFormDriverContext } from "./../../../components/FormContextDriver";
import { FormDataDriver } from "@/types";

const BasicDetails: React.FC = () => {
  const { formData, setFormData } = useFormDriverContext();

  const handleChange =
    (field: keyof FormDataDriver) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    };

  // function formatPhone(telefone: string | undefined) {
  //   if (!telefone) return "";
  //   // Assuming telefone is a string in the format "XXXXXXXXXXX"
  //   return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(
  //     7
  //   )}`;
  // }

  return (
    <FlexBetween p="15px" flexDirection="column">
      <TextField
        required
        type="text"
        id="outlined-required"
        label="Nome completo"
        value={formData.fullName}
        onChange={handleChange("fullName")}
      />
      <TextField
        required
        type="text"
        label="Telefone"
        value={(formData.phone)}
        onChange={handleChange("phone")}
        InputProps={{
          startAdornment: <InputAdornment position="start">+55</InputAdornment>,
        }}
        inputProps={{
          maxLength: 15,
        }}
      />
      <TextField
        required
        id="outlined-required"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
      />
      <TextField
        required
        id="outlined-required"
        label="Habilitação"
        type="text"
        helperText="Exemplo: AB, B ou ABCDE."
        value={formData.license}
        onChange={handleChange("license")}
      />
    </FlexBetween>
  );
};

export default BasicDetails;
