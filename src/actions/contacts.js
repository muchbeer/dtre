import { END_LOADING, START_LOADING, UPDATE_ALERT, updateAlertFunction } from "./utils/commonConstant.js";
import fetchData from "./utils/fetchData.js";


//const SERVER_URL = 'http://localhost:5001/'
const SERVER_URL=process.env.REACT_APP_BASE_SERVER_URL;
const url = SERVER_URL + 'api/contact'

  export const getMainContacts = async ( user,  dispatch ) => {

    const fetchContact = await fetchData({ url: url + '/', body: user }, dispatch );
    if (fetchContact) {
      dispatch({ type: 'UPDATE_CONTACT', payload: fetchContact });
    }
  };

  export const getSelectedNames =  async ( user, dispatch ) => {

    const fetchTags = await fetchData({ url: url + '/names', body: user }, dispatch );
    if( fetchTags ) {
      dispatch({ type: 'UPDATE_NAMES', payload: fetchTags });
    }
  };


  export const getSelectedGroups =  async ( user, dispatch ) => {

    const fetchGroups = await fetchData({ url: url + '/groups', body: user }, dispatch );
    if( fetchGroups ) {
      dispatch({ type: 'UPDATE_GROUPS', payload: fetchGroups });
    }
  };

  export const getSelectedNumbers =  async ( data, dispatch ) => {

    dispatch({ type: START_LOADING });

      const fetchNumbers = await fetchData({ url: url + '/numbers', body: data }, dispatch );
    
      if( fetchNumbers ) {
      //dispatch({ type: 'UPDATE_NUMBERS', payload: fetchNumbers });
      dispatch({ type: END_LOADING });
      return fetchNumbers;
    }
      dispatch({ type: END_LOADING });
    
  };


  export const saveContacts = async (contact_data, dispatch) => {
      
    dispatch({ type: START_LOADING });

    const saveContact = await fetchData( {url: url + '/save', body: contact_data }, dispatch );

    if(saveContact) {
      dispatch({type: END_LOADING });
      updateAlertFunction(dispatch, 'success', UPDATE_ALERT, 'Contact is submitted successfully');
    } 
    dispatch({type: END_LOADING });
  };
