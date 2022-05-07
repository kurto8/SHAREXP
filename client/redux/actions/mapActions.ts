

const setCurrentCity = (currentCity: string) => ({
    type: "SET_CITY&COUNTRY_FROM_MAP",
    payload: currentCity,
});
export default setCurrentCity;