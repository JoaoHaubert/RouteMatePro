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
} from "@mui/material";

import { useNavigate } from "react-router-dom";
//icons
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
//forms
import Identification from "./Identification";
import Specs from "./Specs";
import Performance from "./Performance";
import Settings from "./Settings";

type Props = {};

export default function VehicleForm({}: Props) {
  const [activeSection, setActiveSection] = useState<
    "identification" | "specs" | "settings"
  >("identification");

  const handleNavigation = (
    sectionId: "identification" | "specs" | "settings"
  ) => {
    setActiveSection(sectionId);
  };
  const navigate = useNavigate();
  const theme = useTheme();
  const [active, setActive] = useState("");

  const navItems = [
    {
      text: "Identificação",
      icon: <SummarizeOutlinedIcon />,
      route: "identification"
    },
    {
      text: "Especificações",
      icon: <ListAltOutlinedIcon />,
      route: "specs"
    },
    {
      text: "Performance",
      icon: <SpeedOutlinedIcon />,
      route: "performance"
    },
    {
      text: "Configurações",
      icon: <SettingsOutlinedIcon/>,
      route: "settings"
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
                        handleNavigation(route)
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
        {activeSection === "identification" && <Identification/>}
        {activeSection === "specs" && <Specs/>}
        {activeSection === "performance" && <Performance/>}
        {activeSection === "settings" && <Settings/>}
      </Grid>
    </Box>
  );
}
