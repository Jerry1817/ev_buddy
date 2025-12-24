import React from "react";

function Payment() {
  return (
    <div className="min-h-screen bg-[#fafafa] px-6 pt-5 pb-24 box-border flex flex-col items-center font-[Inter,system-ui,-apple-system,'Segoe UI',Roboto,Arial]">
      {/* Back Button */}
      <button className="self-start bg-transparent border-none text-[20px] cursor-pointer mb-2">
        ←
      </button>

      {/* Title */}
      <h2 className="text-[20px] font-extrabold text-[#111111] my-2">
        Payment Successful ✔
      </h2>

      {/* Card */}
      <div className="w-full max-w-[420px] bg-white rounded-xl p-4 shadow-[0_6px_18px_rgba(20,30,40,0.06)] flex flex-col gap-2 mt-2">
        <div className="flex justify-between py-2 text-[#444] border-b border-[#f3f4f6]">
          <span>Energy used</span>
          <strong>15.6 kWh</strong>
        </div>

        <div className="flex justify-between py-2 text-[#444] border-b border-[#f3f4f6]">
          <span>Rate</span>
          <span>₹ 13.00 / kWh</span>
        </div>

        <div className="flex justify-between py-2 text-[#444] border-b border-[#f3f4f6]">
          <span>Service Fee</span>
          <span>₹ 4.04</span>
        </div>

        <div className="flex justify-between py-2 text-[#444] border-b border-[#f3f4f6]">
          <span>GST (approx)</span>
          <span>₹ 35.25</span>
        </div>

        <div className="flex justify-between pt-3 pb-2 font-extrabold text-[18px]">
          <span>Total Payable</span>
          <strong>₹ 242</strong>
        </div>
      </div>

      {/* Proceed Button */}
      <button className="w-full max-w-[420px] mt-4 py-3.5 bg-emerald-500 text-white rounded-2xl font-extrabold text-[16px] border-none cursor-pointer active:scale-[0.98] transition">
        Proceed to Pay
      </button>

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

export default Payment;
