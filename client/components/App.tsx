import React, {
  StrictMode,
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserProvider from './Auth&Log';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import CompanyDisplay from './CompanyDisplay';
import '../static/styles.css';

const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route path='/signup' element={<SignUp />}></Route>
              <Route path='/dashboard' element={<Dashboard />}></Route>
              <Route
                path='/dashboard/:companyName/:companyId'
                element={<CompanyDisplay />}></Route>
              <Route path='/' element={<SignIn />}></Route>
            </Routes>
          </UserProvider>
        </BrowserRouter>
    </ThemeProvider>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

// const [currentUser, setCurrentUser] = useContext(UserContext);

// useEffect(() => {
//   const checkLoggedIn = () => {
//     let user = isAuthenticated();
//     if (user === null) {
//       sessionStorage.setItem('user', '');
//       user = '';
//     }
//     setCurrentUser(user);
//   };
//   checkLoggedIn();
// }, []);

// console.log('userContext', currentUser);
