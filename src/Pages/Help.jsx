import React from "react";
import "../components/Help.css"
import { Phone, Mail, MessageSquare } from "lucide-react"; // icons

function HelpSupport() {
  return (
    <div className="help-support-modal">
      <h2>Help and Support</h2>

      <div className="support-options">
        <div className="support-option">
          <Phone />
          <span>Call</span>
        </div>
        <div className="support-option">
          <Mail />
          <span>Mail</span>
        </div>
        <div className="support-option">
          <MessageSquare />
          <span>Feedback</span>
        </div>
      </div>

      <div className="support-info">
        <p><strong>Phone support hours</strong></p>
        <p>Monday - Sunday</p>
        <p className="support-hours">7AM to 12AM</p>
      </div>

      <button className="dismiss-btn">Dismiss</button>
    </div>
  );
}

export default HelpSupport;