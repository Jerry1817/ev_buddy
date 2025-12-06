import React, { useState } from "react";


export default function RequestCard({ request, onAccept, onReject }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleAccept = async () => {
    setBusy(true);
    try {
      await onAccept(request.id);
      setOpen(false);
    } catch (err) {
      alert("Accept failed: " + (err.message || err));
    } finally {
      setBusy(false);
    }
  };

  const handleReject = async () => {
    const ok = window.confirm("Reject this request?");
    if (!ok) return;
    setBusy(true);
    try {
      await onReject(request.id);
      setOpen(false);
    } catch (err) {
      alert("Reject failed: " + (err.message || err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="request-card" onClick={() => setOpen(true)} role="button" tabIndex={0}>
        <div className="request-left">
          <div className="guest-name">{request.guestName}</div>
          <div className="req-kwh">Req: {request.requestedKwh} kWh</div>
          <div className="eta">ETA: {new Date(request.eta).toLocaleTimeString()}</div>
        </div>
        <div className="request-actions">
          <button className="accept-btn" onClick={(e)=>{ e.stopPropagation(); handleAccept(); }} disabled={busy}>
            Accept
          </button>
          <button className="reject-btn" onClick={(e)=>{ e.stopPropagation(); handleReject(); }} disabled={busy}>
            Reject
          </button>
        </div>
      </div>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h3>User details</h3>
            <div className="modal-row"><strong>Name:</strong> {request.guestName}</div>
            <div className="modal-row"><strong>Phone:</strong> {request.guestPhone}</div>
            <div className="modal-row"><strong>Requested:</strong> {request.requestedKwh} kWh</div>
            <div className="modal-row"><strong>ETA:</strong> {new Date(request.eta).toLocaleString()}</div>
            {request.note && <div className="modal-row"><strong>Note:</strong> {request.note}</div>}
            <div className="modal-actions">
              <button className="accept-btn" onClick={handleAccept} disabled={busy}>Accept</button>
              <button className="reject-btn" onClick={handleReject} disabled={busy}>Reject</button>
              <button className="btn-secondary" onClick={() => setOpen(false)} disabled={busy}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
