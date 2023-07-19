//@ts-nocheck
import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Badge
} from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { useNavigate } from "react-router-dom";
//icons
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";

type Props = {};

export default function VehicleForm({}: Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [active, setActive] = useState("");
  const vehicleType = [
    { label: "Carro" },
    { label: "Caminhão" },
    { label: "Empilhadeira" },
    { label: "Moto" },
    { label: "Ônibus" },
    { label: "SUV" },
  ];
  const vehicleStatus = [
    { label: "Ativo"},
    { label: "Inativo"},
    { label: "Fora de serviço"},
    { label: "Vendido"},
  ]
  const vehicleOwnership = [
    { label: "Próprio" },
    { label: "Alugado" },
    { label: "Cliente" },
    { label: "Arrendado" },
  ]
  const navItems = [
    {
      text: "Identificação",
      icon: <SummarizeOutlinedIcon />,
    },
    {
      text: "Especificações",
      icon: <ListAltOutlinedIcon />,
    },
    {
      text: "Lembrarei",
      icon: <ListAltOutlinedIcon />,
    },
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
          <Box
            borderRadius={4}
            sx={{
              width: "85%",
              minWidth: 200,
              bgcolor: "#ffffff",
              marginTop: "2rem",
              border: "solid 1px #DDE6ED",
            }}
          >
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem " }}>
                      {text}
                    </Typography>
                  );
                }

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setActive(text);
                      }}
                      sx={{
                        color:
                          active === text
                            ? theme.palette.primary[900]
                            : theme.palette.grey[600],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                          active === text
                            ? theme.palette.primary[900]
                            : theme.palette.grey[600],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Grid>
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
                label="Nome do Veiculo"
                helperText="Dê um nome, código ou apelido para o veículo."
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={vehicleType}
                renderInput={(params) => (
                  <TextField {...params} label="Tipo do Veiculo" />
                )}
              />
             <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={vehicleStatus}
                renderInput={(params) => (
                  <TextField {...params} label="Status do Veiculo" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={vehicleOwnership}
                renderInput={(params) => (
                  <TextField {...params} label="Propriedade" />
                )}
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
