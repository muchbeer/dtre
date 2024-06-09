import { END_LOADING, START_LOADING, UPDATE_ALERT, updateAlertFunction } from "./utils/commonConstant.js";
import fetchData from "./utils/fetchData";


//const SERVER_URL = 'http://localhost:5001/'
const SERVER_URL=process.env.REACT_APP_BASE_SERVER_URL;
const url = SERVER_URL + 'api/auth'

export const register = async (user, dispatch) => {
   
  try {
    dispatch({ type: START_LOADING });
  
    const result = await fetchData( { url: url + '/register' , body: user } , dispatch );
  
    if (result) {
      dispatch({ type: 'UPDATE_REGISTER'  });
      dispatch({ type: 'CLOSE_LOGIN' });

      updateAlertFunction(dispatch, 'success', UPDATE_ALERT, 'Your account has been created successfully, Please login');
    } 
  //slsl
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING});
    updateAlertFunction(dispatch, 'error', UPDATE_ALERT, error.message);
     }
  
  };

export const loginUser = async (user, dispatch) => {

  try {
    dispatch({ type: START_LOADING });

    const result = await fetchData({ url: url + '/login', body: user }, dispatch);
    if (result) {
      dispatch({ type: 'UPDATE_USER', payload: result });  
    }
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING })
    updateAlertFunction(dispatch, 'error', UPDATE_ALERT, error.message);
  }
};

export const getClientUsers = async (dispatch) => {

  const users = await fetchData({ url: url + '/users', method: 'GET' }, dispatch);
  if (users) {
    dispatch({ type: 'UPDATE_USERS', payload: users });
  }
};


export const activateAirtime =  ( enable_data, dispatch) => {
  
  return fetchData({ url: url +'/enable', body: enable_data }, dispatch)

};