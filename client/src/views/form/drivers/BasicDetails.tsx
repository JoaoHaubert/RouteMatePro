//@ts-nocheck
import React from "react";
import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
//components
import FlexBetween from "@/components/FlexBetween";
import { useFormContext } from "./../../../components/FormContext"
import { FormData } from "@/types";

const BasicDetails: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    };

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
      <MuiTelInput
        defaultCountry="BR"
        label="Contato"
        value={formData.phone}
        onChange={handleChange("phone")}
      />
      <TextField
        id="outlined-required"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
      />
      <TextField
        id="outlined-required"
        label="Habilitação"
        type="email"
        value={formData.license}
        onChange={handleChange("license")}
      />
    </FlexBetween>
  );
};

export default BasicDetails;
