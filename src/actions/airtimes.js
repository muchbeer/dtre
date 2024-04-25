import { END_LOADING, START_LOADING, UPDATE_ALERT, updateAlertFunction } from "./utils/commonConstant.js";
import fetchData from "./utils/fetchData.js";

//const url = 'http://localhost:5000/api/airtime'
const SERVER_URL=process.env.REACT_APP_BASE_SERVER_URL
const url = SERVER_URL + 'api/airtime'

  export const getMainAirtime = async (dispatch) => {

    const airtime = await fetchData({ url: url + '/', method: 'GET' }, dispatch);
    if (airtime) {
      dispatch({ type: 'UPDATE_AIRTIME', payload: airtime });
    }
  
  };

  export const getAllAirtimes = async (id, dispatch) => {
    const data = { id: id}
    const received_airtime = await fetchData({ url: url + '/received', body: data }, dispatch);
    if(received_airtime) {
      dispatch({ type: 'UPDATE_AIRTIME_RECEIVED', payload: received_airtime })
    }
  };

  export const sendAirtimeApi = async (excel_data, dispatch) => {
      
    dispatch({ type: START_LOADING });

    const uploadAirtime = await fetchData( {url: url + '/upload', body: excel_data }, dispatch);

    if(uploadAirtime) {
      dispatch({type: END_LOADING });

      updateAlertFunction(dispatch, 'success', UPDATE_ALERT, 'Uploaded file is successfully submitted');
    } 
    dispatch({type: END_LOADING })
  };

  export const sendSingleAirtimeApi = async(data, dispatch) => {
    dispatch({ type: START_LOADING });

    const sendAirtime = await fetchData( {url: url + '/sendone', body: data }, dispatch);

    if(sendAirtime) {
      dispatch({ type: END_LOADING });
      dispatch({
        type: UPDATE_ALERT,
        payload: {
          open: true,
          severity: 'success',
          message: 'Airtime is successfully submitted',
        },
      });
    }
  };

  export const dateFormating = () => {
    const dating = new Date();

    const formatDate = dating.getDate() + '_' + dating.getMonth() + 'T' + dating.getHours() 
                      + 'hh'+ dating.getMinutes() +'mm' + dating.getSeconds() +  'ss.xlsx';

    const filename = 'Dtreefile' + formatDate;
    
    return filename;
  };


