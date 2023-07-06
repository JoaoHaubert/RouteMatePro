//@ts-nocheck
import React, { useState } from "react";
import { useDispatch } from "react-redux";
//MUI IMPORTS
import { Menu as MenuIcon, Search } from "@mui/icons-material";
import {InputBase, useTheme } from "@mui/material";
import { AppBar, IconButton, Toolbar,  } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import NotificationsIcon from "@mui/icons-material/Notifications";
//COMPONENTS IMPORTS
import FlexBetween from "./FlexBetween";
//SVG IMPORTS
import profileImage from "@/assets/react.svg";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
          <IconButton
            sx={{ color: "black" }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon />
          </IconButton>
          <FlexBetween
            bgcolor="white"
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton sx={{ color: "black" }}>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/*>>>RIGHT SIDE<<<*/}
        <FlexBetween gap="1.5rem">
          <IconButton
            sx={{ color: "black" }}
            onClick={() => console.log("add button")}
          >
            <AddIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton
            sx={{ color: "black" }}
            onClick={() => console.log("notification button")}
          >
            <NotificationsIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton
            sx={{ color: "black" }}
            onClick={() => console.log("help button")}
          >
            <QuestionMarkIcon sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
