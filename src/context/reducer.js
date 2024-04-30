

const reducer = (state, action) => {
    switch (action.type) {
      case 'OPEN_LOGIN':
        return { ...state, openLogin: true };
      case 'CLOSE_LOGIN':
        return { ...state, openLogin: false };
  
      case 'START_LOADING':
        return { ...state, loading: true };

      case 'END_LOADING':
        return { ...state, loading: false };
  
      case 'UPDATE_ALERT':
        return { ...state, alert: action.payload };

      case 'UPDATE_REGISTER':
        return { ...state, registered: true};

      case 'CLOSE_REGISTER':
        return {  ...state, registered: false};

      case 'ACTIVATE_BOX':
        return {  ...state, activateBox: true };

      case 'DEACTIVATE_BOX':
        return {  ...state, activateBox: false };

      case 'UPDATE_USER':
        return { ...state, currentUser: action.payload };

      case 'UPDATE_USERS':
        return { ...state, users: action.payload };

      case 'UPDATE_BALANCE':
        return { ...state, balance: action.payload };

      case 'UPDATE_AIRTIME': 
        return { ...state, airtimes : action.payload };

      case 'UPDATE_AIRTIME_RECEIVED': 
        return {  ...state, airtimes_received : action.payload };

      case 'UPDATE_MESSAGE':
        return {  ...state, messages : action.payload };

      case 'UPDATE_MESSAGE_RECEIVED':
        return {  ...state, messages_received: action.payload };
  
      default:
        throw new Error('No matched action!');
    }
  };

  export default reducer;