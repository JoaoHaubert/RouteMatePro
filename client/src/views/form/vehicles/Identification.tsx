//@ts-nocheck
import React, { useState } from "react";
import { Box, Autocomplete, TextField, Grid, Typography } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import SaveButton from "@/components/SaveButton";

type Props = {
  formValues: {
    vehicleName: string;
    vehicleTag: string;
    vehicleType: any;
    vehicleStatus: any;
    vehicleProperties: any;
    vehicleGroup: string;
  };
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
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={vehicleType}
        renderInput={(params) => (
          <TextField {...params} label="Tipo do Veiculo" />
        )}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={vehicleStatus}
        renderInput={(params) => (
          <TextField {...params} label="Status do Veiculo" />
        )}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={vehicleOwnership}
        renderInput={(params) => <TextField {...params} label="Propriedade" />}
      />
      <TextField
        label="Grupo do Veículo"
        helperText="Defina o grupo do veículo. Ex: Jardinagem, Laticínios, etc."
      />
    </FlexBetween>
  );
};

export default Identification;
