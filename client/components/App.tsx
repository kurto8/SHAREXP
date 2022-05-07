import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from '../store';
// import UserProvider from './Auth&Log';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import CompanyDisplay from './CompanyDisplay';
import '../static/styles.css';
// const Dashboard = React.lazy(() => import('./Dashboard'));
// const CompanyDisplay = React.lazy(() => import('./CompanyDisplay'));

const App = () => {
  const lightTheme = createTheme();
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <BrowserRouter>
          {/* <UserProvider> */}
            <Routes>
              {/* <Route path='/signup' element={<SignUp />}></Route> */}
              {/* <Route path='/dashboard' element={<Dashboard />}></Route> */}
              <Route
                path='/dashboard/:companyName/:companyId'
                element={<CompanyDisplay />}></Route>
              {/* <Route path='/' element={<SignIn />}></Route> */}
              <Route path='/' element={<Dashboard />}></Route>
            </Routes>
          {/* </UserProvider> */}
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

// const [isDarkMode, setIsDarkMode] = useState(false);
// const light = createTheme({
//   palette: {
//     mode: 'light',
//   },
// });
// const dark = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

// const theme = isDarkMode ? dark : light;
// const toggleDarkMode = () => {
//   setIsDarkMode(!isDarkMode);
// };
