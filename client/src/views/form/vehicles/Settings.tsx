//@ts-nocheck
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
//components
import { useFormContext } from "../../../components/FormContextVehicles";
import FlexBetween from "@/components/FlexBetween";

const Settings: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({ ...prevData, [field]: event.target.value }));
    };

  return (
    <FlexBetween p="15px" flexDirection="column">
      <TextField
        required
        id="outlined-required"
        type="number"
        label="Odômetro atual"
        helperText="Quilometragem do veículo"
        value={formData.vehicleOdometer}
        onChange={handleChange("vehicleOdometer")}
        InputProps={{
          endAdornment: <InputAdornment position="end">km</InputAdornment>,
        }}
      />
    </FlexBetween>
  );
};

export default Settings;
