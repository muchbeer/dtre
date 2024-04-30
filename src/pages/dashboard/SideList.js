import React, {  useMemo } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import {Typography, Box,IconButton, Tooltip, Avatar } from '@mui/material';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { styled, useTheme } from '@mui/material/styles';
import photoUrl from '../../user.jpg'
import { Dashboard, DriveFolderUpload, DvrOutlined, Logout, PeopleAlt, SendTimeExtension } from '@mui/icons-material';
import Main from './main/Main';
import Users from './users/Users';
import Airtime from './airtimes/Airtime';
import Upload from './upload/Upload';
import SendOneAirtime from './airtimes/SendOneAirtime';
import UploadMessage from './messages/UploadMessage';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const SideList = ({ open, setOpen }) => {

  const theme = useTheme();
  const [selectedLink, setSelectedLink] = useState('');
  const { state: { currentUser }, dispatch, } = useValue();

  const list = useMemo(
    () => [
      {
        title: 'Main',
        icon: <Dashboard />,
        link: '',
        component: <Main {...{ setSelectedLink, link: '' }} />,

      },
      {
        title: 'Users',
        icon: < PeopleAlt />,
        link: 'users',
        component: <Users {...{ setSelectedLink, link: 'users' }} />,
      },
      {
        title: 'Airtime',
        icon: <DvrOutlined />,
        link: 'airtime',
        component: <Airtime {...{ setSelectedLink, link: 'airtime' }} />,
      },
      {
        title: 'Upload Airtime',
        icon: <DriveFolderUpload />,
        link: 'upload',
        component: <Upload {...{ setSelectedLink, link: 'upload' }} />,
      },
      {
        title: 'Singe Airtime',
        icon: <SendTimeExtension />,
        link: 'sendairtime',
        component: <SendOneAirtime {...{ setSelectedLink, link: 'sendairtime' }} />,
      }, 
      {
        title: 'Upload Message',
        icon: <DriveFolderUpload />,
        link: 'uploadmessage',
        component: <UploadMessage {...{ setSelectedLink, link: 'uploadmessage' }} />,
      }
    ],
    []
  );

  const navigate = useNavigate();

  const handleLogout = () => {  
    navigate('/')
    dispatch( { type: 'UPDATE_USER ', payload: null } );
    window.location.reload() 
    
    
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={ () => { setOpen(false) }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

      
        <List>
          {list.map((item) => (
            <ListItem key={ item.title } disablePadding sx={{ display: 'block' }} 
        
             >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={ () => {
                dispatch( { type: 'DEACTIVATE_BOX' } ); 
                 navigate(item.link) 
                     }     
                 }
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        
        <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
          <Tooltip title={currentUser?.name || ''}>
            <Avatar
              src={ photoUrl }
              {...(open && { sx: { width: 70, height: 70 } })}
            />
          </Tooltip>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          {open && <Typography>{currentUser?.first_name}</Typography>}
          <Typography variant="body2">{currentUser?.role || 'role'}</Typography>
          {open && (
            <Typography variant="body2">{currentUser?.email}</Typography>
          )}
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={ handleLogout }>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       
        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
        </Routes>

       
      </Box>
    </>
  )
}

export default SideList