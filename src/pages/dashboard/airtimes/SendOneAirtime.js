import React, { useEffect, useState } from 'react'
import { useValue } from '../../../context/ContextProvider';
import { sendSingleAirtimeApi } from '../../../actions/airtimes';
import { UPDATE_ALERT, updateAlertFunction } from '../../../actions/utils/commonConstant';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import Notification from '../../../components/Notification';
import Loading from '../../../components/Loading';

const SendOneAirtime = ({ setSelectedLink, link }) =>  {

    const [inputs, setInput] = useState({ phonenumber : '',  amount : '' });
    const { state: { currentUser, open, balance }, dispatch } = useValue();
  
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

      const handleSendAirtime = async (event) => {
        event.preventDefault();
        
        try {
          const { phonenumber, amount} = inputs;
          const balanceInt = parseInt(balance.balance);
          const airtimeAmount = parseInt(amount);
          
          const data = [{ 
            phoneNumber:  '+' + phonenumber, 
            currencyCode:  'TZS', 
            amount: amount}];
  
          const data_api = { data: data, user: currentUser }
      
            if(  balanceInt > airtimeAmount ) {
              sendSingleAirtimeApi( data_api, dispatch );
            }  else {
              updateAlertFunction(dispatch, 'error' , UPDATE_ALERT, 'You do not have enough balance to send Airtime');  
            }
        } catch (err) {
            updateAlertFunction(dispatch, 'error', UPDATE_ALERT, err.message);
        }

        
        setInput({ phonenumber : '',  amount : '' } );
    
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
                maxWidth={400} 
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
            
        <Typography variant='h3' padding={4} textAlign={'center'}> Rusha vocha </Typography>    

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
                inputProps={{ maxLength: 12 }}
                />
      <TextField
        onChange={handleInputChange}
        name='amount'
        value={inputs.amount}
        label = 'Amount'
        placeholder='500'
        variant='outlined' 
        type='number'
        sx={ { marginTop : 3 }}
        required
        helperText = {!inputs.amount ? 'Amount is required' : '' }
        InputProps = {{ 
          startAdornment: 
          <InputAdornment  position= 'start'> TZS </InputAdornment> }}
      />

    <Button variant="outlined" type='submit'  
        sx={ { marginTop : 4 , borderRadius : 4 }}
        disabled= { open }
        onClick={ handleSendAirtime }>Send Airtime</Button>
        </Box>
    </div>
  )
}

export default SendOneAirtime;