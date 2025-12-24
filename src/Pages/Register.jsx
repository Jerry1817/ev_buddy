import React from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#d7f8e4] to-[#f0fff4] font-['Poppins'] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-[340px]">
        <h2 className="text-2xl font-bold text-[#1d3557] mb-2">
          Create Your Account
        </h2>

        <p className="text-sm text-gray-600 mb-8">
          Choose your registration type
        </p>

        <div className="flex flex-col gap-4">
          <button
            className="py-3 bg-emerald-500 text-white font-semibold text-lg rounded-xl cursor-pointer transition active:scale-[0.98] hover:opacity-90"
            onClick={() => navigate("/hostregister")}
          >
            Host Register
          </button>

          <button
            className="py-3 bg-blue-500 text-white font-semibold text-lg rounded-xl cursor-pointer transition active:scale-[0.98] hover:opacity-90"
            onClick={() => navigate("/userregister")}
          >
            User Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
