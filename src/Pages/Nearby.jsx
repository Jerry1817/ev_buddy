
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Nearbylocation (){
  const [userLocation, setUserLocation] = useState(null);
  console.log(userLocation,"ooo");
  

    const getUserLocation = () => {
      if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
      }
    
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert("Location permission denied");
        },
        {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0,
  }
      );
    };


    return (
    <div>
      <h2>Find Nearby Charging Stations</h2>

      <button onClick={getUserLocation}>
        📍 Use My Current Location
      </button>

      {userLocation && (
        <div style={{ height: "400px", marginTop: "20px" }}>
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[userLocation.lat, userLocation.lng]} />
          </MapContainer>
        </div>
      )}
    </div>
    )

}



export default Nearbylocation