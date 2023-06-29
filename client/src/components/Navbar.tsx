import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import profileImage from "@/assets/react.svg";
import { useTheme } from "@emotion/react";
import { AppBar, Toolbar } from "@mui/material";

type Props = {};

export default function Navbar({}: Props) {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{justifyContent: "space-between"}}>
        {/*>>>LEFT SIDE<<<*/}
        
      </Toolbar>
    </AppBar>
  );
}
