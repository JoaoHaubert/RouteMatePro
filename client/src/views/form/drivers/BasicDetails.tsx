//@ts-nocheck
import React, { useState } from "react";
import { Box, TextField, Grid, Autocomplete, Button } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
//components
import FlexBetween from "@/components/FlexBetween";
import SaveButton from "@/components/SaveButton";
type Props = {};

export default function BasicDetails({}: Props) {
  const handleInputChange = (event) => {
    // Remove any digits from the input value
    const newValue = event.target.value.replace(/\d/g, '');
    // Update the value in the TextField
    event.target.value = newValue;
  };
  const { register, handleSubmit } = useForm();
  function createDriver(data: any) {
    console.log(data);
  }
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
      <Box component="form" onSubmit={handleSubmit(createDriver)}>
        <Box
          bgcolor="#fff"
          border="solid 1px #DDE6ED"
          borderRadius={4}
          m="2rem 2.5rem"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "90ch" },
          }}
          autoComplete="off"
        >
          <FlexBetween p="15px" flexDirection="column">
            <TextField
              required
              type="text"
              id="outlined-required"
              label="Nome completo"
              {...register("name")}
              onChange={handleInputChange}
            />
            <MuiTelInput
              {...register("phone")}
              defaultCountry="BR"
              label="Contato"
              value={value}
              onChange={handleChange}
            />
            <TextField
              id="outlined-required"
              label="Email"
              type="email"
              {...register("email")}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={licenseTypes}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo de habilitação"
                  {...register("license")}
                />
              )}
            />
          </FlexBetween>
        </Box>
        <SaveButton />
      </Box>
    </Grid>
  );
}
