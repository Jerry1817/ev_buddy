import React from "react";
import { Share2, Link2, Facebook, Instagram, Twitter, MessageCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function InviteFriends() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-slate-50 rounded-2xl px-6 py-6 text-center font-[Inter] text-[#1a1a1a] max-w-sm mx-auto shadow-md">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>
      
      <h2 className="text-2xl font-semibold text-[#004d4d] mb-3">Invite Your Friends</h2>

      <p className="text-sm text-slate-500 mb-5">
        Share the EV Buddy app link with your friends and help them join our network!
      </p>

      {/* Copy & Share Options */}
      <div className="flex justify-center gap-3 mb-5">
        <div className="bg-white border border-[#004d4d] rounded-2xl w-[120px] h-[100px] flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-[#e6f2f2]">
          <Link2 size={28} className="text-[#004d4d]" />
          <span className="text-[0.95rem] text-[#004d4d] font-medium mt-2">Copy Link</span>
        </div>

        <div className="bg-white border border-[#004d4d] rounded-2xl w-[120px] h-[100px] flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-[#e6f2f2]">
          <Share2 size={28} className="text-[#004d4d]" />
          <span className="text-[0.95rem] text-[#004d4d] font-medium mt-2">Share</span>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 mb-6">
        {[Facebook, Instagram, Twitter, MessageCircle].map((Icon, i) => (
          <div
            key={i}
            className="w-12 h-12 border border-[#004d4d] rounded-full flex items-center justify-center text-[#004d4d] cursor-pointer transition-transform duration-300 hover:bg-[#004d4d] hover:text-white hover:scale-110"
          >
            <Icon size={24} />
          </div>
        ))}
      </div>

      {/* Dismiss Button */}
      <button
        className="border border-[#004d4d] rounded-full px-12 py-2.5 text-base font-medium text-[#004d4d] cursor-pointer transition-colors duration-300 hover:bg-[#004d4d] hover:text-white"
      >
        Dismiss
      </button>
    </div>
  );
}

export default InviteFriends;
