//@ts-nocheck
import React, { useState } from "react";
import {
  Box,
  Autocomplete,
  TextField,
  Grid,
  Typography,
  MenuItem,
} from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import SaveButton from "@/components/SaveButton";
import { useForm } from "react-hook-form";
type Props = {
  formValues: {
    vehicleName: string;
    vehicleTag: string;
    vehicleType: string;
    vehicleStatus: string;
    vehicleOwnership: string;
    vehicleGroup: string;
  };

  handleChange: (name: string, value: any) => void;
  vehicleType: { label: string }[];
  vehicleStatus: { label: string }[];
  vehicleOwnership: { label: string }[];
};

const Identification: React.FC<Props> = ({
  formValues,
  handleChange,
  vehicleType,
  vehicleStatus,
  vehicleOwnership,
}) => {


  return (
      <FlexBetween p="15px" flexDirection="column">
        <TextField
          required
          id="outlined-required"
          label="Nome do Veiculo"
          helperText="Dê um nome, código ou apelido para o veículo."
          value={formValues.vehicleName}
          onChange={(e) => handleChange("vehicleName", e.target.value)}
        />
        <TextField
          label="Placa do Veículo"
          value={formValues.vehicleTag}
          onChange={(e) => handleChange("vehicleTag", e.target.value)}
        />
        <TextField
          select
          label="Tipo do Veículo"
          id="outlined-select-car-type"
          onChange={(e) => handleChange("vehicleType", e.target.value)}
          value={formValues.vehicleType}
        >
          {vehicleType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status do Veículo"
          id="outlined-select-car-type"
          onChange={(e) => handleChange("vehicleStatus", e.target.value)}
          value={formValues.vehicleStatus}
        >
          {vehicleStatus.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Propriedade"
          id="outlined-select-car-type"
          onChange={(e) => handleChange("vehicleOwnership", e.target.value)}
          value={formValues.vehicleOwnership}
        >
          {vehicleOwnership.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Grupo do Veículo"
          helperText="Defina o grupo do veículo. Ex: Jardinagem, Laticínios, etc."
          value={formValues.vehicleGroup}
          onChange={(e) => handleChange("vehicleGroup", e.target.value)}
        />
      </FlexBetween>
  );
};

export default Identification;
