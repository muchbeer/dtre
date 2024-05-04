import React, { useEffect } from 'react'
import { useValue } from '../../../context/ContextProvider';
import { Box, Button, Typography } from '@mui/material';
import { UPDATE_ALERT, updateAlertFunction } from '../../../actions/utils/commonConstant';
import { getMainMessages } from '../../../actions/messages';
import MessageAction from './MessageAction';
import { dateFormating } from '../../../actions/airtimes';
import * as xls from 'xlsx'; 
import { DataGrid } from '@mui/x-data-grid';

  const Messages = ({ setSelectedLink, link }) => {

  const { state: { currentUser,  messages, messages_received, activateMessageBox }, dispatch } = useValue();
  const data_api = { user: currentUser };

  useEffect(() => {
    setSelectedLink(link);
    getMainMessages( data_api, dispatch );
  });

  const columns = [
    { field: "id", headerName: "ID", width: 100, headerAlign: 'center', 
      align: 'center' },
    
    { field: "user_message", 
    headerName: "Message", width: 260, 
    headerAlign: 'left',
    align: 'left' },

    {  field: "connect_date",  headerName: "Date Sent",  width: 300, headerAlign: 'center' , 
        align: 'center'},
    
    {
      field: "action",
      headerName: "Action",
      width: 280, 
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <>
            <MessageAction  {...{ params }} />
          </>
        );
      },
    },
  ];

  const received_message_columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "phone_number", headerName: "Phone Number", width: 120, flex: 1 },
    {  field: "message_cost",  headerName: "Price",  width: 200, flex: 1 }, 
    {  field: "status",  headerName: "Status",  width: 200, flex: 1 }];

  
  const handleDownload = (event) => {
      event.preventDefault();
  
      const rows = messages_received.map( messages => ({
        id: messages.id,
        phone_number: messages.phone_number,
        message_cost: messages.message_cost,
        status: messages.status
  
      }));
  
      try {
        const workbook = xls.utils.book_new();
        const worksheet = xls.utils.json_to_sheet(rows);
    
        xls.utils.book_append_sheet(workbook, worksheet, 'Messages');
    
        xls.utils.sheet_add_aoa(worksheet, [
          ['AmountID', 'Phonenumber', 'Amount', 'Status' ],
        ]);
    
        xls.writeFile(workbook, dateFormating(), { compression: true });
      } catch (error) {
        updateAlertFunction(dispatch, 'error', UPDATE_ALERT, error.message)
    
      }
  }


  return (
   activateMessageBox ? 
      (   <Box  
        sx={{
        height: 400,
        width: '90%',
          }}> 
      <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
        >
          All Messages Status
      </Typography>
      
      <DataGrid
        rows={ messages_received }
        disableSelectionOnClick
        columns={ received_message_columns }
        initialState={{
        pagination: {
        paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection />  
        <Button sx={{ marginRight: 'auto', mt: 5, mr: 10 }} 
              variant='contained'
              onClick={ handleDownload }>Download Message Sent</Button> 
      </Box> 
       )
        
         :
      
      ( 
               <Box 
        sx={{
        height: 700,
        width: '90%',
        position: 'relative',
        
           }}
          >
      <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
         >
           Messages Sent
      </Typography>
      <DataGrid
        rows={ messages }
        disableSelectionOnClick
        columns={columns}
        initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 20 },
           },
         }}
         pageSizeOptions={[10, 30]}
         checkboxSelection 
           /> 
        </Box>
        )
  )
}

export default Messages;