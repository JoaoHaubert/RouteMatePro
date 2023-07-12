//@ts-nocheck
import React from 'react'
import { Typography, Box, useTheme } from '@mui/material'


interface HeaderProps {
    title?: any
    subtitle?: any
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
    const theme = useTheme();
 return (
    <Box>
        <Typography
            variant='h3'
            color={ theme.palette.grey[900] }
            fontWeight="bold"
            sx={{ mb: "5px"}}
        >
            {title}
        </Typography>
        <Typography
            variant='h5'
            color={ theme.palette.grey[700] }
        >
            {subtitle}
        </Typography>
    </Box>
 )
}

export default Header