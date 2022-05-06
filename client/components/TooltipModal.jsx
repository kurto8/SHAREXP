import React, { useState, useEffect } from 'react';
import countryCityObj from '../countryCapitals.js';
import '../static/styles.css';

const TooltipModal = (props) => {
  // console.log(props)
  const [city, setCity] = useState('');

  useEffect(() => {
    let val = findCountry(countryCityObj, props.NAME);
    setCity(val);
  }, [props.NAME]);

  const findCountry = (arr, val) => {
    const country = arr.filter((element) => element.country === val);
    return country[0]?.city;
  };
  return (
    <>
      <table className='tool-tip'>
        <tbody>
          <tr>
            <td>Country</td>
            <td>Capital City</td>
            <td>Population Size</td>
            <td>Total GDP</td>
            <td>Population Rank</td>
          </tr>
          <tr>
            <td>{props.details.NAME_LONG}</td>
            <td>{city}</td>
            <td>
              {(Number(props.details.POP_EST) / 1000000).toFixed(3)} million
            </td>
            <td>${props.details.GDP_MD_EST}</td>
            <td>{props.details.POP_RANK}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TooltipModal;
