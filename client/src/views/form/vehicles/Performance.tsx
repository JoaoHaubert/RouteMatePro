//@ts-nocheck
import React from "react";
import { TextField,InputAdornment } from "@mui/material";
import { useFormContext } from './FormContextVehicle';
//components
import FlexBetween from "@/components/FlexBetween";


const Performance: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
  };
  return (
    <FlexBetween p="15px" flexDirection="column">
      <TextField
        id="outlined-number"
        type="number"
        label="Km/l Estimado do veículo"
        onChange={handleChange("vehicleConsume")}
        value={formData.vehicleConsume}
        InputProps={{
          endAdornment: <InputAdornment position="end">km/l</InputAdornment>,
        }}
      />
      <TextField
        id="outlined-number"
        type="number"
        label="Peso carga líquida"
        onChange={handleChange("vehicleLoadCap")}
        value={formData.vehicleLoadCap}
        InputProps={{
          endAdornment: <InputAdornment position="end">kg</InputAdornment>,
        }}
      />
    </FlexBetween>
  );
};

export default Performance;