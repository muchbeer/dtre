import { END_LOADING, START_LOADING, UPDATE_ALERT, updateAlertFunction } from './utils/commonConstant.js'
import fetchData from "./utils/fetchData.js";


const SERVER_URL = 'http://localhost:5000/'
//const SERVER_URL=process.env.REACT_APP_BASE_SERVER_URL;
const url = SERVER_URL + 'api/message'

export const getMainMessages = async (dispatch) => {

    const messages = await fetchData({ url: url + '/', method: 'GET' }, dispatch);
    if (messages) {
      dispatch({ type: 'UPDATE_MESSAGE', payload: messages });
    }
  
  };

  export const getAllAirtimes = async (id, dispatch) => {
    const data = { id: id}
    const received_messages = await fetchData({ url: url + '/received', body: data }, dispatch);
    if( received_messages ) {
      dispatch({ type: 'UPDATE_AIRTIME_RECEIVED', payload: received_messages })
    }
  };

  export const sendBulkSMSApi = async (excel_data, dispatch) => {
      
    dispatch({ type: START_LOADING });

    const uploadContact = await fetchData( {url: url + '/upload', body: excel_data }, dispatch);

    if(uploadContact) {
      dispatch({type: END_LOADING });

      updateAlertFunction(dispatch, 'success', UPDATE_ALERT, 'Uploaded file is successfully submitted');
    } 
    dispatch({type: END_LOADING })
}