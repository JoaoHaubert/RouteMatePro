//@ts-nocheck
import React from "react";
import { TextField, InputAdornment, Typography } from "@mui/material";
//components
import { useFormContext } from "../../../components/FormContextVehicles";
import FlexBetween from "@/components/FlexBetween";

const Settings: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    };

  function formatMileage(mileage: string) {
    if (!mileage) return "";
    return mileage.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return (
    <FlexBetween p="15px" flexDirection="column">
      <TextField
        required
        id="outlined-required"
        type="text"
        label="Odômetro atual"
        helperText="Quilometragem do veículo"
        value={formatMileage(formData.vehicleOdometer)}
        onChange={(event: any) => {
          const inputMileage = event.target.value
            .replace(/\D/g, "")
            .slice(0, 11);
          handleChange("vehicleOdometer")({ target: { value: inputMileage } }); // Set the input value using handleChange
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">km</InputAdornment>,
        }}
      />
      <Typography variant="h2">Custos Fixos</Typography>
      <TextField
        id="outlined-"
        type="text"
        label="Custo de operação do veículo"
        value={formatMileage(formData.vehicleOdometer)}
        onChange={handleChange()}
        InputProps={{
          endAdornment: <InputAdornment position="end">Anual</InputAdornment>,
          startAdornment:<InputAdornment position="start">R$</InputAdornment>
        }}
      />
      <TextField
        id="outlined-"
        type="text"
        label="IPVA"
        value={formatMileage(formData.vehicleOdometer)}
        onChange={handleChange()}
        InputProps={{
          endAdornment: <InputAdornment position="end">Anual</InputAdornment>,
          startAdornment:<InputAdornment position="start">R$</InputAdornment>
        }}
      />
      <TextField
        id="outlined-"
        type="text"
        label="Seguro"
        value={formatMileage(formData.vehicleOdometer)}
        onChange={handleChange()}
        InputProps={{
          endAdornment: <InputAdornment position="end">Anual</InputAdornment>,
          startAdornment:<InputAdornment position="start">R$</InputAdornment>
        }}
      />
      <TextField
        id="outlined-"
        type="text"
        label="Manutenções Preventivas"
        value={formatMileage(formData.vehicleOdometer)}
        onChange={handleChange()}
        InputProps={{
          endAdornment: <InputAdornment position="end">Anual</InputAdornment>,
          startAdornment:<InputAdornment position="start">R$</InputAdornment>
        }}
      />
    </FlexBetween>
  );
};

export default Settings;
