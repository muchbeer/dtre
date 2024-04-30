import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

const initialState = {
    currentUser: null,
    openLogin: true,
    loading: false,
    registered: false,
    activateBox: false,
    alert: { open: false, severity: 'info', message: 'Test the alert if it worked' },
    balance: JSON.parse(localStorage.getItem('balance')) || null, 
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

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
        }
    }, 
    [ state.balance]); 

    return (
      <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    );
  };
  
  export default ContextProvider;