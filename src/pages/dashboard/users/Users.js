import React, { useEffect, useMemo, useState } from 'react'
import { getClientUsers } from '../../../actions/users.js'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider.js';
import {  Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import UsersAction from './UsersAction.js';


const Users = ({ setSelectedLink, link }) => {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  const { state: { currentUser, users}, dispatch, } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    if (users.length === 0) getClientUsers(dispatch);
    });

    const columns = useMemo(() => 
    [
        { field: "id", headerName: "ID", width: 60, },
        
        { field: "first_name", headerName: "First Name", width: 100, flex: 1 },

        {  field: "last_name",  headerName: "Last Name",  width: 100, flex: 1 },

        {  field: "email",  headerName: "Email",  width: 100, flex: 1 },
        
        {  field: "enable_airtime", headerName: 'Status', width: 60, type: 'boolean', editable: true,  },
        
        {
          field: "action",
          headerName: "Enable",
          width: 150, flex: 1, 
          type: 'actions',
          renderCell: (params) => {
            
            console.log('The id set is : ' + rowId);
           return ( <UsersAction {...{ params, rowId, setRowId }} /> )
          } ,
        },
      ],
      [rowId]
    );

  return <Box 
            sx={{
            height: 400,
            width: '100%',
      }}
             >
        <Typography
          variant="h5"
          component="h5"
          sx={{ textAlign: 'center', mt: 3, mb: 3 }}
          >
        Manage Users
      </Typography>
            
      <DataGrid
        columns={ columns }
        rows={users}
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${ gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
       
       
        onCellDoubleClick={(params) => currentUser.is_admin ?   setRowId(params.id) : setRowId('') }
      />
  </Box>
  
};

export default Users;