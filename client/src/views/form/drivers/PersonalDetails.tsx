import React, { useState } from "react";
import { Box, TextField, Grid, Autocomplete } from "@mui/material";
//components
import FlexBetween from "@/components/FlexBetween";
import SaveButton from "@/components/SaveButton";
type Props = {};

export default function PersonalDetails({}: Props) {
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
          <TextField required id="outlined-required" label="CPF" />
          <TextField required id="outlined-start-adorment" helperText="Data de nascimento"  type="date" />
          <TextField required id="outlined-required" label="CEP" />
          <TextField
            required
            id="outlined-required"
            label="Endereço"
            helperText="Rua e número. Ex: Rua Coronel Bordini, 1151"
          />
          <TextField id="outlined-required" label="Complemento" />
          <TextField id="outlined-required" label="Cidade" />
          <TextField id="outlined-required" label="Estado" />
        </FlexBetween>
      </Box>
      <SaveButton />
    </Grid>
  );
}
