import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import countryCityObj from '../countryCapitals.js';
import store from '../store';
import TooltipModal from './TooltipModal.jsx';


const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';
  

const MapChart = ({ setTooltipContent }) => {
  const navigate = useNavigate();

  function handleRoute(link) {
    navigate(link);
  }

  function handleClick(geo) {
    let filteredCity = countryCityObj.filter(
      (element) =>
        element.country === geo.properties.NAME_LONG
    );
    store.dispatch({
      type: 'SET_COUNTRY_FROM_MAP',
      payload: {
        currentCity: filteredCity[0].city,
        currentCountry: geo.properties.NAME_LONG,
      },
    });
    console.log(geo)
    handleRoute(`/dashboard/${geo.properties.NAME_LONG}/${geo.rsmKey}`)
  }

  return (
    <>
      <div className='map'>
        <ComposableMap data-tip='' projectionConfig={{ scale: 180 }}>
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleClick(geo)}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      setTooltipContent(
                        <TooltipModal
                          details={geo.properties}
                          NAME={NAME}
                        />
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    style={{
                      default: {
                        fill: '#D6D6DA',
                        outline: 'none',
                      },
                      hover: {
                        fill: '#d4b75f',
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#54ba87',
                        outline: 'none',
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </>
  );
};

export default MapChart;
