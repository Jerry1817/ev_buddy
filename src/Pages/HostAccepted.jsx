import React from "react";
import { useNavigate } from "react-router-dom";

export default function HostAccepted() {
  const navigate = useNavigate();

  const host = {
    name: "ThunderPlus EV Charge Hub",
    phone: "8075371985",
    altPhone: "8075571985",
  };

  const handleNavigate = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=ThunderPlus+EV+Charge+Hub",
      "_blank"
    );
  };

  const handleCall = () => {
    window.location.href = `tel:${host.phone}`;
  };

  const handleArrived = () => {
    navigate("/charging");
  };

  return (
    <div className="max-w-[430px] mx-auto p-5 text-center bg-white font-['Inter']">
      
      {/* Back Button */}
      <div className="text-left text-[26px] cursor-pointer">
        <span onClick={() => navigate(-1)}>←</span>
      </div>

      {/* Avatar */}
      <div className="flex justify-center mt-6">
        <div className="w-[90px] h-[90px] bg-[#ff7a32] rounded-full text-white text-[46px] font-bold flex items-center justify-center">
          {host.name[0]}
        </div>
      </div>

      {/* Host Info */}
      <h2 className="mt-4 text-[22px] font-extrabold">{host.name}</h2>
      <div className="text-[15px] text-[#333]">{host.phone}</div>
      <div className="text-[14px] text-[#555] mb-6">{host.altPhone}</div>

      {/* Buttons */}
      <button
        onClick={handleNavigate}
        className="w-[90%] py-3.5 bg-green-600 text-white rounded-xl text-[16px] font-semibold cursor-pointer active:scale-[0.98] transition"
      >
        Navigate to Host
      </button>

      <button
        onClick={handleCall}
        className="w-[90%] py-3.5 bg-[#f3f3f3] text-[#222] rounded-xl text-[16px] cursor-pointer mt-3 active:scale-[0.98] transition"
      >
        Call Host
      </button>

      <button
        onClick={handleArrived}
        className="w-[90%] py-3.5 border border-[#ccc] text-black rounded-xl text-[16px] font-semibold mt-3 cursor-pointer active:scale-[0.98] transition"
      >
        I Have Arrived
      </button>

      {/* Info Text */}
      <p className="mt-6 text-[14px] text-[#666] leading-relaxed px-3">
        Host accepted your request — you can navigate or mark arrival when you reach.
      </p>
    </div>
  );
}
