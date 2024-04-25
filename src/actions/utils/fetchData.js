const dispatchAlert = (dispatch, data) => {
  //dispatch({ type: 'UPDATE_USER', payload: null });
  dispatch({type: 'END_LOADING' });
  dispatch({
    type: 'UPDATE_ALERT',
    payload: { open: true, severity: 'error', message: data.message },
  });
}

const fetchData = async (
    { url, method = 'POST', token = '', body = null }, dispatch ) => {
    const headers = token
      ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
      : { 'Content-Type': 'application/json' };
      
    body = body ? { body: JSON.stringify(body) } : {};
    try {
      const response = await fetch(url, { method, headers, ...body });
      const data = await response.json();
      if (!data.success) {
        if (response.status === 409) {
          dispatchAlert(dispatch, data)
        } else if(response.status === 202) { 
            dispatchAlert(dispatch, data)
        } else if (response.status === 500) {
          dispatchAlert(dispatch, data);
        } else if(response.status === 401) {
          dispatchAlert(dispatch, data)
        }
         throw new Error(data.message);
      }
      return data.result;
    } catch (error) {
      dispatch({type: 'END_LOADING' });
      dispatch({
        type: 'UPDATE_ALERT',
        payload: { open: true, severity: 'error', message: error.message },
      });
      console.log(error);
      return null;
    }
  };
  
  export default fetchData;