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
//icons
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
//forms
import PersonalDetails from "./PersonalDetails";
import BasicDetails from "./BasicDetails";
import SaveButtonDriver from "@/components/SaveButtonDriver";
import { FormDriverProvider } from "@/components/FormContextDriver";
type Props = {};


enum FormWindows {
  basic,
  personal,
}
export default function DriverForm({}: Props) {
  const theme = useTheme();
  const [active, setActive] = useState("");
  const [currentForm, setCurrentForm] = useState(FormWindows.basic);
  const handleSidebarItemClick = (form: FormWindows) => {
    setCurrentForm(form);
  };


  const navItems = [
    {
      text: "Dados Básicos",
      icon: <EmojiEmotionsOutlinedIcon />,
      route: FormWindows.basic,
    },
    {
      text: "Dados Pessoais",
      icon: <DescriptionOutlinedIcon />,
      route: FormWindows.personal,
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
            navigate("/drivers");
          }}
          sx={{
            fontSize: "10px",
          }}
        >
          Voltar para condutores
        </Button>
        <Typography variant="h2" m="0.2rem 0.5rem">
          Novo Condutor(a)
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
                        handleSidebarItemClick(route);
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
        <Grid item>
          <FormDriverProvider>
            <Box
              component="form"
              bgcolor="#fff"
              border="solid 1px #DDE6ED"
              borderRadius={4}
              m="2rem 2.5rem"
              sx={{
                "& .MuiTextField-root": { m: 2, width: "90ch" },
              }}
              noValidate
              autoComplete="off"
            >
              {currentForm === FormWindows.basic && <BasicDetails />}
              {currentForm === FormWindows.personal && <PersonalDetails />}
            </Box>
            <SaveButtonDriver />
          </FormDriverProvider>
        </Grid>
      </Grid>
    </Box>
  );
}
