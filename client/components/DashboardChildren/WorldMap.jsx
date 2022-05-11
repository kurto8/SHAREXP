import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCountry } from '../reduxFeatures/geoSlice';
import expDataArray from '../../mockData';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import countryCityObj from '../../countryCapitals';
import TooltipModal from './TooltipModal';

const MapChart = ({ setTooltipContent }) => {
  const { geoInfo } = useSelector((store) => store.geo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const placesTraveled = expDataArray.map((el) => el.country);
  // console.log(expInfoArr)
  // console.log(placesTraveled)

  function handleRoute(link) {
    navigate(link);
  }

  function handleClick(geoCountyName, id, properties) {
    let filteredCity = countryCityObj.filter(
      (element) => element.country === geoCountyName
    );

    let filteredExps = expDataArray.filter(
      (element) => element.country === geoCountyName
    );

    dispatch(
      setCountry({
        expsFromCountry: filteredExps,
        selectedCountry: geoCountyName,
        countryCapital: filteredCity[0].city,
        properties,
      })
    );

    console.log(geoCountyName);
    handleRoute(`/dashboard/${geoCountyName}/${id}`);
  }

  return (
    <>
      <div className='map'>
        <ComposableMap data-tip='' projectionConfig={{ scale: 180 }}>
          <ZoomableGroup>
            <Geographies geography={geoInfo}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (placesTraveled.includes(geo.properties.NAME_LONG)) {
                        handleClick(
                          geo.properties.NAME_LONG,
                          geo.rsmKey,
                          geo.properties
                        );
                      }
                    }}
                    onMouseEnter={() => {
                      setTooltipContent(
                        <TooltipModal details={geo.properties} />
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    style={{
                      default: placesTraveled.includes(geo.properties.NAME_LONG)
                        ? {
                            fill: '#54ba87',
                            outline: 'none',
                          }
                        : {
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
