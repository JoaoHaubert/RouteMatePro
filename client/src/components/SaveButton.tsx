import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function SaveButton({}: Props) {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={1}
    >
      {/* Left Side */}
      <Button
        onClick={() => {navigate('/register')}}
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
          type="submit"
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
