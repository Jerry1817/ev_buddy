import React from "react";
import "../components/Payment.css";

function Payment() {
  return (
    <div className="pay-container">

      <button className="pay-back">←</button>

      <h2 className="pay-title">Payment Successful ✔</h2>

      <div className="pay-card">
        <div className="row">
          <span>Energy used</span>
          <strong>15.6 kWh</strong>
        </div>

        <div className="row">
          <span>Rate</span>
          <span>₹ 13.00 / kWh</span>
        </div>

        <div className="row">
          <span>Service Fee</span>
          <span>₹ 4.04</span>
        </div>

        <div className="row">
          <span>GST (approx)</span>
          <span>₹ 35.25</span>
        </div>

        <div className="row total">
          <span>Total Payable</span>
          <strong>₹ 242</strong>
        </div>
      </div>

      <button className="pay-btn">Proceed to Pay</button>

      <div className="bottom-nav">
        <button>🏠</button>
        <button>📄</button>
        <button>👤</button>
      </div>
    </div>
  );
}

export default Payment;