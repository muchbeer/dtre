import React, { useEffect } from 'react'
import { useValue } from '../../../context/ContextProvider'
import { getMainContacts } from '../../../actions/contacts';
import { Box, Button, Typography } from '@mui/material';
import { UPDATE_ALERT, updateAlertFunction } from '../../../actions/utils/commonConstant';
import { dateFormating } from '../../../actions/airtimes';
import * as xls from 'xlsx'; 
import { DataGrid } from '@mui/x-data-grid';

const ViewContact = ({ setSelectedLink, link }) => {

    const { state: { currentUser,  contacts }, dispatch } = useValue();

    const user = { user: currentUser.email };
     useEffect(() => {
      setSelectedLink(link);
      getMainContacts( user, dispatch ); 
    });

    const columns = [
        { field: "id", headerName: "ID", width: 100, headerAlign: 'center', 
          align: 'center' },
        
        { field: "names", 
        headerName: "Contact Names", width: 260, 
        headerAlign: 'left',
        align: 'left' },
    
        {  field: "phone_number",  headerName: "Phonenumber",  width: 260, headerAlign: 'center' , 
            align: 'center' },
        
        {  field: "entry_date",  headerName: "Date Entered",  width: 300, headerAlign: 'center' , 
            align: 'center' },

        {  field: "tag",  headerName: "Group",  width: 300, headerAlign: 'left' , 
            align: 'left' },
      ];


      const handleDownload = (event) => {
        event.preventDefault();

        try {

            const rows = contacts.map( contact => ({
                id: contact.id,
                names: contact.names,
                phone_number: contact.phone_number,
                entry_date: contact.entry_date,
                tag: contact.tag
            }));

            const workbook = xls.utils.book_new();
            const worksheet = xls.utils.json_to_sheet(rows);
        
            xls.utils.book_append_sheet(workbook, worksheet, 'Contacts');
        
            xls.utils.sheet_add_aoa(worksheet, [
              ['ContactID', 'Contact Names', 'Phonenumber', 'Entry Date', 'Tag' ],
            ]);
        
            xls.writeFile(workbook, dateFormating(), { compression: true });
          } catch (error) {
            updateAlertFunction(dispatch, 'error', UPDATE_ALERT, error.message)
          }
      }


  return (
    <Box  
        sx={{
        height: '70%',
        width: '90%',
          }}> 
      <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
        >
          All Contacts
      </Typography>
      
      <DataGrid
        rows={ contacts }
        disableSelectionOnClick
        columns={ columns }
        initialState={{
        pagination: {
        paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection />  
        <Button sx={{ marginRight: 'auto', mt: 5, mr: 10 }} 
              variant='contained'
              onClick={ handleDownload }>Download Contacts</Button> 
      </Box> 
  )
}

export default ViewContact;