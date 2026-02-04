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

  const [locationStep, setLocationStep] = useState(localStorage.getItem("locationStep") || "initial");
  const [userLocation, setUserLocation] = useState(() => {
    const saved = localStorage.getItem("userLocation");
    return saved ? JSON.parse(saved) : null;
  });
  const [markerPosition, setMarkerPosition] = useState(() => {
    const saved = localStorage.getItem("markerPosition");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSavingLocation, setIsSavingLocation] = useState(false);

  const [stations, setStations] = useState(() => {
    const saved = localStorage.getItem("nearbyStations");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedStationId, setSelectedStationId] = useState(null);
  const cardRefs = useRef({});

  // Sync state to localStorage
  useEffect(() => {
    if (locationStep) localStorage.setItem("locationStep", locationStep);
  }, [locationStep]);

  useEffect(() => {
    if (userLocation) localStorage.setItem("userLocation", JSON.stringify(userLocation));
  }, [userLocation]);

  useEffect(() => {
    if (markerPosition) localStorage.setItem("markerPosition", JSON.stringify(markerPosition));
  }, [markerPosition]);

  useEffect(() => {
    if (stations.length > 0) localStorage.setItem("nearbyStations", JSON.stringify(stations));
  }, [stations]);

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
      toast.error("Geolocation is not supported by your browser");
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
          toast.error(
            "Location access denied. Please click the lock icon next to the URL and allow location access, then refresh."
          );
        } else {
          toast.error("Unable to get your location. Please try again.");
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
      toast.error("Please select a location on the map");
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
      toast.error(err.response?.data?.message || "Failed to save location");
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

  const renderNavigationBar = () => (
    <div className="bg-white px-6 py-4 border-t border-slate-100 shadow-lg shrink-0">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button 
          className={`flex flex-col items-center gap-1 ${locationStep === 'confirmed' ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"}`}
          onClick={() => navigate("/location")}
        >
          <div className={`w-10 h-10 ${locationStep === 'confirmed' ? "bg-emerald-100" : "bg-slate-100"} rounded-xl flex items-center justify-center transition-colors`}>
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
  );

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
  return (
    <div 
      className={`h-[calc(100vh-80px)] flex flex-col ${locationStep !== 'initial' ? 'bg-slate-50' : ''} font-[Poppins]`}
      style={locationStep === "initial" ? {
        background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)"
      } : {}}
    >
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {locationStep === "initial" && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-300/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-teal-300/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-green-300/20 rounded-full blur-2xl"></div>
            
            {/* Main Content Card */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/50">
              {/* Animated Icon Container */}
              <div className="relative mb-8">
                <div className="w-28 h-28 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-ping opacity-20"></div>
                  <div className="absolute inset-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg flex items-center justify-center">
                    <IoLocationOutline className="text-white text-5xl" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
                Find Nearby Stations
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Enable location access to discover EV charging stations within 5km of your current position
              </p>

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

            </div>
            <p className="absolute bottom-6 text-xs text-emerald-700/60 font-medium">
              🔒 Your location data is secure and private
            </p>
          </div>
        )}

        {locationStep === "selecting" && (
          <div className="flex-1 flex flex-col bg-slate-50">
            <div className="bg-white/90 backdrop-blur-lg shadow-md px-5 py-4 flex justify-between items-center border-b border-slate-100 shrink-0">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Set Your Location
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Drag the blue marker to adjust
              </p>
            </div>
          </div>

            <div className="flex-1 relative px-8 py-3">
              <div className="absolute top-2 left-4 right-4 h-8 bg-gradient-to-b from-slate-50/80 to-transparent z-10 pointer-events-none rounded-t-2xl"></div>
              
              {userLocation && markerPosition && (
                <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
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
                </div>
              )}
              
              <div className="absolute bottom-2 left-4 right-4 h-12 bg-gradient-to-t from-slate-50/80 to-transparent z-10 pointer-events-none rounded-b-2xl"></div>
            </div>

            <div className="bg-white shadow-2xl px-5 py-5 rounded-t-3xl border-t border-slate-100 shrink-0">
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
        )}

        {locationStep === "confirmed" && (
          <>
            <div className="flex-1 relative px-8 py-3">
              <div className="absolute top-2 left-4 right-4 h-6 bg-gradient-to-b from-slate-50/50 to-transparent z-10 pointer-events-none rounded-t-2xl"></div>
              
              {userLocation && (
                <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
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
                    
                    <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                      <Popup>
                        <strong>Your Location</strong>
                      </Popup>
                    </Marker>

                    {stations.map((station) => {
                      if (station.location && station.location.coordinates && station.location.coordinates.length === 2) {
                        const [lng, lat] = station.location.coordinates;
                        
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
                </div>
              )}

              {stations.length > 0 && (
                <div className="absolute top-6 left-10 z-20 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-slate-200">
                  <span className="text-sm font-bold text-emerald-600">{stations.length}</span>
                  <span className="text-xs text-slate-600 ml-1">stations nearby</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 h-[35%] flex flex-col shrink-0">
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-slate-300 rounded-full"></div>
              </div>
              
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
          </>
        )}
      </div>
      {renderNavigationBar()}
    </div>
  );
}

export default Location;
