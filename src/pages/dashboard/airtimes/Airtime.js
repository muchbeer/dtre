import React, {  useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider';
import { dateFormating, getMainAirtime } from '../../../actions/airtimes';
import { Box, Button, Typography } from '@mui/material';
import AirtimeAction from './AirtimeAction';
import * as xls from 'xlsx'; 
import { UPDATE_ALERT, updateAlertFunction } from '../../../actions/utils/commonConstant';

const Airtime = ({ setSelectedLink, link }) => {

  const { state: {airtimes, airtimes_received, activateBox }, dispatch } = useValue();
  
  useEffect(() => {
    setSelectedLink(link);
    getMainAirtime(dispatch);  
  });

  const columns = [
    { field: "id", headerName: "ID", width: 100, headerAlign: 'center', 
      align: 'center' },
    
    { field: "total_amount", 
    headerName: "Total Amount", width: 260, 
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
            <AirtimeAction  {...{ params }} />
          </>
        );
      },
    },
  ];

  const received_airtime_columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "phone_number", headerName: "Phone Number", width: 120, flex: 1 },
    {  field: "amount",  headerName: "Amount",  width: 200, flex: 1 }, 
    {  field: "status",  headerName: "Status",  width: 200, flex: 1 }]

  const handleDownload = (event) => {
    event.preventDefault();

    const rows = airtimes_received.map( airtimes => ({
      id: airtimes.id,
      phone_number: airtimes.phone_number,
      amount: airtimes.amount,
      status: airtimes.status

    }));

    try {
      const workbook = xls.utils.book_new();
      const worksheet = xls.utils.json_to_sheet(rows);
  
      xls.utils.book_append_sheet(workbook, worksheet, 'Airtimes');
  
      xls.utils.sheet_add_aoa(worksheet, [
        ['AmountID', 'Phonenumber', 'Amount', 'Status' ],
      ]);
  
      xls.writeFile(workbook, dateFormating(), { compression: true });
    } catch (error) {
      updateAlertFunction(dispatch, 'error', UPDATE_ALERT, error.message)
  
    }
}

  return  ( 
    activateBox ? 
      (<Box  
        sx={{
        height: 400,
        width: '100%',
          }}> 
      
      <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
        >
          All Airtime Status
      </Typography>
      <DataGrid
        rows={ airtimes_received }
        disableSelectionOnClick
        columns={ received_airtime_columns }
        initialState={{
        pagination: {
        paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection />
        <Button sx={{ marginRight: 'auto', mt: 5, mr: 10 }} 
              variant='contained'
              onClick={ handleDownload }>Download Airtime Sent</Button>
      </Box>) :
      
      ( <Box 
        sx={{
        height: 800,
        width: '90%',
        position: 'relative',
        
           }}
          >
      <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
         >
           Airtimes Sent
      </Typography>
      <DataGrid
        rows={ airtimes }
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
        </Box> )
   )

}

export default Airtime;