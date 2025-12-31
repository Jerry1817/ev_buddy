// src/pages/Profile.jsx
import React from "react";

export default function Profile() {
  return (
    <div className="min-h-[90vh] bg-[#e8f9f0] px-5 py-5 text-[#1b1b1b] font-['Inter','Poppins',sans-serif]">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#e0e6e0] mb-6">
        <div className="flex items-center gap-4 mb-3 md:mb-0">
          <img
            src="https://via.placeholder.com/60"
            alt="user"
            className="w-[70px] h-[70px] rounded-full object-cover border-[3px] border-[#2ecc71] bg-[#fafafa] shadow-[0_2px_10px_rgba(46,204,113,0.2)]"
          />
          <div>
            <h2 className="text-[18px] font-bold m-0 text-[#1b1b1b]">
              Muhammed Hashim. K
            </h2>
            <p className="text-[14px] text-[#5f5f5f] mt-1 mb-1">
              +91-8136991817
            </p>
            <a
              href="/edit"
              className="text-[13px] font-semibold text-[#27ae60] hover:text-[#2ecc71] transition-colors"
            >
              Edit Profile ➜
            </a>
          </div>
        </div>

        <div className="self-end md:self-auto">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1000/1000913.png"
            alt="ev illustration"
            className="w-20 h-20 opacity-95"
          />
        </div>
      </header>

      {/* My EV Section */}
      <section className="mb-5">
        <h3 className="text-[16px] font-bold text-[#27ae60] mb-2">
          My EVs
        </h3>
        <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-3 border border-[#e0e6e0] shadow-[0_4px_12px_rgba(0,0,0,0.05)] w-fit md:w-fit hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(46,204,113,0.15)] transition">
          <img
            src="https://cdn.pixabay.com/photo/2021/05/20/12/23/electric-scooter-6267250_1280.png"
            alt="Ather 450 Apex"
            className="w-[90px] h-[60px] object-contain"
          />
          <p className="font-semibold text-[#1b1b1b] m-0">
            ATHER • 450 Apex
          </p>
        </div>
      </section>

      {/* Wallet Section */}
      <section className="mb-5">
        <div className="flex justify-between items-center bg-white rounded-xl px-4 py-3 border border-[#e0e6e0] shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(46,204,113,0.15)] transition">
          <div className="flex items-center gap-2 font-semibold">
            <span className="bg-[#2ecc71] text-white text-[18px] rounded-lg w-9 h-9 flex items-center justify-center">
              💳
            </span>
            <span>My Wallet</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-[#27ae60]">
            <span>₹0.00</span>
            <span className="text-lg">›</span>
          </div>
        </div>
      </section>

      {/* General Options */}
      <section className="mb-6">
        <h3 className="text-[16px] font-bold text-[#27ae60] mb-2">
          General
        </h3>
        <ul className="list-none p-0 m-0 grid gap-2">
          <li>
            <a
              href="/invite"
              className="flex items-center gap-3 no-underline text-[#1b1b1b] bg-white rounded-xl px-3 py-3 border border-[#e0e6e0] shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition hover:bg-[#2ecc71] hover:text-white hover:-translate-y-0.5"
            >
              <span className="text-[18px]">👥</span>
              <span>Invite your Friends</span>
            </a>
          </li>
          <li>
            <a
              href="/help"
              className="flex items-center gap-3 no-underline text-[#1b1b1b] bg-white rounded-xl px-3 py-3 border border-[#e0e6e0] shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition hover:bg-[#2ecc71] hover:text-white hover:-translate-y-0.5"
            >
              <span className="text-[18px]">🛠️</span>
              <span>Help and Support</span>
            </a>
          </li>
          <li>
            <a
              href="/privacy"
              className="flex items-center gap-3 no-underline text-[#1b1b1b] bg-white rounded-xl px-3 py-3 border border-[#e0e6e0] shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition hover:bg-[#2ecc71] hover:text-white hover:-translate-y-0.5"
            >
              <span className="text-[18px]">🔒</span>
              <span>Privacy Policy</span>
            </a>
          </li>
        </ul>
      </section>

      {/* Logout Button */}
      <div className="flex justify-center mt-5">
        <button
          className="bg-gradient-to-r from-[#27ae60] to-[#2ecc71] text-white px-7 py-3 rounded-xl font-bold cursor-pointer shadow-[0_4px_10px_rgba(46,204,113,0.3)] transition transform hover:from-[#2ecc71] hover:to-[#27ae60] hover:scale-[1.03] border-none"
        >
          ⎋ Logout
          
        </button>
      </div>
    </div>
  );
}
