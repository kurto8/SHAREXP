import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./store";
import App from "../components/App.jsx";
import Login from "../components/Login.jsx";
import Dashboard from "../components/Dashboard.jsx";
import SignUp from '../components/SignUp.jsx';
import REI from '../components/REI.jsx'
import CompanyDisplay from "../components/CompanyDisplay.jsx";
import "../static/styles.css"

// const App = () => {

//   return (
//     <div>
//       <Login />
//     </div>
//   )
// }

ReactDOM.render(
  //<Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/rei" element={<REI />}></Route>
        <Route path="/dashboard/:companyName/:companyId" element={<CompanyDisplay />}></Route>
        {/* <Route path="/" element={<Dashboard />}></Route>  */}
        {/* <Route path="/main" element={<MainContainer />}></Route> */}
      </Routes>
    </BrowserRouter>,
  //// </Provider>
  document.getElementById("root")             
);

// export default App;