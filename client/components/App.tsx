import React, { StrictMode, Provider } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import UserProvider from './AuthAndContext';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import CompanyDisplay from './CompanyDisplay';
import '../static/styles.css';

const App = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      {/* <UserProvider> */}
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
      {/* </UserProvider> */}
    </ThemeProvider>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
