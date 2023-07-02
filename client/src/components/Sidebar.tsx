import React, { ReactNode } from 'react'
//icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import HistoryIcon from '@mui/icons-material/History';
type Props = {}

const navItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    text: "Cadastros",
    icon: <AppRegistrationIcon />
  },
  {
    text: "Veiculos",
    icon: <DirectionsCarIcon />,
  },
  {
    text: "Veiculos Ativos",
    icon: <NoCrashIcon />,
  },
  {
    text: "Manutencoes",
    icon: <BuildIcon />,
  },
  {
    text: "Condutores",
    icon: <PeopleIcon />,
  },
  {
    text: "Lojas",
    icon: <StoreIcon />,
  },
  {
    text: "Historico",
    icon: <HistoryIcon />,
  },
]
export default function Sidebar({}: Props) {
  return (
    <div>Sidebar</div>
  )
}