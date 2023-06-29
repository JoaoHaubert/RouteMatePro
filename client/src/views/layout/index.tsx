import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

type Props = {};

export default function Layout({}: Props) {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
            isNonMobile={isNonMobile}
        />
      <Box>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
}
