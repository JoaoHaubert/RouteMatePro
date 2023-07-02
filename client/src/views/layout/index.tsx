//@ts-nocheck
import { ReactNode, useState, HTMLAttributes } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";




type Props = {}


export default function Layout({}: Props) {
  const isNonMobile = useMediaQuery<string>("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <Box  display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
        <Sidebar
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        /> 
      <Box flexGrow={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}
