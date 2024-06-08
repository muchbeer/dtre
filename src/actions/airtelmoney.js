import { END_LOADING, START_LOADING, UPDATE_ALERT, updateAlertFunction } from "./utils/commonConstant.js";
import fetchData from "./utils/fetchData.js";

const SERVER_URL = 'http://localhost:5001/'
//const SERVER_URL=process.env.REACT_APP_BASE_SERVER_URL;
const url = SERVER_URL + 'api/airtelmoney'

  export const getAirtelMoney = async ( data,  dispatch ) => {

    const airtime = await fetchData({ url: url + '/', body: data }, dispatch);
    if (airtime) {
      dispatch({ type: 'UPDATE_AIRTEL_RETRIEVE', payload: airtime });
    }
  };

  export const sendMoney = async ( data, dispatch ) = > {

  }