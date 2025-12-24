import React, { useState } from "react";
import RequestCard from "./RequestCard";
import "../components/HostRequests.css"
/**
 * Design reference image:
 * /mnt/data/A_mobile_user_interface_(UI)_design_mockup_display.png
 *
 * Route: add a route like /hostrequests to show this page.
 */

const initial = [
  {
    id: "r1",
    name: "Justin Clark",
    model: "Nissan Leaf", 
    distance: "1.2 mi",
    eta: "5 min",
    phone: "+1 987 654 3210",
    email: "justin.clark@example.com",
    status: "pending", // pending | accepted | rejected
    createdAt: Date.now() - 1000 * 60 * 3,
  },
  {
    id: "r2",
    name: "Marvin Ray",
    model: "Sanda Tano",
    distance: "1.2 mi",
    eta: "5 min",
    phone: "+1 987 111 2222",
    email: "marvin.ray@example.com",
    status: "rejected",
    createdAt: Date.now() - 1000 * 60 * 30,
  },
  {
    id: "r3",
    name: "Randy Hunt",
    model: "Random Lara",
    distance: "0.9 mi",
    eta: "3 min",
    phone: "+1 987 333 4444",
    email: "randy.hunt@example.com",
    status: "accepted",
    createdAt: Date.now() - 1000 * 60 * 10,
  },
];

export default function HostRequests() {
  const [requests, setRequests] = useState(initial);

  const updateStatus = (id, newStatus) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <div className="host-requests-page">
      <header className="hr-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          ←
        </button>
        <h1>Host Requests</h1>
        <div className="hr-spacer" />
      </header>

      <div className="hr-search">
        <input placeholder="Filter requests or search by name..." />
      </div>

      <main className="hr-list">
        {requests.map((r) => (
          <RequestCard
            key={r.id}
            request={r}
            onAccept={() => updateStatus(r.id, "accepted")}
            onReject={() => updateStatus(r.id, "rejected")}
          />
        ))}

        {requests.length === 0 && <div className="empty">No requests right now</div>}
      </main>
    </div>
  );
}
