import React from "react";
import { Box, Button } from "@mui/material";

type Props = {};

export default function SaveButton({}: Props) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={1}
    >
      {/* Left Side */}
      <Button
        size="small"
        color="error"
        sx={{
          marginLeft: "3rem",
        }}
      >
        Cancelar
      </Button>

      {/* Right Side Container */}
      <Box>
        <Button
          size="small"
          variant="outlined"
          color="info"
          sx={{ marginRight: "1rem" }}
        >
          Salvar e adicionar outro
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{ marginRight: "3rem" }}
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
