import { Box, Typography } from '@mui/material'
import React from 'react'
import { useValue } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const HomeLogin = () => {

    const { state: { currentUser } } = useValue(); 

    const navigate = useNavigate();
  return (
    <Box sx={{
      height: '100%',
      width: '100%', }} >
      

        <Typography variant="h5"
                    component="h5"
                    sx={{ textAlign: 'center', mt: 5, mb: 5 }} >
            Mayaki Portal
        </Typography>

        { currentUser && navigate('/dashboard')  }


    </Box>
  )
}

export default HomeLogin;