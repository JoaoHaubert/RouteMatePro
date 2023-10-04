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
          const inputMileage = event.target.value.replace(/\D/g, "").slice(0, 11);
          handleChange("vehicleOdometer")({ target: { value: inputMileage } }); // Set the input value using handleChange
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">km</InputAdornment>,
        }}
      />
      <TextField
        required
        id="outlined-required"
        type="text"
        label="Odômetro atual"
        helperText="Quilometragem do veículo"
        value={formatMileage(formData.vehicleOdometer)}
        onChange={(event: any) => {
          const inputMileage = event.target.value.replace(/\D/g, "").slice(0, 11);
          handleChange("vehicleOdometer")({ target: { value: inputMileage } }); // Set the input value using handleChange
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">km</InputAdornment>,
        }}
      />
    </FlexBetween>
  );
};

export default Settings;
