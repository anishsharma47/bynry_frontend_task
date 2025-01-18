import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import WrapperComp from "../../common/WrapperComp";

const LocationComp = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map at the given latitude and longitude
      mapRef.current = L.map("map").setView([latitude, longitude], 13);

      // Add a TileLayer (background map)
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);

      // Add a marker at the given location
      L.marker([latitude, longitude])
        .addTo(mapRef.current)
        .bindPopup(`Location: (${latitude}, ${longitude})`)
        .openPopup();
    }

    // Cleanup function to remove the map instance
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude]);

  return <div id="map" className="w-[100%] h-[60vh] mx-auto rounded-xl"></div>;
};

export default LocationComp;
