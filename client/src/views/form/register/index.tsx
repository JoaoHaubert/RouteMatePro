//@ts-nocheck
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Add } from "@mui/icons-material";
import VehicleForm from "../vehicles/VehicleForm";
type Props = {};

export default function Register({}: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="Cadastro"
          subtitle="Selecione o cadastro que deseja realizar."
        />
      </FlexBetween>
      <FlexBetween>
        <Box m="8rem 2rem 2rem 5rem">
          <Stack direction="row" spacing={20}>
            <IconButton
              onClick={() => {navigate('/new-vehicle')}}
              sx={{
                backgroundColor: theme.palette.secondary[100],
                color: theme.palette.primary[900],
                padding: "30px 50px",
                flexDirection: "column",
                borderRadius: "15px",
                border: "solid 2px",
                '&:hover': {
                  backgroundColor: "#002d5a",
                  color: "white",
                  transition: "0.5s" 
                },
              }}
            >
              <DirectionsCarFilledOutlinedIcon sx={{fontSize: "120px"}} />
              <Typography variant="h1" fontWeight="bold">Veículos</Typography>
            </IconButton>
            <IconButton
              onClick={() => {navigate('/new-driver')}}
              sx={{
                backgroundColor: theme.palette.secondary[100],
                color: theme.palette.primary[900],
                padding: "30px 20px",
                flexDirection: "column",
                borderRadius: "15px",
                border: "solid 2px",
                '&:hover': {
                  backgroundColor: "#002d5a",
                  color: "white",
                  transition: "0.5s" 
                },
              }}
            >
              <GroupAddOutlinedIcon sx={{fontSize: "120px"}} />
              <Typography variant="h1" fontWeight="bold">Condutores</Typography>
            </IconButton>
            <IconButton
              onClick={() => {navigate('/new-shop')}}
              sx={{
                backgroundColor: theme.palette.secondary[100],
                color: theme.palette.primary[900],
                padding: "30px 50px",
                flexDirection: "column",
                borderRadius: "15px",
                border: "solid 2px",
                '&:hover': {
                  backgroundColor: "#002d5a",
                  color: "white",
                  transition: "0.5s" 
                },
              }}
            >

              <StorefrontOutlinedIcon sx={{fontSize: "120px"}} />
              <Typography variant="h1" fontWeight="bold">Lojas</Typography>
            </IconButton>
          </Stack>
        </Box>
      </FlexBetween>
    </Box>
  );
}
