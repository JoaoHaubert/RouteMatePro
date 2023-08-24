import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/components/FormContextVehicles";


const SaveButton: React.FC = () => {
  const navigate = useNavigate();
  const { submitForms } = useFormContext();
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
        marginLeft: "2rem",
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
      onClick={submitForms}
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
};

export default SaveButton