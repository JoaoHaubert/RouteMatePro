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
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
//forms
import PersonalDetails from "./PersonalDetails";
type Props = {}

export default function DriverForm({}: Props) {
  const [activeSection, setActiveSection] = useState<
  "personal" | "specs" | "settings"
>("personal");

const handleNavigation = (
  sectionId: "personal" | "specs" | "settings"
) => {
  setActiveSection(sectionId);
};
const navigate = useNavigate();
const theme = useTheme();
const [active, setActive] = useState("");

const navItems = [
  {
    text: "Dados Pessoais",
    icon: <EmojiEmotionsOutlinedIcon/>,
    route: "personal"
  },
  {
    text: "Especificações",
    icon: <EmojiEmotionsOutlinedIcon/>,
    route: "specs"
  },
  {
    text: "Performance",
    icon: "a",
    route: "performance"
  },
  {
    text: "Configurações",
    icon: "b",
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
      {activeSection === "personal" && <PersonalDetails/>}
      
    </Grid>
  </Box>
)
}