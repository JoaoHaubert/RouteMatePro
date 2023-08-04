//@ts-nocheck
import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  TextField,
  Autocomplete
} from "@mui/material";
//components
import SaveButton from "@/components/SaveButton";
//icons
//import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
//forms
import Identification from "./Identification";
//import Specs from "./Specs";
import Performance from "./Performance";
import Settings from "./Settings";


type Props = {};

enum FormWindows {
  identification,
  performance,
  settings,
}
export default function VehicleForm({}: Props) {
  const theme = useTheme();
  const [active, setActive] = useState("");
  const [currentForm, setCurrentForm] = useState(FormWindows.identification)
  const handleSidebarItemClick = (form: FormWindows) => {
    setCurrentForm(form);
  };
   // Initialize state for input values
   const [formValues, setFormValues] = useState({
    vehicleName: "",
    vehicleTag: "",
    vehicleType: null,
    vehicleStatus: null,
    vehicleOwnership: null,
    vehicleGroup: "",
  });

  // Helper function to handle changes in the input fields
  const handleChange = (name: string, value: any) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };
  const vehicleType = [
    { value: "car", label: "Carro" },
    { label: "Caminhão" },
    { label: "Empilhadeira" },
    { label: "Furgão" },
    { label: "Moto" },
    { label: "Ônibus" },
    { label: "SUV" },
    { label: "Van" },
  ];
  const vehicleStatus = [
    { value: "active", label: "Ativo" },
    { label: "Inativo" },
    { label: "Fora de serviço" },
    { label: "Vendido" },
  ];
  const vehicleOwnership = [
    { value: "owner", label: "Próprio" },
    { label: "Alugado" },
    { label: "Cliente" },
    { label: "Arrendado" },
  ];

  const navItems = [
    {
      text: "Identificação",
      icon: <SummarizeOutlinedIcon />,
      route: FormWindows.identification
    },
    {
      text: "Performance",
      icon: <SpeedOutlinedIcon />,
      route: FormWindows.performance
    },
    {
      text: "Configurações",
      icon: <SettingsOutlinedIcon/>,
      route: FormWindows.settings
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
              {navItems.map(({ text, icon, route }) => {
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
                        handleSidebarItemClick(route)
                        setActive(route);
                      }}
                      sx={{
                        color:
                          active === route
                            ? theme.palette.primary[900]
                            : theme.palette.grey[600],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                            active === route
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
        {currentForm === FormWindows.identification && (
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
            <Identification
              formValues={formValues}
              handleChange={handleChange}
              vehicleType={vehicleType}
              vehicleStatus={vehicleStatus}
              vehicleOwnership={vehicleOwnership}
            />
          </Box>
        </Grid>
        )}
        {currentForm === FormWindows.performance && <Performance/>}
        {currentForm === FormWindows.settings && <Settings/>}
      </Grid>
        <SaveButton />
    </Box>
  );
}
