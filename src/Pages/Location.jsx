import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Added Popup
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

// Create custom icons for different markers
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const stationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

import {
  IoHomeOutline,
  IoListOutline,
  IoAddCircleOutline,
  IoPersonOutline,
  IoFilterOutline,
  IoSearchOutline,
  IoLogOutOutline,
  IoLocationOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

function Location() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [locationStep, setLocationStep] = useState("initial");
  const [userLocation, setUserLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSavingLocation, setIsSavingLocation] = useState(false);

  const [stations, setStations] = useState([]);
  const [selectedStationId, setSelectedStationId] = useState(null);
  const cardRefs = useRef({});

  /* DRAGGABLE MARKER */
  const DraggableMarker = () => {
    const markerRef = useRef(null);

    const eventHandlers = {
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setMarkerPosition(newPos);
        }
      },
    };

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={markerPosition}
        icon={userIcon}
        ref={markerRef}
      >
        <Popup>
          <strong>Your Location</strong>
          <br />
          Drag to adjust
        </Popup>
      </Marker>
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        setMarkerPosition(location);
        setLocationStep("selecting");
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLoadingLocation(false);
        
        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Location access denied. Please:\n\n" +
            "1. Click the lock icon (🔒) next to the URL\n" +
            "2. Change Location to 'Allow'\n" +
            "3. Refresh the page"
          );
        } else {
          alert("Unable to get your location. Please try again.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleConfirmLocation = async () => {
    if (!markerPosition) {
      alert("Please select a location on the map");
      return;
    }

    setIsSavingLocation(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/userslocation",
        {
          latitude: markerPosition.lat,
          longitude: markerPosition.lng,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Location saved:", res.data);
      setLocationStep("confirmed");
      fetchStations();
    } catch (err) {
      console.error("Failed to save location", err);
      alert(err.response?.data?.message || "Failed to save location");
      setIsSavingLocation(false);
    }
  };

  const fetchStations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/stations/nearbystations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data, "nearby stations response");
      
      // Extract nearbyStations array from response
      const stationsData = res.data.nearbyStations || [];
      setStations(stationsData);
      setIsSavingLocation(false);
    } catch (err) {
      console.error("Failed to fetch stations", err);
      setIsSavingLocation(false);
    }
  };

  const handleMarkerSelect = (stationId) => {
    setSelectedStationId(stationId);
    const card = cardRefs.current[stationId];
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  /* INITIAL STEP */
  if (locationStep === "initial") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white px-6">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <IoLocationOutline className="text-white text-5xl" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Enable Location Access
          </h2>
          <p className="text-slate-600 mb-2">
            We need your location to find nearby charging stations
          </p>
        </div>

        <button
          onClick={handleUseMyLocation}
          disabled={isLoadingLocation}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-50"
        >
          {isLoadingLocation ? (
            <>
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Getting Location...
            </>
          ) : (
            <>
              <IoLocationOutline className="text-2xl" />
              Use My Location
            </>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="mt-6 text-slate-500 hover:text-slate-700 flex items-center gap-2"
        >
          <IoLogOutOutline />
          Logout
        </button>
      </div>
    );
  }

  /* LOCATION SELECTION */
  if (locationStep === "selecting") {
    return (
      <div className="h-screen flex flex-col bg-white">
        <div className="bg-white shadow-sm px-4 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Adjust Your Location
            </h2>
            <p className="text-xs text-slate-500">
              Drag the marker to your exact location
            </p>
          </div>
          <button onClick={handleLogout} className="text-red-500">
            <IoLogOutOutline className="text-xl" />
          </button>
        </div>

        <div className="flex-1 relative">
          {userLocation && markerPosition && (
            <MapContainer
              center={[userLocation.lat, userLocation.lng]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
              zoomControl={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <DraggableMarker />
            </MapContainer>
          )}
        </div>

        <div className="bg-white shadow-lg px-4 py-4">
          <button
            onClick={handleConfirmLocation}
            disabled={isSavingLocation}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all disabled:opacity-50"
          >
            {isSavingLocation ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving Location...
              </>
            ) : (
              <>
                <IoCheckmarkCircleOutline className="text-2xl" />
                Confirm Location
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  /* MAIN VIEW - STATIONS WITH MAP */
  return (
    <div className="h-screen flex flex-col bg-slate-50 font-[Poppins]">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-slate-800">
          Welcome, {user?.name || "User"} 👋
        </h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-red-500 font-medium"
        >
          <IoLogOutOutline />
          Logout
        </button>
      </div>

      {/* Search */}
      {/* <div className="px-4 py-3 bg-white border-b">
        <div className="flex items-center bg-slate-50 rounded-xl px-3 py-2">
          <IoSearchOutline className="text-gray-400 mr-2 text-lg" />
          <input
            type="text"
            placeholder="Search EV stations..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button className="ml-2 p-1.5 rounded-full bg-white">
            <IoFilterOutline className="text-gray-600 text-xl" />
          </button>
        </div>
      </div> */}

      {/* Map with Stations */}
      <div className="flex-1 relative">
        {userLocation && (
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            
            {/* User Location Marker */}
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
              <Popup>
                <strong>Your Location</strong>
              </Popup>
            </Marker>

            {/* Station Markers */}
            {stations.map((station) => {
              // Check if station has valid coordinates
              if (station.location && station.location.coordinates && station.location.coordinates.length === 2) {
                const [lng, lat] = station.location.coordinates; // GeoJSON format is [lng, lat]
                
                return (
                  <Marker
                    key={station._id}
                    position={[lat, lng]}
                    icon={stationIcon}
                    eventHandlers={{
                      click: () => handleMarkerSelect(station._id),
                    }}
                  >
                    <Popup>
                      <div className="text-sm">
                        <strong className="text-base">{station.evStation.name}</strong>
                        <p className="text-xs text-gray-600 mt-1">{station.evStation.address}</p>
                        {station.evStation && (
                          <>
                            <p className="text-xs mt-2">
                              ⚡ {station.evStation.power || 'N/A'} kW
                            </p>
                            <p className="text-xs">
                              🔌 {station.evStation.availableChargers || 0} available
                            </p>
                          </>
                        )}
                        <button
                          onClick={() => navigate(`/station/${station._id}`)}
                          className="mt-2 w-full bg-emerald-500 text-white py-1 px-2 rounded text-xs font-semibold"
                        >
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
          </MapContainer>
        )}
      </div>

      {/* Station Cards */}
      <div className="bg-white border-t shadow-lg px-4 py-3 max-h-48 overflow-y-auto">
        {stations.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-4">
            No charging stations found nearby (within 5km)
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-600 mb-2">
              {stations.length} stations found nearby
            </p>
            {stations.map((station) => (
              <div
                key={station._id}
                ref={(el) => (cardRefs.current[station._id] = el)}
                onClick={() => handleMarkerSelect(station._id)}
                className={`p-3 rounded-xl shadow-sm transition-all cursor-pointer ${
                  selectedStationId === station._id
                    ? "border-2 border-emerald-500 bg-emerald-50"
                    : "bg-white border border-slate-200"
                }`}
              >
                <h3 className="text-sm font-semibold">{station.evStation.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{station.evStation.address}</p>
                
                {station.evStation && (
                  <div className="flex justify-between mt-2 text-xs">
                    <span>⚡ {station.evStation.power || 'N/A'} kW</span>
                    <span>🔌 {station.evStation.availableChargers || 0} available</span>
                  </div>
                )}

                <button
                  className="w-full bg-emerald-500 text-white py-2 rounded-lg mt-2 text-xs font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/station/${station._id}`, { state: station });
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="flex justify-around bg-white py-3 border-t shadow-lg">
        <button className="text-emerald-500" onClick={() => navigate("/home")}>
          <IoHomeOutline className="text-2xl" />
        </button>
        <button onClick={() => navigate("/navigation")}>
          <IoListOutline className="text-2xl" />
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("hostToken");
            localStorage.removeItem("role");
            navigate("/host/login");
          }}
        >
          <IoAddCircleOutline className="text-2xl" />
        </button>
        <button onClick={() => navigate("/profile")}>
          <IoPersonOutline className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default Location;