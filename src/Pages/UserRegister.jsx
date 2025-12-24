import React, { useState } from "react";
import "../components/UserRegister.css";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    evModel: "",
  });

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
    alert("User Registered Successfully!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          User
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="mb-4 p-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="mb-4 p-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            className="mb-4 p-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-4 p-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            value={formData.password}
            onChange={handleChange}
          />

          {/* EV Model Select */}
          <select
            name="evModel"
            className="mb-4 p-3 border border-gray-300 rounded-lg text-sm bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            value={formData.evModel}
            onChange={handleChange}
          >
            <option value="">Select EV model</option>
            <option value="Tesla Model 3">Tesla Model 3</option>
            <option value="Nissan Leaf">Nissan Leaf</option>
            <option value="Hyundai Kona">Hyundai Kona</option>
            <option value="MG ZS EV">MG ZS EV</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleClick}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg cursor-pointer hover:bg-blue-700 active:scale-[0.98] transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
