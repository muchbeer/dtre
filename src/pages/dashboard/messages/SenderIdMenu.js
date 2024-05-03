import { List, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useValue } from '../../../context/ContextProvider';

const senderIds = [
    'Sender Name',
    'IVP Malawi',
    'FARAS',
    'HARUSI',
    'INFORM',
    '	KKKT-KIBADA'
  ];

const SenderIdMenu = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const open = Boolean(anchorEl);

    const { dispatch } = useValue();
    useEffect( () => {
      dispatch( { type: 'UPDATE_SID', payload: senderIds[selectedIndex] } );
    }, [dispatch, selectedIndex])
    
    const handleClickListItem = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setAnchorEl(null);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <div>
    <List
      component="nav"
      aria-label="Device settings"
      sx={{ bgcolor: 'background.paper', alignSelf: 'center'}}
      
    >
      <ListItemButton
        id="lock-button"
        aria-haspopup="listbox"
        aria-controls="lock-menu"
        aria-label="Select Sender ID Name"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickListItem}
      >
        <ListItemText
          primary="Select Sender ID Name"
          secondary={ senderIds[selectedIndex]}
        />
      </ListItemButton>
    </List>
    <Menu
      id="lock-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'lock-button',
        role: 'listbox',
      }}
    >
      { senderIds.map((option, index) => (
        <MenuItem
          key={option}
          disabled={index === 0}
          selected={index === selectedIndex}
          onClick={(event) => handleMenuItemClick(event, index)}
        >
          {option}
        </MenuItem>
      ))}
    </Menu>
  </div>
  )
}

export default SenderIdMenu;