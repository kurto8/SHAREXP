import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import countryCityObj from '../../countryCapitals';
import store from '../../redux/store';
import TooltipModal from './TooltipModal';

interface geoObj {
  
}

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';
  

const MapChart = ({ setTooltipContent }: FunctionConstructor) => {
  // { setTooltipContent } = props;
  const navigate = useNavigate();

  function handleRoute(link: string) {
    navigate(link);
  }

  function handleClick(geoCountyName: string, id: string) {
    let filteredCity = countryCityObj.filter(
      (element) =>
        element.country === geoCountyName
    );
    store.dispatch({
      type: 'SET_COUNTRY_FROM_MAP',
      payload: {
        currentCity: filteredCity[0].city,
        currentCountry: geoCountyName,
      },
    });
    console.log(geoCountyName)
    handleRoute(`/dashboard/${geoCountyName}/${id}`)
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
                    onClick={() => handleClick(geo.properties.NAME_LONG, geo.rsmKey)}
                    onMouseEnter={() => {
                      // const { NAME } = geo.properties;
                      setTooltipContent(
                        <TooltipModal
                          details={geo.properties}
                          // NAME={NAME}
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
