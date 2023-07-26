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
  const licenseTypes = [
    { label: "A" },
    { label: "B" },
    { label: "AB" },
    { label: "C" },
    { label: "D" },
    { label: "E" },
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
          <TextField required id="outlined-required" label="Nome completo" />
          <MuiTelInput
            defaultCountry="BR"
            label="Celular"
            value={value}
            onChange={handleChange}
          />
          <TextField id="outlined-required" label="Email" />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={licenseTypes}
            renderInput={(params) => (
              <TextField {...params} label="Tipo de habilitação" />
            )}
          />
        </FlexBetween>
      </Box>
      <SaveButton />
    </Grid>
  );
}
