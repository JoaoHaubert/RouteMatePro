//@ts-nocheck
//import React from "react";
import FlexBetween from "@/components/FlexBetween";
import Header from "@/components/Header";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
type Props = {};

export default function Register({}: Props) {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="Cadastro"
          subtitle="Selecione o cadastro que deseja realizar."
        />
      </FlexBetween>
      <FlexBetween>
        <Box>
          <Stack direction="row" spacing={4}>
            <IconButton
              sx={{
                backgroundColor: theme.palette.secondary[100],
                color: theme.palette.primary[900],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DirectionsCarFilledOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: theme.palette.secondary[100],
                color: theme.palette.primary[900],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <GroupAddOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: theme.palette.secondary[100],
                color: theme.palette.primary[900],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <StorefrontOutlinedIcon />
            </IconButton>
          </Stack>
        </Box>
      </FlexBetween>
    </Box>
  );
}
