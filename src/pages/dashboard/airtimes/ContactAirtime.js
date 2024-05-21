import React, { useEffect, useState } from 'react'
import Notification from '../../../components/Notification'
import Loading from '../../../components/Loading'
import { Box, Button, TextField, Typography, Switch, FormControlLabel } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { UPDATE_ALERT, updateAlertFunction } from '../../../actions/utils/commonConstant';
import Autocomplete from '@mui/material/Autocomplete';
import { getSelectedGroups, getSelectedNames, getSelectedNumbers } from '../../../actions/contacts';

const ContactAirtime = () => {

    const { state: { currentUser, open, senderName, balance, names, groups },  dispatch } = useValue();
    const [ inputs, setInput ] = useState({ phonenumber : '',  amount : '' });
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
    <div>ContactAirtime</div>
  )
}

export default ContactAirtime