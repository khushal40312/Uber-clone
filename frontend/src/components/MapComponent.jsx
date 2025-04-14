import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconPng from "leaflet/dist/images/marker-icon.png";

import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import Loading from './Loading';
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: shadow,
});
const carIcon = new L.Icon({
  iconUrl: '/car.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32], // center bottom
});
const MapComponent = ({ pickup, destination, height }) => {


  const [routeCoords, setRouteCoords] = useState([]);







  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const apiKey = import.meta.env.VITE_LF_URL;
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${pickup.lng},${pickup.lat}&end=${destination.lng},${destination.lat}`;
        const res = await fetch(url);
        const data = await res.json();
    
        if (!data || !data.features || !data.features[0]) {
          console.error('Invalid route data:', data);
          return;
        }
    
        const coords = data.features[0].geometry.coordinates.map(c => [c[1], c[0]]);
        setRouteCoords(coords);
      } catch (err) {
        console.error('Failed to fetch route:', err);
      }
    };
    
    if (pickup && destination) {
      fetchRoute();
    }
  }, [pickup, destination]);

  return (
    <>
      {!pickup.lat ? <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50">
        <Loading />
      </div> : <MapContainer center={pickup} zoom={13} style={{ height, width: '100%', zIndex: 0 }}>
        <TileLayer
          attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker position={pickup} icon={carIcon} />
        <Marker position={destination} icon={L.icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng })} />
        {routeCoords?.length > 0 && <Polyline positions={routeCoords} color="blue" />}
      </MapContainer>}
    </>
  );
};

export default MapComponent;
