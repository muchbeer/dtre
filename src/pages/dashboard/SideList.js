import React, {  useEffect, useMemo } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import {Typography, Box,IconButton, Tooltip, Avatar, Collapse } from '@mui/material';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { styled, useTheme } from '@mui/material/styles';
import photoUrl from '../../user.jpg'
import { Logout, MessageOutlined ,
        ExpandMore,  ExpandLess, PostAddOutlined, DeckOutlined,
        ContactPhone} from '@mui/icons-material';
import Main from './main/Main';
import Airtime from './airtimes/Airtime';
import Upload from './upload/Upload';
import SendOneAirtime from './airtimes/SendOneAirtime';
import UploadMessage from './messages/UploadMessage';
import Messages from './messages/Messages';
import SingleMessage from './messages/SingleMessage';
import Contacts, { Root } from './contacts/Contacts';
import ViewContact from './contacts/ViewContact';
import { blue, grey } from '@mui/material/colors';
import { getUserSIDs } from '../../actions/messages';
import OneMessage from './messages/OneMessage';


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
  const [isOpen, setIsOpen] = useState(false);
  const highligheadcolor = blue[700];
  const highlighmenucolor = blue[400];
  const highlighgrey = grey[200];
  const [mIndex, setIndex] = useState(null);

  
  useEffect(() => {
    getUserSIDs(currentUser.email, dispatch);
  });

  const list = useMemo(
    () => [
      {
        title: 'Main',
        icon: <DeckOutlined />,
        link: '',
        component: <Main {...{ setSelectedLink, link: '' }} />,
        expand: false,
        submenu: [],
      },
      {
        title: 'Contact',
        icon: <ContactPhone />,
        
        submenu: [
          {
            title: 'Save Contact',
            link: 'contact',
            component: <Contacts {...{ setSelectedLink, link: 'contact' }} />,
          }, 
          {
            title: 'View Contact',
            link: 'viewcontact',
            component: <ViewContact { ... { setSelectedLink, link: 'viewcontact' }} />
          }
        ],
        expand: true,
      },
      {
        title: 'Airtime',
        icon: <PostAddOutlined />,
        submenu: [
          {
            title: 'Singe Airtime',
            link: 'sendairtime',
            component: <SendOneAirtime {...{ setSelectedLink, link: 'sendairtime' }} />,
          }, 
         {
            title: 'Upload Airtime',
            link: 'upload',
            component: <Upload {...{ setSelectedLink, link: 'upload' }} />,
          },
          {
            title: 'View Airtime',
            link: 'airtime',
            component: <Airtime {...{ setSelectedLink, link: 'airtime' }} />,
          },
      ],
        expand: true, 
      },
      {
        title: 'Messages',
        icon: <MessageOutlined />,
        submenu: [
          {
            title: 'Upload Message',
            link: 'uploadmessage',
            component: <UploadMessage {...{ setSelectedLink, link: 'uploadmessage' }} />,
          }, 
          {
            title: 'Send From Contact',
            link: 'onemessage', 
            component: <SingleMessage {...{ setSelectedLink, link: 'onemessage'}} />,
          },
          {
            title: 'Send Message',
            link: 'singlemessage', 
            component: <OneMessage {...{ setSelectedLink, link: 'singlemessage'}} />,
          },
          {
            title: 'View Messages',
            link: 'messages',
            component: <Messages {...{ setSelectedLink, link: 'messages' }} />,
          },
      
        ],
        expand: true,
        
      },
    ],
    []
  );

  const handleSubItemClick = (isExpand, index) => {
    if (isExpand) {
      setIsOpen(!isOpen);
      setIndex(index);
    }
    
  };

  const navigate = useNavigate();

  const handleLogout = () => {  
    navigate('/')
    dispatch( { type: 'UPDATE_USER ', payload: null } );
    window.location.reload() 
    
    
  };

  return (
    <>
      <Drawer variant="permanent" open={ open }>
        <DrawerHeader>
          <IconButton onClick={ () => { setOpen(false) }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

      
        <List sx={{ 
           // selected and (selected + hover) states
          '&& .Mui-selected, && .Mui-selected:hover': {
          bgcolor: highligheadcolor,
          '&, & .MuiListItemIcon-root': {
          color: 'white',
            },
          },
              // hover states
          '& .MuiListItemButton-root:hover': {
          bgcolor: highligheadcolor,
          '&, & .MuiListItemIcon-root': {
          color: 'white',
      },
    },
         }} >
          {list.map(( item, index ) => (
            <ListItem key={ item.title } disablePadding sx={{ display: 'block' }} 
        
             >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={ () => {
                dispatch({ type: 'DEACTIVATE_BOX' }); 
                dispatch({ type: 'DEACTIVATE_MESSAGE_BOX' });
                 navigate(item.link);
                 handleSubItemClick(item.expand, index);
                     }     
                 }
                selected={ selectedLink === item.link }
 
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  { item.icon }
                </ListItemIcon>

                <ListItemText primary={ item.title } sx={{ opacity: open ? 1 : 0 }} />

                {  (item.expand && open) && ( isOpen ? <ExpandLess /> : <ExpandMore /> ) }
              
              </ListItemButton>

              <Collapse in={ (isOpen && open && mIndex === index) } timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                  { item.submenu.map((subitem) => (
                    <ListItem key={ subitem.title } disablePadding sx={{ display: 'block' }} 
                     >
                    <ListItemButton sx={{ pl: 4,  backgroundColor : mIndex === index ? highlighmenucolor : highlighgrey }} 
                
                      onClick={ () => {
                        dispatch({ type: 'DEACTIVATE_BOX' }); 
                        dispatch({ type: 'DEACTIVATE_MESSAGE_BOX' });
                        navigate(subitem.link);
                       }}
                      selected = { selectedLink === subitem.link }
                    >
                    <ListItemText primary={ subitem.title} sx={{ opacity: open ? 1 : 0 }}  />
                  </ListItemButton>
                  </ListItem>
                  )) }
                  
                </List>
              </Collapse>
            </ListItem>
          ))}
        </List>
        <Divider />
        
        <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
          <Tooltip title={ currentUser?.name || '' }>
            <Avatar
              src={ photoUrl }
              {...(open && { sx: { width: 70, height: 70 } })}
            />
          </Tooltip>
        </Box>
        <Root>
        <Box sx={{ textAlign: 'center' }}>
          {open && <Typography>{ currentUser?.first_name }</Typography>}
          <Typography variant="body2">{ currentUser?.role || 'role'}</Typography>
          { open && (
            <Typography variant="body2">{ currentUser?.email }</Typography>
          )}

          <Divider textAlign='center' sx={{ marginTop: 4 }}> Logout </Divider>

            <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={ handleLogout }>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
        </Root>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       
        <Routes>
          {list.map(( item ) => {

            if(item.expand) {
              return  item.submenu.map(( submenu ) => <Route key={ submenu.title } path={ submenu.link } element={ submenu.component } /> )
            } else {
              return <Route key={ item.title } path={ item.link } element={ item.component } />
            }
              
          }
          )}
        </Routes>

       
      </Box>
    </>
  )
}

export default SideList;