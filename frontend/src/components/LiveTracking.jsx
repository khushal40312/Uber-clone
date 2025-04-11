import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, map.getZoom());
  }, [position, map]);

  return null;
};

const LiveTracking = ({ height, position2 }) => {
  const [position, setPosition] = useState([28.6139, 77.2088]);

  useEffect(() => {
    if (position2 && position2.lat && position2.lng) {
      setPosition([position2.lat, position2.lng]);
    }
  }, [position2]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: height, width: "100%", zIndex: "0" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapUpdater position={position} /> {/* Ensures map follows user location */}
      <Marker position={position} icon={L.icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng })}>
        <Popup>Your Live Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LiveTracking;
