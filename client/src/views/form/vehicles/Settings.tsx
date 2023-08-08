import React from "react";
import {
  Box,
  TextField,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
//components
import FlexBetween from "@/components/FlexBetween";
import SaveButton from "@/components/SaveButton";
type Props = {};

export default function Settings({}: Props) {
  return (
    <FlexBetween p="15px" flexDirection="column">
      <TextField
        required
        id="outlined-required"
        type="number"
        label="Odômetro atual"
        helperText="Quilometragem do veículo"
        InputProps={{
          endAdornment: <InputAdornment position="end">km</InputAdornment>,
        }}
      />
    </FlexBetween>
  );
}
