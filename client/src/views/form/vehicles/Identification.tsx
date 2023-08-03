import React, { useState } from "react";
import { Box, Autocomplete, TextField, Grid, Typography } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import SaveButton from "@/components/SaveButton";

type Props = {};

export default function Identification({}: Props) {
   // Initialize state for input values
   const [formValues, setFormValues] = useState({
    nomeVeiculo: "",
    placaVeiculo: "",
    tipoVeiculo: null,
    statusVeiculo: null,
    propriedadeVeiculo: null,
    grupoVeiculo: "",
  });

  // Helper function to handle changes in the input fields
  const handleChange = (name: string, value: any) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };
  const vehicleType = [
    { label: "Carro" },
    { label: "Caminhão" },
    { label: "Empilhadeira" },
    { label: "Furgão" },
    { label: "Moto" },
    { label: "Ônibus" },
    { label: "SUV" },
    { label: "Van" },
  ];
  const vehicleStatus = [
    { label: "Ativo" },
    { label: "Inativo" },
    { label: "Fora de serviço" },
    { label: "Vendido" },
  ];
  const vehicleOwnership = [
    { label: "Próprio" },
    { label: "Alugado" },
    { label: "Cliente" },
    { label: "Arrendado" },
  ];

  return (
    <Grid item>
      <Box
        bgcolor="#fff"
        border="solid 1px #DDE6ED"
        borderRadius={4}
        m="2rem 2.5rem"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "90ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FlexBetween p="15px" flexDirection="column">
          <TextField
            required
            id="outlined-required"
            label="Nome do Veiculo"
            helperText="Dê um nome, código ou apelido para o veículo."
            value={formValues.nomeVeiculo}
            onChange={(e) => handleChange("nomeVeiculo", e.target.value)}
          />
          <TextField label="Placa do Veículo" />
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
            renderInput={(params) => (
              <TextField {...params} label="Propriedade" />
            )}
          />
          <TextField
            label="Grupo do Veículo"
            helperText="Defina o grupo do veículo. Ex: Jardinagem, Laticínios, etc."
          />
        </FlexBetween>
      </Box>
      <SaveButton />
    </Grid>
  );
}
