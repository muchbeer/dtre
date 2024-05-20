import React, { useEffect, useState } from 'react'
import Notification from '../../../components/Notification'
import Loading from '../../../components/Loading'
import { Box, Button, TextField, Typography, Switch, FormControlLabel } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import SenderIdMenu from './SenderIdMenu';
import { sendBulkSMSApi } from '../../../actions/messages';
import { UPDATE_ALERT, updateAlertFunction } from '../../../actions/utils/commonConstant';
import Autocomplete from '@mui/material/Autocomplete';
import { getSelectedGroups, getSelectedNames, getSelectedNumbers } from '../../../actions/contacts';


const SingleMessage = ({ setSelectedLink, link }) => {

    const { state: { currentUser, open, senderName, balance, names, groups },  dispatch } = useValue();
    const [ inputs, setInput ] = useState({ phonenumber : '',  message : '' });
    const [ selectedNumber, setSelectedNumber ] = useState([]);
    const [ checked, setIsChecked ] = useState(false);
    const user = { user: currentUser.email };

    useEffect(() => {
        setSelectedLink( link );
        if(names.length === 0) {
          getSelectedNames( user, dispatch )
        }
        if(groups.length === 0) {
          getSelectedGroups( user, dispatch )
        } 
       
      });

    const handleInputChange = (event) => {
        event.preventDefault();
          setInput((prevState) => ( {
              ...prevState, 
              [event.target.name] : event.target.value,
          }
       ));
      };

    const handleSendMessage = (e) => {
        e.preventDefault();

        const { phonenumber, message } = inputs;
        try {
          const balanceInt = parseInt(balance.balance);
          //const activeNumber = selectedNumber ? selectedNumber : phonenumber;

        const message_object = { phoneNumbers:  selectedNumber , sid: senderName,  message: message, user: currentUser }
 
        if(  balanceInt > 25 ) { 
            sendBulkSMSApi( message_object, dispatch );
          } else if ( 25 > balanceInt) {
            updateAlertFunction( dispatch, 'error' ,UPDATE_ALERT  , 'You do not have enough balance to send message');  
   
          } else {
            updateAlertFunction( dispatch, 'error', UPDATE_ALERT, 'Wrong input, please correct the amount')
          } 
        } catch (err) {
           updateAlertFunction( dispatch, 'error' , UPDATE_ALERT, err.message);
        }
        setInput({ phonenumber : '',  message : '' } );
    }

    const contactLabel = names?.map(contact => {
      return { label: contact.names, id: contact.id, phonenumber: contact.phone_number };
    });

    const groupLabel = groups?.map(contact => {
      return { label: contact.tag , group: contact.tag }
    });


    const handleSelection = async(event, value) => {
      if (checked) {
          const data = { user: currentUser.email, group: value?.group }
          const groupNumbers = await getSelectedNumbers( data , dispatch );
          const groupNumOnly = groupNumbers.map(number => number.phone_number )
          setSelectedNumber(groupNumOnly);
      } else { 
        setSelectedNumber(value?.phonenumber); }
      
    };

    const handleGroup = (event) => {
      setIsChecked(event.target.checked);
      }
  return (
    <div>
    <div>
        <Notification />
        <Loading />
    </div>

    <form onSubmit= { handleSendMessage } >
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

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        ml: 0, mt: 5, 
        alignItems: 'left',
        justifyContent: 'left'
      }}
      noValidate
      autoComplete="off"
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={ checked ? groupLabel : contactLabel }
        isOptionEqualToValue={ (option, value)=>  checked ? ( option.group === value.group ) : ( option.id === value.id  ) }    
        onChange={ handleSelection }
        sx={{ width: 300 , marginRight: 8 , alignSelf: 'start' }}
        renderInput={( params ) => {
         return <TextField {...params} 
            label= { checked ? 'Enter group name' : 'Enter name' } 
            required
          /> 
        }  
      }
    />

  <FormControlLabel control={ <Switch 
    checked= { checked } 
    onChange={ handleGroup }
    /> } label= { checked ? 'Set Normal contact' : 'Set Group contact' } />


    </Box>
    
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
          required
        />
        <Typography style={{ alignSelf: 'center' }}
                    sx={{ mr: 5 }}> Character count : { inputs.message.length } </Typography>

        <SenderIdMenu />
    </Box> 

    <Button variant="outlined" type='submit'
      sx={ { marginTop : 4 , borderRadius : 4 }}
      disabled= { open && !senderName } 
      >Send Message</Button>
    </Box>

    </form>
</div>
  )
}

export default SingleMessage;