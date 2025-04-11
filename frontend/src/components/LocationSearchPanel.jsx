import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import Loading from './Loading';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const LocationSearchPanel = ({setIsUserTyped, setLocation, setDestination, setDestinationSuggestions,setPickupSuggestions, locationSuggestion, inputType, loading2 }) => {
  return (
    <>
      {loading2 ? (
        <Skeleton count={6} height={60} containerClassName="flex-1"  />
      ) : (
        <div>
          {locationSuggestion?.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => {
                setIsUserTyped(false);
                if (inputType === 'location') {
                  setLocation(suggestion.description);
                  setDestinationSuggestions([]);
                } else if (inputType === 'destination') {
                  setDestination(suggestion.description);
                  setPickupSuggestions([]);
                }
                 // Mark as programmatic change
              }}
              className="flex items-center my-3 overflow-y-scroll p-2 border-[#eeeeee] border-2 active:border-black rounded-xl cursor-pointer"
            >
              <h2 className="p-2 py-3 rounded-full bg-[#eeeeee] mr-3">
                <FaLocationDot />
              </h2>
              <h4 className="font-medium">{suggestion.description}</h4>
            </div>
          ))}
        </div>)}

    </>
  );
};

export default LocationSearchPanel;
