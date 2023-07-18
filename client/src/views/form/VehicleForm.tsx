import * as React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Typography,
  Autocomplete,
  TextField,
  Drawer,
  IconButton,
  ButtonGroup,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { useNavigate } from "react-router-dom";
//icons
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

type Props = {};

export default function VehicleForm({}: Props) {
  const navigate = useNavigate();
  const vehicleType = [
    { label: "Carro" },
    { label: "Caminhão" },
    { label: "Empilhadeira" },
    { label: "Ônibus" },
    { label: "SUV" },
  ];
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
        <Button
          onClick={() => {
            navigate("/vehicles");
          }}
          sx={{
            fontSize: "10px",
          }}
        >
          Voltar para veiculos
        </Button>
        <Typography variant="h2" m="0.2rem 0.5rem">
          Novo Veiculo
        </Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <ListItem>
            
          </ListItem>
        </Grid>
        <Grid item>
          <Box
            bgcolor="#fff"
            border="solid 1px #DDE6ED"
            borderRadius={4}
            m="2rem 2.5rem"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <FlexBetween p="15px" flexDirection="column">
              <TextField
                required
                id="outlined-required"
                label="Nome do Veiculo"
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={vehicleType}
                renderInput={(params) => (
                  <TextField {...params} label="Tipo do Veiculo" />
                )}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <TextField
                id="outlined-read-only-input"
                label="Read Only"
                defaultValue="Hello World"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-search"
                label="Search field"
                type="search"
              />
              <TextField
                id="outlined-helperText"
                label="Helper text"
                defaultValue="Default Value"
                helperText="Some important text"
              />
            </FlexBetween>
          </Box>
        </Grid>
      </Grid>
      
    </Box>
  );
}
