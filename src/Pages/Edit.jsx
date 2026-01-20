// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiSave, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * VehicleCard - small subcomponent for each vehicle
 */
function VehicleCard({ vehicle, onChange, onRemove }) {
  const update = (field, value) => onChange({ ...vehicle, [field]: value });

  return (
    <div className="bg-white rounded-xl p-3 border border-[#eef6f4] shadow-[0_4px_10px_rgba(9,46,45,0.03)]">
      {/* Top row */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <input
          className="w-full px-3 py-2 rounded-lg border border-[#edf7f5] font-semibold bg-[#fbfdfc] text-sm outline-none"
          placeholder="Vehicle name (e.g., Model 3)"
          value={vehicle.name}
          onChange={(e) => update("name", e.target.value)}
        />

        <button
          className="p-2 rounded-md bg-transparent text-red-600 hover:bg-red-50"
          title="Remove vehicle"
          onClick={() => onRemove(vehicle.id)}
        >
          <FiTrash2 />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2">
        {/* Range */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] text-teal-800 font-semibold">
            Range (km)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={vehicle.range || 0}
              onChange={(e) => update("range", Number(e.target.value))}
              className="flex-1 accent-emerald-500"
            />
            <input
              className="w-[84px] px-2.5 py-2 rounded-md border border-[#e9f2ef] text-right text-sm outline-none"
              type="number"
              min="0"
              max="1000"
              value={vehicle.range || ""}
              onChange={(e) => {
                const v = e.target.value;
                update("range", v === "" ? "" : Number(v));
              }}
            />
            <span className="text-[13px] text-slate-500">km</span>
          </div>
        </div>

        {/* Notes */}
        <textarea
          className="mt-1 px-3 py-2 rounded-md border border-[#eef6f4] min-h-[48px] resize-y text-sm outline-none"
          placeholder="Optional notes (battery type, charger, etc.)"
          value={vehicle.notes || ""}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>
    </div>
  );
}

export default function Edit() {
  const navigate = useNavigate();
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
      setVehicles([
        { id: Date.now(), name: "Model S", range: 405, notes: "" },
      ]);
    }
  }, []);

  // helper for updating a vehicle
  const updateVehicle = (updated) => {
    setVehicles((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
  };

  const addVehicle = () => {
    setVehicles((prev) => [
      ...prev,
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        name: "",
        range: 0,
        notes: "",
      },
    ]);
  };

  const removeVehicle = (id) =>
    setVehicles((prev) => prev.filter((v) => v.id !== id));

  // validate before save
  const validate = () => {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!/^\d{6,15}$/.test(phone.replace(/\s+/g, ""))) {
      toast.error("Please enter a valid phone number.");
      return false;
    }
    for (const v of vehicles) {
      if (v.name && v.name.length > 80) {
        toast.error("Vehicle name too long.");
        return false;
      }
      if (v.range !== "" && (isNaN(v.range) || v.range < 0)) {
        toast.error("Vehicle ranges must be numbers >= 0.");
        return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    const payload = { name, email, phone, vehicles };
    localStorage.setItem("profile_v1", JSON.stringify(payload));
    console.log("Profile saved:", payload);
    toast.success("Profile saved successfully!");
  };

  const handleReset = () => {
    if (!confirm("Reset profile to default demo values?")) return;
    localStorage.removeItem("profile_v1");
    setName("Thanzeel");
    setPhone("8075371985");
    setVehicles([
      { id: Date.now(), name: "Model S", range: 405, notes: "" },
    ]);
  };

  return (
    <div className="max-w-[720px] mx-auto mt-3 mb-6 px-4 py-5 font-[Inter,system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial] text-[#073b3a]">
      {/* Header */}
      <header className="flex items-center gap-3 mb-4">
        <button 
          className="text-[20px] bg-transparent border-none cursor-pointer"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h1 className="text-xl font-semibold">Profile</h1>
      </header>

      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="w-[110px] h-[110px] rounded-full bg-teal-800 flex items-center justify-center relative shadow-[0_6px_14px_rgba(9,46,45,0.06)]">
          <span className="text-5xl text-white font-bold">
            {(name && name[0].toUpperCase()) || "T"}
          </span>
          <button
            className="absolute right-1.5 bottom-1.5 bg-teal-500 text-white rounded-full border-none p-2 inline-flex items-center justify-center cursor-pointer"
            title="Edit avatar"
          >
            <FiEdit2 />
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="mb-4">
        <label className="block text-teal-800 font-semibold mt-2 mb-1.5">
          Name
        </label>
        <input
          className="w-full px-3.5 py-3 rounded-[14px] border border-[#e6efee] bg-[#f4f7f6] text-[15px] outline-none box-border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block text-teal-800 font-semibold mt-3 mb-1.5">
          Email
        </label>
        <input
          className="w-full px-3.5 py-3 rounded-[14px] border border-[#e6efee] bg-[#f4f7f6] text-[15px] outline-none box-border"
          value={email}
          readOnly
        />

        <label className="block text-teal-800 font-semibold mt-3 mb-1.5">
          Phone Number
        </label>
        <div className="flex items-center gap-2">
          <div className="px-3 py-3 rounded-[12px] bg-white border border-[#e6efee] text-teal-800 font-bold text-sm">
            +91
          </div>
          <input
            className="flex-1 px-3.5 py-3 rounded-[14px] border border-[#e6efee] bg-[#f4f7f6] text-[15px] outline-none box-border"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="8075371985"
          />
        </div>
      </div>

      {/* Vehicles Section */}
      <section className="mt-3">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="m-0 text-[16px] text-teal-800 font-semibold">
            EV Vehicles & Range
          </h2>
          <button
            className="inline-flex items-center gap-2 px-3 py-2 rounded-[12px] border border-emerald-500/10 bg-emerald-500/5 text-teal-800 font-semibold text-sm cursor-pointer"
            onClick={addVehicle}
          >
            <FiPlus /> Add Vehicle
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {vehicles.length === 0 && (
            <div className="text-[#6b7f7d] px-3 py-2 rounded-md bg-[#fbfdfc] border border-dashed border-[#e6efee] text-sm">
              No vehicles. Click Add Vehicle.
            </div>
          )}

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

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-4">
        <button
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-700 text-white font-bold border-none cursor-pointer"
          onClick={handleSave}
        >
          <FiSave /> Save
        </button>

        <button
          className="px-4 py-3 rounded-full bg-red-50 text-red-600 border border-red-200 font-bold cursor-pointer"
          onClick={handleReset}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
