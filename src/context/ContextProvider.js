import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

//balance: JSON.parse(localStorage.getItem('balance')) || null, 
const initialState = {
    currentUser: null,
    openLogin: true,
    loading: false,
    registered: false,
    activateBox: false,
    activateMessageBox: false,
    senderId: JSON.parse(localStorage.getItem('sid')) || ['SENDER ID', 'INFORM'], 
    senderName: null,
    alert: { open: false, severity: 'info', message: 'Test the alert if it worked' },
    balance: null, 
    users :  [],
    airtimes: [], 
    airtimes_received: [], 
    messages: [], 
    messages_received: [],
  };

  const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
      localStorage.setItem('balance', JSON.stringify(state.balance));
      localStorage.setItem('sid', JSON.stringify(state.senderId));

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
        }
    }, 
    [ state.balance, state.senderId]); 

    return (
      <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    );
  };
  
  export default ContextProvider;