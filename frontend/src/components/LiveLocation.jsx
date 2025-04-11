import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker issue in React
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import WebSocket from "../Functions/WebSocket";



const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom()); // Recenter map on new position
  }, [position, map]);

  return null; // This component only runs side effects
};

const LiveLoction= ({ height, position2 }) => {
 
  const [position, setPosition] = useState([51.505, -0.09]); // Default to London

  useEffect(() => {
    if (position2 && position2.lat && position2.lng) {
      setPosition([position2.lat, position2.lng]);
    }
  }, [position2]);
  
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    position.length === 2 ? (
      <MapContainer center={position} zoom={13} style={{ height: height, width: "100%", zIndex: "0" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapUpdater position={position} />
        <Marker position={position} icon={L.icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng })}>
          <Popup>Your Live Location</Popup>
        </Marker>
      </MapContainer>
    ) : (
      <div>Loading location...</div>
    )
  );
  
};

export default LiveLoction;
