//@ts-nocheck
import React, { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import BuildIcon from "@mui/icons-material/Build";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import HistoryIcon from "@mui/icons-material/History";
//MUI
import {
  useTheme,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight, ReplyTwoTone } from "@mui/icons-material";
//components
import FlexBetween from "@/components/FlexBetween";
import profileImage from "@/assets/react.svg";

const navItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    route: "dashboard",
  },
  {
    text: "Cadastros",
    icon: <AppRegistrationIcon />,
    route: "register",
  },
  {
    text: "Veiculos",
    icon: <DirectionsCarIcon />,
    route: "vehicles",
  },
  {
    text: "Veiculos Ativos",
    icon: <NoCrashIcon />,
    route: "active-vehicles",
  },
  {
    text: "Manutencoes",
    icon: <BuildIcon />,
    route: "maintenance",
  },
  {
    text: "Condutores",
    icon: <PeopleIcon />,
    route: "drivers",
  },
  {
    text: "Lojas",
    icon: <StoreIcon />,
    route: "shop",
  },
  {
    text: "Historico",
    icon: <HistoryIcon />,
    route: "historic",
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}: any) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: "white",
              backgroundColor: theme.palette.primary[600],
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 2.5rem">
              <FlexBetween color={theme.palette.secondary[100]}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h3" fontWeight="bold">
                    RouteMatePro
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, route }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${route}`);
                        setActive(route);
                      }}
                      sx={{
                        borderRadius: "50px",
                        backgroundColor:
                          active === route
                            ? theme.palette.primary[500]
                            : "transparent",
                        color:
                          active === route
                            ? theme.palette.secondary[200]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          p: "0.4rem",
                          ml: "1rem",
                          color:
                            active === route
                              ? theme.palette.secondary[200]
                              : theme.palette.secondary[100],
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
          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5 rem 2rem 0 3rem"
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.primary[100]}}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.7rem"
                  sx={{ color: theme.palette.primary[200]}}
                >
                  {user.occupation}
                </Typography>
              </Box>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
