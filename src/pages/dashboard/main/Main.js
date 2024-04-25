import { ArrowUpward, Checklist, CreditScore } from '@mui/icons-material';
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useValue } from '../../../context/ContextProvider';
import { getClientUsers } from '../../../actions/users';
import photoUrl from '../../../userside.png'
import {userData} from '../../../chartdata.js'
import Chart from './Chart';
import { getBalance } from '../../../actions/balance.js';



const Main = ({ setSelectedLink, link }) => {

  const { state: { users, balance }, dispatch, } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    if (users.length === 0) getClientUsers(dispatch);
    getBalance(dispatch)  });

  const addComma = (balance_object) => {
    if(!balance_object) {
      return 'TZS ...'
    }
    const balanceInt = parseInt(balance_object.balance);
    return 'TZS'+ balanceInt.toLocaleString();
  }
  
  const addCommaSpent = (balance_object) => {
    if(!balance_object) {
      return 'TZS ...'
    }
    const balanceInt = parseInt(balance_object.balance_spent);
    return 'TZS'+ balanceInt.toLocaleString();
  }

  return (
    <Box 
     sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(3,1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column',
      }}>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant= 'h5' >Balance</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 5
          }}
        >
        <ArrowUpward  style= {{ color: "green" }} />
          <CreditScore sx={{ height: 60, width: 60, 
          opacity: 0.3,  ml : 3, mr: 1,   }} style={ {color: 'green'} } />
          <Typography variant= 'h4'> { addComma(balance)  } </Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant= 'h5' >Total Spent</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 5
          }}
        >
          <Checklist sx={{ height: 60, width: 60, opacity: 0.3, mr: 1 }} />
          <Typography variant= 'h4'> { addCommaSpent(balance) } </Typography>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: '1/4' }}>
        <Box>
          <Typography>Recently added Users</Typography>
          <List>
            {users.slice(0, 4).map((user, i) => (
              <Box key={user.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={user?.first_name} src={ photoUrl } />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user?.first_name}
                    secondary={ 'Time Created: ' + user?.register_date }
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
      <Chart data= {userData} 
          title="User Analytics"
          grid 
          dataKey="Active User"
        />
      </Paper>
    </Box>
  )
}

export default Main;