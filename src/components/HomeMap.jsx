import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function HomeMap() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stations/all")
      .then((res) => setStations(res.data))
      .catch((err) => console.error("Map load error", err));
  }, []);

  return (
    <MapContainer
      center={[10.9797, 76.2077]} // Kerala default
      zoom={13}
      style={{ height: "70vh", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stations.map((station) => (
        <Marker
          key={station._id}
          position={[
            station.location.lat,
            station.location.lng,
          ]}
        >
          <Popup>
            <strong>{station.stationName}</strong>
            <br />
            ⚡ {station.power} kW <br />
            🔌 {station.totalChargers} chargers <br />
            💰 ₹{station.rate}/kW
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default HomeMap;
