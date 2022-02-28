import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Provider } from "react-redux";
// import store from "./store";
import Login from '../components/Login.jsx';
import Dashboard from '../components/Dashboard.jsx';
import SignUp from '../components/SignUp.jsx';
import REI from '../components/REI.jsx';
import CompanyDisplay from '../components/CompanyDisplay.jsx';
import '../static/styles.css';

const App = () => {
  const theme = createTheme();

  return (
    //<Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route
            path='/dashboard/:companyName/:companyId'
            element={<CompanyDisplay />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    //</Provider>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
