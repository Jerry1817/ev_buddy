import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
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
  IoFlashOutline,
  IoNavigateOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

function Location() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("userToken");

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
      const res = await api.post(
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
      const res = await api.get(
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
       // Check if no stations found
    if (stationsData.length === 0) {
      // Show alert and option to retry
      const retry = window.confirm(
        "No charging stations found within 5km of your location.\n\nWould you like to select a different location?"
      );
      
      if (retry) {
        // Go back to location selection
        setLocationStep("selecting");
      }
    }
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

  /* INITIAL STEP - Enhanced UI */
  if (locationStep === "initial") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)"
        }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-teal-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-green-300/20 rounded-full blur-2xl"></div>
        
        {/* Main Content Card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/50">
          {/* Animated Icon Container */}
          <div className="relative mb-8">
            <div className="w-28 h-28 mx-auto relative">
              {/* Outer ring animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-ping opacity-20"></div>
              {/* Inner circle */}
              <div className="absolute inset-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg flex items-center justify-center">
                <IoLocationOutline className="text-white text-5xl" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Find Nearby Stations
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Enable location access to discover EV charging stations within 5km of your current position
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
              <IoFlashOutline /> Fast Charging
            </span>
            <span className="bg-teal-100 text-teal-700 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
              <IoNavigateOutline /> Real-time
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
              📍 5km Radius
            </span>
          </div>

          {/* Primary Button */}
          <button
            onClick={handleUseMyLocation}
            disabled={isLoadingLocation}
            className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoadingLocation ? (
              <>
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                Detecting Location...
              </>
            ) : (
              <>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <IoLocationOutline className="text-xl" />
                </div>
                Use My Location
              </>
            )}
          </button>

          {/* Secondary Action */}
          <button
            onClick={handleLogout}
            className="mt-6 text-slate-500 hover:text-red-500 flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <IoLogOutOutline className="text-lg" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>

        {/* Bottom decoration */}
        <p className="absolute bottom-6 text-xs text-emerald-700/60 font-medium">
          🔒 Your location data is secure and private
        </p>
      </div>
    );
  }

  /* LOCATION SELECTION - Enhanced UI */
  if (locationStep === "selecting") {
    return (
      <div className="h-screen flex flex-col bg-slate-50">
        {/* Header with Glass Effect */}
        <div className="bg-white/90 backdrop-blur-lg shadow-md px-5 py-4 flex justify-between items-center border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Set Your Location
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Drag the blue marker to adjust
            </p>
          </div>
          <button 
            onClick={handleLogout} 
            className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
          >
            <IoLogOutOutline className="text-xl" />
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {/* Map Overlay Gradient Top */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-50/80 to-transparent z-10 pointer-events-none"></div>
          
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
          
          {/* Map Overlay Gradient Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50/80 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Bottom Action Card */}
        <div className="bg-white shadow-2xl px-5 py-5 rounded-t-3xl border-t border-slate-100">
          {/* Info Badge */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-slate-600 font-medium">Blue marker = Your location</span>
          </div>
          
          <button
            onClick={handleConfirmLocation}
            disabled={isSavingLocation}
            className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
          >
            {isSavingLocation ? (
              <>
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                Finding Stations...
              </>
            ) : (
              <>
                <IoCheckmarkCircleOutline className="text-2xl" />
                Confirm & Find Stations
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  /* MAIN VIEW - STATIONS WITH MAP - Enhanced UI */
  return (
    <div className="h-screen flex flex-col bg-slate-50 font-[Poppins]">
      {/* Map with Stations - Takes most space */}
      <div className="flex-1 relative">
        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-slate-50/50 to-transparent z-10 pointer-events-none"></div>
        
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
                      <div className="text-sm min-w-[180px]">
                        <strong className="text-base text-emerald-700">{station.evStation.name}</strong>
                        <p className="text-xs text-gray-600 mt-1">{station.evStation.address}</p>
                        {station.evStation && (
                          <div className="flex gap-3 mt-2 text-xs">
                            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              ⚡ {station.evStation.power || 'N/A'} kW
                            </span>
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                              🔌 {station.evStation.availableChargers || 0}
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => navigate(`/station/${station._id}`, { state: station })}
                          className="mt-3 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-3 rounded-lg text-xs font-bold hover:opacity-90 transition"
                        >
                          View Details →
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

        {/* Station Count Badge - Floating */}
        {stations.length > 0 && (
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-slate-200">
            <span className="text-sm font-bold text-emerald-600">{stations.length}</span>
            <span className="text-xs text-slate-600 ml-1">stations nearby</span>
          </div>
        )}
      </div>

      {/* Station Cards - Bottom Sheet Style */}
      <div className="bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 max-h-[35%] flex flex-col">
        {/* Handle Bar */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full"></div>
        </div>
        
        {/* Cards Content */}
        <div className="px-4 pb-4 overflow-y-auto flex-1">
          {stations.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoLocationOutline className="text-3xl text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium">No stations nearby</p>
              <p className="text-xs text-slate-400 mt-1">Try a different location</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stations.map((station) => (
                <div
                  key={station._id}
                  ref={(el) => (cardRefs.current[station._id] = el)}
                  onClick={() => handleMarkerSelect(station._id)}
                  className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                    selectedStationId === station._id
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-400 shadow-lg shadow-emerald-100"
                      : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-slate-900">{station.evStation.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{station.evStation.address}</p>
                      
                      {station.evStation && (
                        <div className="flex gap-2 mt-3">
                          <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                            ⚡ {station.evStation.power || 'N/A'} kW
                          </span>
                          <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                            🔌 {station.evStation.availableChargers || 0} available
                          </span>
                          {station.evStation.chargingPricePerUnit && (
                            <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                              ₹{station.evStation.chargingPricePerUnit}/kWh
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Arrow Button */}
                    <button
                      className="ml-3 w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/station/${station._id}`, { state: station });
                      }}
                    >
                      <IoChevronForwardOutline className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation - Modern Style */}
      <div className="bg-white px-6 py-4 border-t border-slate-100 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button 
            className="flex flex-col items-center gap-1 text-emerald-600"
            onClick={() => navigate("/location")}
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <IoHomeOutline className="text-xl" />
            </div>
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button 
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors"
            onClick={() => navigate("/myrequests")}
          >
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <IoListOutline className="text-xl" />
            </div>
            <span className="text-xs font-medium">Requests</span>
          </button>
          
          <button
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors"
            onClick={() => {
              localStorage.removeItem("hostToken");
              localStorage.removeItem("role");
              navigate("/host/login");
            }}
          >
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <IoAddCircleOutline className="text-xl" />
            </div>
            <span className="text-xs font-medium">Host</span>
          </button>
          
          <button 
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors"
            onClick={() => navigate("/profile")}
          >
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <IoPersonOutline className="text-xl" />
            </div>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Location;
