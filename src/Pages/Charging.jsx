import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Charging() {
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  const handleCharging = () => {
    navigate("/payment");
  };

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (s) =>
    `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(
      Math.floor((s % 3600) / 60)
    ).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-white p-6 pb-24 flex flex-col items-center font-sans">
      {/* Back button */}
      <button className="self-start bg-transparent border-none text-[22px] cursor-pointer mb-1.5">
        ←
      </button>

      {/* Title */}
      <h2 className="text-[20px] font-extrabold mt-1.5 text-[#111111]">
        Charging Active
      </h2>

      {/* Timer */}
      <div className="font-mono text-5xl font-black my-7 text-[#111111]">
        {format(seconds)}
      </div>

      {/* Stop button */}
      <button
        onClick={handleCharging}
        className="py-[14px] px-5 bg-white border border-[#f3c3c3] text-red-500 rounded-xl font-extrabold cursor-pointer"
      >
        Stop Charging
      </button>

      {/* Bottom nav */}
      <div className="fixed inset-x-0 bottom-3 flex justify-center gap-4">
        <button className="w-14 h-11 rounded-xl border-none bg-white shadow-md">
          🏠
        </button>
        <button className="w-14 h-11 rounded-xl border-none bg-white shadow-md">
          📄
        </button>
        <button className="w-14 h-11 rounded-xl border-none bg-white shadow-md">
          👤
        </button>
      </div>
    </div>
  );
}

export default Charging;
