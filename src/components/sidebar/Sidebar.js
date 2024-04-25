import React from 'react'
import { Drawer, Typography, styled } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = ({ isOpen, setIsOpen }) => {

  return (
    <Drawer variant="persistent" 
    hideBackdrop={true} 
    open={isOpen}>
        <DrawerHeader>
            <Typography>Menu for the Dashoard </Typography>
        </DrawerHeader>
    </Drawer>
  )
}

export default Sidebar