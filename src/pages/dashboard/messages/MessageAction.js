import React from 'react'
import { getAllMessages } from '../../../actions/messages';
import { useValue } from '../../../context/ContextProvider';
import { Box, Button } from '@mui/material';

const MessageAction = ({ params }) => {

const { dispatch } = useValue();

const { id  } = params.row;

const handleSubmit = () => {
      
    dispatch( { type: 'ACTIVATE_MESSAGE_BOX' } );
    console.log('Enable airtime id fixed to : ' + id);
    getAllMessages(id, dispatch);
        };


  return (
    <Box 
            sx={{
            m: 1,
            mb: 3,
            position: 'relative',                                 
      }}>

        <Button variant='outlined' onClick={ handleSubmit }> View Messages Received </Button>
      </Box>
  )
}

export default MessageAction