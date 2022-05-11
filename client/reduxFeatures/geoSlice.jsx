import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import experienceArray from '../mockData';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const initialState = {
  geoInfo: geoUrl,
  expInfoArr: experienceArray,
  countryInfoArr: [],
  country: '',
  capital: '',
  properties: {},
  // geoID: '',
  // isLoading: true,
};

const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setCountry: (state, action) => {
      const { expsFromCountry, selectedCountry, countryCapital, properties } =
        action.payload;
      state.countryInfoArr = expsFromCountry;
      state.country = selectedCountry;
      state.capital = countryCapital;
      state.properties = properties;
    },
  },
});

console.log(geoSlice);

export const { setCountry } = geoSlice.actions;

export default geoSlice.reducer;

// interface stateObj {
//   geoInfo: {},
//   city: '',
//   country: '',
//   id: '',
//   properties: {},
//   isLoading: true,
// };
