import { configureStore } from "@reduxjs/toolkit";
import geoReducer from  '../components/reduxFeatures/geoSlice.jsx'
import mapReducer from "./reducers/mapReducer.ts";

// const store = configureStore({ reducer: mapReducer });
const store = configureStore({
  reducer: {
    geo: geoReducer,
  },
  // devTools: process.env.NODE_ENV !== 'production',
})

export default store;