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
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
//forms
import BasicDetails from "./BasicDetails";
import AddressDetails from "./AddressDetails";
type Props = {};

enum FormWindows {
  basic,
  address,
}

export default function ShopForm({}: Props) {
  const [activeSection, setActiveSection] = useState<"basic" | "address">(
    "basic"
  );

  const handleNavigation = (sectionId: "basic" | "address") => {
    setActiveSection(sectionId);
  };
  const navigate = useNavigate();
  const theme = useTheme();
  const [active, setActive] = useState("");

  const navItems = [
    {
      text: "Dados Básicos",
      icon: <StorefrontOutlinedIcon />,
      route: "basic",
    },
    {
      text: "Endereço",
      icon: <DescriptionOutlinedIcon />,
      route: "address",
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
            navigate("/shop");
          }}
          sx={{
            fontSize: "10px",
          }}
        >
          Voltar para lojas
        </Button>
        <Typography variant="h2" m="0.2rem 0.5rem">
          Nova Loja
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
                        handleNavigation(route);
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
        {activeSection === "basic" && <BasicDetails />}
        {activeSection === "address" && <AddressDetails />}
      </Grid>
    </Box>
  );
}
