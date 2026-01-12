import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HostLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  /* 🔁 AUTO LOGIN CHECK */
  useEffect(() => {
    const token = localStorage.getItem("hostToken");
    const role = localStorage.getItem("role");

    if (token && role === "host") {
      navigate("/hostrequests"); // auto redirect
    }
  }, [navigate]); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔐 LOGIN API
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      
      
      console.log(res,"resssssssssss");
      const { token, role } = res.data;

      // ❌ If not host
      if (role !== "HOST") {
        alert("This account is not registered as a host");
        setLoading(false);
        return;
      }

      // ✅ SAVE HOST TOKEN SAFELY
      // localStorage.setItem("hostToken", token);
      localStorage.setItem("role", role);
      localStorage.setItem("hosttoken", token);


      navigate("/hostrequests");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Host login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Host Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="Host Email"
            className="mb-4 p-3 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-4 p-3 border border-gray-300 rounded-lg text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-emerald-700 active:scale-[0.98] transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don’t have a host account?{" "}
          <span
            onClick={() => navigate("/hostregister")}
            className="text-emerald-600 font-medium cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default HostLogin;
