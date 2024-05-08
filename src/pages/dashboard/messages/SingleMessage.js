import React, { useEffect, useState } from 'react'
import Notification from '../../../components/Notification'
import Loading from '../../../components/Loading'
import { Box, Button, TextField, Typography } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import SenderIdMenu from './SenderIdMenu';
import { sendBulkSMSApi } from '../../../actions/messages';
import { UPDATE_ALERT, updateAlertFunction } from '../../../actions/utils/commonConstant';


const SingleMessage = ({ setSelectedLink, link }) => {

    const { state: { currentUser, open, senderName, balance },  dispatch } = useValue();
    const [inputs, setInput] = useState({ phonenumber : '',  message : '' });

    useEffect(() => {
        setSelectedLink(link);
      });

    const handleInputChange = (event) => {
        event.preventDefault();
          setInput((prevState) => ( {
              ...prevState, 
              [event.target.name] : event.target.value,
          }
       ));
      }
    const handleSendMessage = (e) => {
        e.preventDefault();

        const { phonenumber, message } = inputs;
        try {
          const balanceInt = parseInt(balance.balance);

        const message_object = { phoneNumbers: [phonenumber], sid: senderName,  message: message, user: currentUser }
 
        if(  balanceInt > 25 ) { 
            sendBulkSMSApi( message_object, dispatch );
          } else if ( 25 > balanceInt) {
            updateAlertFunction( dispatch, 'error' ,UPDATE_ALERT  , 'You do not have enough balance to send message');  
   
          } else {
            updateAlertFunction(dispatch, 'error', UPDATE_ALERT, 'Wrong input, please correct the amount')
          } 
        } catch (err) {
           updateAlertFunction( dispatch, 'error' , UPDATE_ALERT, err.message);
        }
        
    }


  return (
    <div>
    <div>
        <Notification />
        <Loading />
    </div>

    <Box
        display= 
            "flex" flexDirection={"column"} 
            maxWidth={700} 
            alignItems={"center"} 
            justifyContent={'center'} 
            margin={"auto"}
            marginTop={5}
            padding={5}
            borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}
            sx={{":hover" : {
                boxShadow : "10px 10px 20px #ccc"
            }
      }}
    >
        
    <Typography variant='h3' padding={4} textAlign={'center'}> Send Messages </Typography>    

        <TextField
            onChange={handleInputChange}
            name='phonenumber'
            value={inputs.phonenumber}
            label = 'Phone Number'
            placeholder='255754100100'
            variant='outlined'
            type='text'
            required
            helperText = {!inputs.phonenumber ? 'Phonenumber is required' : ''}
            style={{ width: 230}}
            sx={{ alignSelf: 'start' }}
            />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        ml: 0, mt: 5, 
        alignItems: 'center',
        justifyContent: 'center'
      }}
      noValidate
      autoComplete="off"
    >
       <TextField
          sx={{ mr: 5 }}
          onChange={handleInputChange}
          name='message'
          value={inputs.message}
          id="outlined-multiline-flexible"
          label="Enter the message here"
          variant='outlined'
          multiline
          rows={4}
          style={{ width: 400}}
        />
        <Typography style={{ alignSelf: 'center' }}
                    sx={{ mr: 5 }}> Character count : { inputs.message.length } </Typography>

        <SenderIdMenu />
    </Box> 

<Button variant="outlined" type='submit'  
    sx={ { marginTop : 4 , borderRadius : 4 }}
    disabled= { open }
    onClick={ handleSendMessage }>Send Message</Button>
    </Box>
</div>
  )
}

export default SingleMessage;