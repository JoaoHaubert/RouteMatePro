import React, { useState } from "react";
import { Box, TextField, Grid, Autocomplete } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
//components
import FlexBetween from "@/components/FlexBetween";
import SaveButton from "@/components/SaveButton";
type Props = {};

export default function BasicDetails({}: Props) {
  const [value, setValue] = React.useState("");
  const handleChange = (newValue: any) => {
    setValue(newValue);
  };
  const shopTypes = [
    { label: "Autopeças" },
    { label: "Compra e venda veículos" },
    { label: "Mecânica e manutenção" },
    { label: "Pneus e borracharia" },
    { label: "Ferramentas" },
    { label: "Outros" },
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
          <TextField required id="outlined-required" label="Nome da loja" />
          <MuiTelInput
            defaultCountry="BR"
            label="Contato"
            value={value}
            onChange={handleChange}
          />
          <TextField id="outlined-required" label="Email" />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={shopTypes}
            renderInput={(params) => (
              <TextField {...params} label="Tipo da loja" />
            )}
          />
        </FlexBetween>
      </Box>
      <SaveButton />
    </Grid>
  );
}
