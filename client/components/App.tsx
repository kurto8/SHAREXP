import React from 'react';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Provider } from "react-redux";
// import store from "./store";
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import CompanyDisplay from './CompanyDisplay';
import '../static/styles.css';

const App = () => {
  const theme = createTheme();
  return (
    //<Provider store={store}>
    <ThemeProvider theme={theme}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route
              path='/dashboard/:companyName/:companyId'
              element={<CompanyDisplay />}></Route>
            <Route path='/' element={<SignIn />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
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
