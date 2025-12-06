import React from "react";
import "../components/Invite.css";
import { Share2, Link2, Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

function InviteFriends() {
  return (
    <div className="invite-modal">
      <h2>Invite Your Friends</h2>
      <p className="invite-text">
        Share the EV Buddy app link with your friends and help them join our network!
      </p>

      <div className="invite-options">
        <div className="invite-option">
          <Link2 size={28} />
          <span>Copy Link</span>
        </div>
        <div className="invite-option">
          <Share2 size={28} />
          <span>Share</span>
        </div>
      </div>

      <div className="social-options">
        <div className="social-icon"><Facebook size={26} /></div>
        <div className="social-icon"><Instagram size={26} /></div>
        <div className="social-icon"><Twitter size={26} /></div>
        <div className="social-icon"><MessageCircle size={26} /></div>
      </div>

      <button className="dismiss-btn">Dismiss</button>
    </div>
  );
}

export default InviteFriends;