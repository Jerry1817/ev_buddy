// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import "../components/Edit.css";
import { FiEdit2, FiPlus, FiTrash2, FiSave } from "react-icons/fi";

/**
 * VehicleCard - small subcomponent for each vehicle
 */
function VehicleCard({ vehicle, onChange, onRemove }) {
  const update = (field, value) => onChange({ ...vehicle, [field]: value });

  return (
    <div className="vehicle-card">
      <div className="vehicle-card-top">
        <div className="vehicle-title">
          <input
            className="vehicle-title-input"
            placeholder="Vehicle name (e.g., Model 3)"
            value={vehicle.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        <button
          className="icon-btn remove-vehicle"
          title="Remove vehicle"
          onClick={() => onRemove(vehicle.id)}
        >
          <FiTrash2 />
        </button>
      </div>

      <div className="vehicle-card-body">
        <div className="range-group">
          <label className="range-label">Range (km)</label>
          <div className="range-controls">
            <input
              type="range"
              min="0"
              max="1000"
              value={vehicle.range || 0}
              onChange={(e) => update("range", Number(e.target.value))}
            />
            <input
              className="range-number"
              type="number"
              min="0"
              max="1000"
              value={vehicle.range || ""}
              onChange={(e) => {
                const v = e.target.value;
                update("range", v === "" ? "" : Number(v));
              }}
            />
            <span className="km">km</span>
          </div>
        </div>

        <textarea
          className="vehicle-notes"
          placeholder="Optional notes (battery type, charger, etc.)"
          value={vehicle.notes || ""}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>
    </div>
  );
}

export default function Edit() {
  const [name, setName] = useState("");
  const [email] = useState("thanzeelt717@gmail.com");
  const [phone, setPhone] = useState("");
  const [vehicles, setVehicles] = useState([]);

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("profile_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setName(parsed.name || "");
        setPhone(parsed.phone || "");
        setVehicles(parsed.vehicles || []);
      } catch (e) {
        console.warn("Failed to parse saved profile", e);
      }
    } else {
      // sensible defaults like the screenshot
      setName("Thanzeel");
      setPhone("8075371985");
      setVehicles([{ id: Date.now(), name: "Model S", range: 405, notes: "" }]);
    }
  }, []);

  // helper for updating a vehicle
  const updateVehicle = (updated) => {
    setVehicles((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
  };

  const addVehicle = () => {
    setVehicles((prev) => [
      ...prev,
      { id: Date.now() + Math.floor(Math.random() * 1000), name: "", range: 0, notes: "" },
    ]);
  };

  const removeVehicle = (id) => setVehicles((prev) => prev.filter((v) => v.id !== id));

  // validate before save
  const validate = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return false;
    }
    if (!/^\d{6,15}$/.test(phone.replace(/\s+/g, ""))) {
      alert("Please enter a valid phone number.");
      return false;
    }
    // optional: ensure vehicle names
    for (const v of vehicles) {
      if (v.name && v.name.length > 80) {
        alert("Vehicle name too long.");
        return false;
      }
      if (v.range !== "" && (isNaN(v.range) || v.range < 0)) {
        alert("Vehicle ranges must be numbers >= 0.");
        return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    const payload = { name, email, phone, vehicles };
    // persist locally for demo - replace this with API call
    localStorage.setItem("profile_v1", JSON.stringify(payload));
    console.log("Profile saved:", payload);
    alert("Profile saved locally. Replace with API call if needed.");
  };

  const handleReset = () => {
    if (!confirm("Reset profile to default demo values?")) return;
    localStorage.removeItem("profile_v1");
    setName("Thanzeel");
    setPhone("8075371985");
    setVehicles([{ id: Date.now(), name: "Model S", range: 405, notes: "" }]);
  };

  return (
    <div className="profile-page green-theme">
      <header className="header">
        <button className="back">←</button>
        <h1>Profile</h1>
      </header>

      <div className="avatar-row">
        <div className="avatar">
          <span className="avatar-initial">{(name && name[0].toUpperCase()) || "T"}</span>
          <button className="avatar-edit" title="Edit avatar">
            <FiEdit2 />
          </button>
        </div>
      </div>

      <div className="fields">
        <label className="field-label">Name</label>
        <input className="field-input" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="field-label">Email</label>
        <input className="field-input" value={email} readOnly />

        <label className="field-label">Phone Number</label>
        <div className="phone-row">
          <div className="country">+91</div>
          <input
            className="field-input phone-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="8075371985"
          />
        </div>
      </div>

      <section className="vehicles-section-card">
        <div className="vehicles-head">
          <h2>EV Vehicles & Range</h2>
          <div className="vehicles-actions">
            <button className="add-btn" onClick={addVehicle}>
              <FiPlus /> Add Vehicle
            </button>
          </div>
        </div>

        <div className="vehicles-list">
          {vehicles.length === 0 && <div className="empty">No vehicles. Click Add Vehicle.</div>}
          {vehicles.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onChange={updateVehicle}
              onRemove={removeVehicle}
            />
          ))}
        </div>
      </section>

      <div className="actions-row">
        <button className="save-primary" onClick={handleSave}>
          <FiSave /> Save
        </button>
        <button className="danger" onClick={handleReset}>
          Delete Account
        </button>
      </div>
    </div>
  );
}