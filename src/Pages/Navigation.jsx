import React from "react";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const address = encodeURIComponent("431146-A,B,C Pattarkulam, Manjeri");

  const openMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${address}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] px-4 pt-5 pb-24 box-border flex flex-col items-center font-[Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial]">
      {/* Back button */}
      <button
        className="self-start bg-transparent border-none text-[22px] cursor-pointer mb-1.5"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      {/* Title */}
      <h2 className="text-[20px] font-bold text-[#111111] mb-3 self-start">
        Navigation
      </h2>

      {/* Card */}
      <div
        className="w-full max-w-[420px] bg-[#eef6fb] rounded-2xl p-4 flex flex-col gap-3 cursor-pointer"
        onClick={() => navigate("/hostaccepted")}
      >
        <h3 className="text-[18px] font-extrabold text-[#111111] mt-1 mb-1">
          ThunderPlus EV Charge Hub
        </h3>

        <p className="text-[14px] text-slate-600 leading-snug">
          431146-A,B,C,Pattarkulam,
          <br />
          Manjeri
        </p>

        <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mt-1">
          <span>📍 9.4 km</span>
          <span>•</span>
          <span>17 mins</span>
        </div>
      </div>

     

      {/* Bottom Nav */}
      <div className="fixed left-0 right-0 bottom-3 flex justify-center gap-4">
        <button className="w-14 h-11 rounded-xl border-none bg-white shadow-[0_6px_12px_rgba(0,0,0,0.06)]">
          🏠
        </button>
        <button className="w-14 h-11 rounded-xl border-none bg-white shadow-[0_6px_12px_rgba(0,0,0,0.06)]">
          📄
        </button>
        <button className="w-14 h-11 rounded-xl border-none bg-white shadow-[0_6px_12px_rgba(0,0,0,0.06)]">
          👤
        </button>
      </div>
    </div>
  );
}

export default Navigation;
