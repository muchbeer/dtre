import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/dashboard/Dashboard';
import { useValue } from './context/ContextProvider';

const App = () => {

  const { state: { currentUser },  } = useValue(); 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard/*" element={ currentUser ? <Dashboard /> : <Home />} />
          <Route path="*" element={<Home />} />

          
        </Routes>
      </BrowserRouter>
    </>
   
  )
}

export default App

