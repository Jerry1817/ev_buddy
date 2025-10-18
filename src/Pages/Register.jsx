import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Register.css"; // Optional – if you want to style separately

function Register() {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Your Account</h2>
        <p className="register-subtitle">Choose your registration type</p>

        <div className="button-group">
          <button
            className="register-btn host-btn"
            onClick={() => navigate("/hostregister")}
          >
            Host Register
          </button>

          <button
            className="register-btn user-btn"
            onClick={() => navigate("/userregister")}
          >
            User Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
