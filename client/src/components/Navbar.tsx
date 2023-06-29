import React, { useState } from "react";
import { useDispatch } from "react-redux";
//MUI IMPORTS
import { Menu as MenuIcon, Search } from "@mui/icons-material";
import { Icon, InputBase, useTheme } from "@mui/material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
//COMPONENTS IMPORTS
import FlexBetween from "./FlexBetween";
//SVG IMPORTS
import profileImage from "@/assets/react.svg";

type Props = {};

export default function Navbar({}: Props) {
  const { palette } = useTheme();
  const dispatch = useDispatch();

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/*>>>LEFT SIDE<<<*/}
        <FlexBetween>
          <IconButton onClick={() => console.log("sidebar open")}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            bgcolor={palette.background.default}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/*>>>RIGHT SIDE<<<*/}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => console.log("add button")}>
            <AddIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton onClick={() => console.log("notification button")}>
            <NotificationsIcon sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
