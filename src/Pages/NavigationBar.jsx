import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IoArrowBackOutline,
  IoHomeOutline,
  IoListOutline,
  IoAddCircleOutline,
  IoPersonOutline,
} from "react-icons/io5";

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const showBack = location.pathname !== "/home";

  const isActive = (path) => location.pathname === path;

  const baseIconClasses =
    "w-[54px] h-11 flex items-center justify-center rounded-xl border-none cursor-pointer shadow-[0_6px_12px_rgba(0,0,0,0.06)] transition-transform duration-200 text-[18px]";
  const activeClasses =
    "bg-emerald-500 text-white font-semibold shadow-[0_6px_12px_rgba(46,204,113,0.25)]";
  const inactiveClasses = "bg-white text-gray-700";

  return (
    <>
      {/* Top Nav Bar */}
      <div className="fixed top-0 w-full h-[58px] bg-white flex items-center justify-between px-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] z-[999] font-[Inter,sans-serif]">
        {/* Back Button */}
        {showBack ? (
          <button
            className="bg-transparent border-none text-[#1a1a1a] cursor-pointer p-1.5 flex items-center text-[18px] hover:opacity-70 transition"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackOutline size={20} />
          </button>
        ) : (
          // keep space when back button is hidden
          <div className="w-6" />
        )}

        {/* Center Title */}
        <h3 className="absolute left-1/2 -translate-x-1/2 font-bold text-[18px] text-[#1a1a1a] m-0">
          EV Buddy
        </h3>

        {/* Spacer on right to balance layout */}
        <div className="w-6" />
      </div>

      {/* Bottom Icon Bar */}
      <div className="fixed bottom-3 left-0 right-0 flex justify-center gap-4 z-[1000] font-[Inter,sans-serif]">
        <button
          className={`${baseIconClasses} ${
            isActive("/home") ? activeClasses : inactiveClasses
          }`}
          onClick={() => navigate("/home")}
        >
          <IoHomeOutline size={18} />
        </button>

        <button
          className={`${baseIconClasses} ${
            isActive("/activity") ? activeClasses : inactiveClasses
          }`}
          onClick={() => navigate("/activity")}
        >
          <IoListOutline size={18} />
        </button>

        <button
          className={`${baseIconClasses} ${
            isActive("/hostregister") ? activeClasses : inactiveClasses
          }`}
          onClick={() => navigate("/hostregister")}
        >
          <IoAddCircleOutline size={18} />
        </button>

        <button
          className={`${baseIconClasses} ${
            isActive("/profile") ? activeClasses : inactiveClasses
          }`}
          onClick={() => navigate("/profile")}
        >
          <IoPersonOutline size={18} />
        </button>
      </div>
    </>
  );
}

export default NavigationBar;
