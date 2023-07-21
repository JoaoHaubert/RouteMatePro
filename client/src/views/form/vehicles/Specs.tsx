import React from "react";
import { Box, TextField, Grid } from "@mui/material";
//components
import FlexBetween from "@/components/FlexBetween";
import SaveButton from "@/components/SaveButton";

type Props = {}

export default function Specs({}: Props) {
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
            label="Example1"
            helperText="Example1"
          />
        </FlexBetween>
      </Box>
      <SaveButton />
    </Grid>
  )
}