import { Box, Button } from '@mui/material';
import React from 'react'
import { useValue } from '../../../context/ContextProvider';
import { getAllAirtimes } from '../../../actions/airtimes';

const AirtimeAction = ({ params }) => {

    const { dispatch } = useValue();

    const { id  } = params.row;

    const handleSubmit = () => {
     
    
        dispatch( { type: 'ACTIVATE_BOX' } );
        console.log('Enable airtime id fixed to : ' + id);
        getAllAirtimes(id, dispatch);

            };

  return (
    <Box 
            sx={{
            m: 1,
            mb: 3,
            position: 'relative',                                 
      }}>

        <Button variant='outlined' onClick={ handleSubmit }>View Airtime Received</Button>
      </Box>
  )
}

export default AirtimeAction