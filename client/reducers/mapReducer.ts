

const initialState = { currentCity: '', currentCountry: '' };
const mapReducer = (
  state = initialState,
  action: { type: string; payload: string | null }
) => {
  switch (action.type) {
    // case 'SET_CURRENT_CITY': {
    //   return Object.assign({}, state, action.payload);
    // }
    case 'SET_CITY&COUNTRY_FROM_MAP': {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
};

export default mapReducer;
