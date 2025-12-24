import React from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";

function HelpSupport() {
  return (
    <div className="bg-slate-50 rounded-2xl px-6 py-6 text-center font-[Inter,sans-serif] text-[#1a1a1a] max-w-sm mx-auto shadow-md">
      <h2 className="text-2xl font-semibold mb-5">Help and Support</h2>

      {/* Options */}
      <div className="flex justify-around gap-3 mb-5">
        <div className="bg-[#f9fff9] border border-[#0fe104] rounded-2xl w-[110px] h-[110px] flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-[#fdfdfd]">
          <Phone className="mb-2 text-teal-900" />
          <span className="text-[0.95rem] text-teal-900 font-medium">
            Call
          </span>
        </div>

        <div className="bg-[#f9fff9] border border-[#0fe104] rounded-2xl w-[110px] h-[110px] flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-[#fdfdfd]">
          <Mail className="mb-2 text-teal-900" />
          <span className="text-[0.95rem] text-teal-900 font-medium">
            Mail
          </span>
        </div>

        <div className="bg-[#f9fff9] border border-[#0fe104] rounded-2xl w-[110px] h-[110px] flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-[#fdfdfd]">
          <MessageSquare className="mb-2 text-teal-900" />
          <span className="text-[0.95rem] text-teal-900 font-medium">
            Feedback
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="text-[0.9rem] text-slate-500 mt-2">
        <p>
          <strong className="text-teal-900 font-semibold">
            Phone support hours
          </strong>
        </p>
        <p>Monday - Sunday</p>
        <p className="text-[#0077ff] font-medium text-[0.95rem]">
          7AM to 12AM
        </p>
      </div>

      {/* Dismiss button */}
      <button
        className="mt-6 border border-[#13b005] rounded-full px-12 py-2.5 text-base font-medium text-teal-900 cursor-pointer transition-colors duration-300 hover:bg-[#13b005] hover:text-slate-100 bg-transparent"
        type="button"
      >
        Dismiss
      </button>
    </div>
  );
}

export default HelpSupport;
