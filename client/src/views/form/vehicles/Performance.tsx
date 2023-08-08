import React from "react";
import { Box, TextField, Grid, InputAdornment } from "@mui/material";
//components
import FlexBetween from "@/components/FlexBetween";
import SaveButton from "@/components/SaveButton";

type Props = {};

export default function Performance({}: Props) {
  return (
    <FlexBetween p="15px" flexDirection="column">
      <TextField
        id="outlined-number"
        type="number"
        label="Km/l Estimado do veículo"
      />
      <TextField
        id="outlined-number"
        type="number"
        label="Peso carga líquida"
        InputProps={{
          endAdornment: <InputAdornment position="end">kg</InputAdornment>,
        }}
      />
    </FlexBetween>
  );
}
