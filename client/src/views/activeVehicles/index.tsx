import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ActiveVehicles: React.FC = () => {
  return (
    <Box>
      <Box
        bgcolor="white"
        m="0.3rem 0rem"
        p="0.8rem"
        borderRadius="8px"
        border="solid 2px #DDE6ED"
        flexDirection="column"
      >
        <Typography variant="h2" m="0.2rem 0.5rem">
          Veículos Ativos
        </Typography>
        <Button
        onClick={() => {console.log("clicked")}}
          type="submit"
          size="small"
          variant="contained"
          color="primary"
          sx={{ marginLeft: "0.5rem" }}
        >
          Criar Serviço
        </Button>
      </Box>
    </Box>
  );
};

export default ActiveVehicles;
