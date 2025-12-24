import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HostRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    ports: "",
    power: "",
    rate: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    alert("Host Registered Successfully!");

    navigate("/hostrequests");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Host
        </h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="mb-4 p-3 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 outline-none"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="mb-4 p-3 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 outline-none"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            className="mb-4 p-3 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 outline-none"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-4 p-3 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 outline-none"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              name="ports"
              placeholder="Available ports"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 outline-none"
              value={formData.ports}
              onChange={handleChange}
            />

            <input
              type="text"
              name="power"
              placeholder="kW"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 outline-none"
              value={formData.power}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              name="rate"
              placeholder="Rate/kW"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 outline-none"
              value={formData.rate}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 outline-none"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold text-lg cursor-pointer hover:bg-emerald-700 active:scale-[0.98] transition-all"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default HostRegister;
