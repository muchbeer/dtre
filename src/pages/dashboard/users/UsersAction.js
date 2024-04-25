import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { useValue } from '../../../context/ContextProvider';
import { activateAirtime } from '../../../actions/users';

const   UsersAction = ({ params, rowId, setRowId }) => {

    const { dispatch } = useValue();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { id, enable_airtime } = params.row;
    const handleSubmit = async () => {
        setLoading(true);
    
        
        console.log('Enable airtime fixed to : ' + enable_airtime);
        const result = await activateAirtime({ id, enable_airtime }, dispatch);
        if (result) {
          setSuccess(true);
          setRowId(null);
        }
        setLoading(false);
        console.log('done editing');
      };

    useEffect(() => {

      const fetchSuccess = () => {
        if (rowId === params.id && success ) setSuccess(false);
      }
       fetchSuccess();
      }, [rowId, params.id, success ]);

  return <Box 
            sx={{
            m: 1,
            position: 'relative',
      }}>

        { success ? (
            <Fab
                color="primary"
                sx={{
                width: 40,
                height: 40,
                bgcolor: green[500],
                '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}

  </Box>
}

export default UsersAction