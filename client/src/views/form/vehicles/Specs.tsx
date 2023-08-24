import React from "react";
import { Box, TextField, Grid, InputAdornment } from "@mui/material";
//components
import FlexBetween from "@/components/FlexBetween";
import SaveButton from "@/components/SaveButtonVehicles";

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
            id="outlined-number"
            type="number"
            label="Largura"
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
          />   
          <TextField
            id="outlined-number"
            type="number"
            label="Altura"
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
          />   
          <TextField
            id="outlined-number"
            type="number"
            label="Comprimento"
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
          />   
          <TextField
            id="outlined-number"
            type="number"
            label="Quantidade de Passageiros"
            InputProps={{
              endAdornment: <InputAdornment position="end">un</InputAdornment>,
            }}
          />   
          <TextField
            id="outlined-number"
            type="number"
            label="Volume Carga"
            InputProps={{
              endAdornment: <InputAdornment position="end">m3</InputAdornment>,
            }}
          />   
          <TextField
            id="outlined-number"
            type="number"
            label="Volume Interior"
            InputProps={{
              endAdornment: <InputAdornment position="end">m3</InputAdornment>,
            }}
          />   
          <TextField
            id="outlined-number"
            type="number"
            label="Peso Total do Veículo"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />   
          <TextField
            id="outlined-number"
            type="number"
            label="Peso Total com Carga e Passageiros"
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />   
        
        </FlexBetween>
      </Box>
      <SaveButton />
    </Grid>
  )
}