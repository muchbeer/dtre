import { END_LOADING, START_LOADING } from "./utils/commonConstant.js";
import fetchData from "./utils/fetchData";

// const url = 'http://localhost:5000/api/balance'
const SERVER_URL=process.env.REACT_APP_BASE_SERVER_URL
const url = SERVER_URL + 'api/balance'


export const getBalance = async (dispatch) => {
    dispatch({ type: START_LOADING });

    const balance = await fetchData( { url: url + '/', method: 'GET' }, dispatch);
    if (balance) {
      dispatch({ type: 'UPDATE_BALANCE', payload: balance });
      dispatch({ type: END_LOADING });
    }
    
  };


 export const isEmptyBalance = (obj) => {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  
    return true;
  }