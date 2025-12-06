import React, { useState } from "react";
import "../components/RequestCard.css"
export default function RequestCard({ request, onAccept, onReject }) {
  const [open, setOpen] = useState(false);
  const statusClass = {
    pending: "badge-pending",
    accepted: "badge-accepted",
    rejected: "badge-rejected",
  }[request.status || "pending"];

  return (
    <>
      <div className="req-card" onClick={() => setOpen(true)}>
        <div className="req-left">
          <div className="avatar">{request.name.charAt(0)}</div>
        </div>

        <div className="req-body">
          <div className="req-top">
            <div>
              <div className="req-name">{request.name}</div>
              <div className="req-sub"> {request.model}</div>
            </div>

            <div className={`req-badge ${statusClass}`}>
              {request.status === "pending" ? "Pending" : request.status === "accepted" ? "Accepted" : "Rejected"}
            </div>
          </div>

          <div className="req-meta">
            <div className="distance">{request.distance} • {request.eta}</div>
            <div className="actions">
              <button
                className="btn-ghost"
                onClick={(e) => { e.stopPropagation(); onReject(); }}
              >
                Reject
              </button>
              <button
                className="btn-primary"
                onClick={(e) => { e.stopPropagation(); onAccept(); }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <div className="avatar large">{request.name.charAt(0)}</div>
              <div>
                <div className="req-name">{request.name}</div>
                <div className="req-sub">{request.model}</div>
              </div>
            </div>

            <div className="modal-body">
              <div><strong>Phone:</strong> <a href={`tel:${request.phone}`}>{request.phone}</a></div>
              <div><strong>Email:</strong> <a href={`mailto:${request.email}`}>{request.email}</a></div>
              <div style={{ marginTop: 8 }}><strong>Distance:</strong> {request.distance} • {request.eta}</div>
            </div>

            <div className="modal-actions">
              <button className="btn-ghost" onClick={() => { onReject(); setOpen(false); }}>Reject</button>
              <button className="btn-primary" onClick={() => { onAccept(); setOpen(false); }}>Accept</button>
              <button className="btn-secondary" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
