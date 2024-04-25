import { END_LOADING, START_LOADING, UPDATE_ALERT, updateAlertFunction } from "./utils/commonConstant.js";
import fetchData from "./utils/fetchData";

// const url = 'http://localhost:5000/api/auth'
const SERVER_URL=process.env.REACT_APP_BASE_SERVER_URL
const url = SERVER_URL + 'api/auth'

export const register = async (user, dispatch) => {
   
    dispatch({ type: START_LOADING });
  
    const result = await fetchData( { url: url + '/register' , body: user } , dispatch );
  
    if (result) {
      dispatch({ type: 'UPDATE_REGISTER'  });
      dispatch({ type: 'CLOSE_LOGIN' });

      updateAlertFunction(dispatch, UPDATE_ALERT, 'Your account has been created successfully, Please login');
      /* dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'Your account has been created successfully, Please login',
        },
      }); */
    } 
  
    dispatch({ type: END_LOADING });
  };

export const loginUser = async (user, dispatch) => {
 
  dispatch({ type: START_LOADING });

  const result = await fetchData({ url: url + '/login', body: user }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_USER', payload: result });
   
  }

  dispatch({ type: END_LOADING });
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