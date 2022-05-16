import { combineReducers, configureStore } from '@reduxjs/toolkit';
import geoReducer from './geoSlice.jsx';

export const rootReducer = combineReducers({
  geo: geoReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>

export default store;
