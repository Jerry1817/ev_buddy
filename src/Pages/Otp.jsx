import React from "react";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function OTPVerification() {
  const navigate = useNavigate();
    const location = useLocation();

      const emailuser = location.state?.email;


  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);


  useEffect(() => {
  if (!emailuser) {
    navigate("/register");
  }
}, [emailuser, navigate]);


  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Countdown timer for resend
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (index === 5 && value) {
      const completeOtp = [...newOtp];
      completeOtp[5] = value;
      if (completeOtp.every((digit) => digit !== "")) {
        handleVerify(completeOtp.join(""));
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData
      .split("")
      .concat(Array(6 - pastedData.length).fill(""));
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();

    // Auto-verify if complete
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  console.log(otp, "otp");

  const handleVerify = async (otpCode = otp.join("")) => {
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    try {
      setIsVerifying(true);
      setError("");

      const res = await axios.post("http://localhost:5000/api/auth/verifyotp", {
        otp: otpCode,
      });

      if (res.data.success) {
        toast.success("OTP verified successfully");
        navigate("/Login");
      } else {
       toast.error(res.data.message || "Failed to resend OTP");
          setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const showSuccessToast = () => {
    // Create toast element
    const toast = document.createElement("div");
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 24px;
        right: 24px;
        background: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        border-left: 4px solid #059669;
      ">
        <div style="
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        ">✓</div>
        <div>
          <div style="font-weight: 600; color: #0f172a; margin-bottom: 2px;">Verification Successful!</div>
          <div style="font-size: 14px; color: #64748b;">Redirecting to login...</div>
        </div>
      </div>
    `;

    document.body.appendChild(toast);

    // Redirect after 2 seconds
    setTimeout(() => {
      toast.remove();
      // Replace with actual navigation
      window.location.href = "/login";
    }, 2000);
  };

 const handleResend = async () => {
  if (!canResend) return;

  try {
    setCanResend(false);
    setResendTimer(60);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();

    const res = await axios.post(
      "http://localhost:5000/api/auth/resendotp",
      { email:emailuser }
    );

    if (res.data.success) {
      toast.success("OTP resent successfully");
    } else {
      toast.error(res.data.message || "Failed to resend OTP");
    }

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to resend OTP"
    );
  }
};


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .otp-input {
          transition: all 0.2s ease;
        }

        .otp-input:focus {
          transform: scale(1.05);
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div
        style={{
          background: "white",
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          padding: "48px",
          maxWidth: "480px",
          width: "100%",
          animation: "slideUp 0.5s ease-out",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: "40px",
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          🔐
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#0f172a",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Verify Your Account
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "#64748b",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          We've sent a verification code to
          <br />
          <strong style={{ color: "#0f172a" }}>{emailuser}</strong>
        </p>

        {/* OTP Input */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
              inputMode="numeric"
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "#fee2e2",
              border: "1px solid #fecaca",
              borderRadius: "12px",
              padding: "12px 16px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              animation: "slideUp 0.3s ease-out",
            }}
          >
            <span style={{ fontSize: "18px" }}>⚠️</span>
            <span
              style={{ fontSize: "14px", color: "#991b1b", fontWeight: "500" }}
            >
              {error}
            </span>
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={() => handleVerify()}
          disabled={otp.some((digit) => !digit) || isVerifying}
          style={{
            width: "100%",
            background:
              otp.some((digit) => !digit) || isVerifying
                ? "#cbd5e1"
                : "linear-gradient(135deg, #059669 0%, #047857 100%)",
            color: "white",
            border: "none",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor:
              otp.some((digit) => !digit) || isVerifying
                ? "not-allowed"
                : "pointer",
            boxShadow:
              otp.some((digit) => !digit) || isVerifying
                ? "none"
                : "0 4px 12px rgba(5,150,105,0.3)",
            transition: "all 0.2s",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {isVerifying ? (
            <>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  border: "3px solid white",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
              Verifying...
            </>
          ) : (
            <>
              <span>✓</span>
              Verify OTP
            </>
          )}
        </button>

        {/* Resend Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#64748b",
              marginBottom: "8px",
            }}
          >
            Didn't receive the code?
          </p>

          {canResend ? (
            <button
              onClick={handleResend}
              style={{
                background: "none",
                border: "none",
                color: "#059669",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "underline",
                padding: "4px 8px",
              }}
            >
              Resend OTP
            </button>
          ) : (
            <p
              style={{
                fontSize: "14px",
                color: "#94a3b8",
              }}
            >
              Resend in{" "}
              <strong style={{ color: "#059669" }}>{resendTimer}s</strong>
            </p>
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            paddingTop: "24px",
          }}
        >
          {/* Tips */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#0f172a",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              💡 Tips
            </h3>
            <ul
              style={{
                fontSize: "13px",
                color: "#64748b",
                margin: 0,
                paddingLeft: "20px",
                lineHeight: "1.6",
              }}
            >
              <li>Check your spam/junk folder</li>
              <li>Make sure you entered the correct email</li>
              <li>OTP is valid for 10 minutes</li>
            </ul>
          </div>

          {/* Back to Login */}
          <button
            onClick={() => window.history.back()}
            style={{
              width: "100%",
              background: "white",
              color: "#64748b",
              border: "2px solid #e2e8f0",
              padding: "12px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#cbd5e1";
              e.target.style.background = "#f8fafc";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.background = "white";
            }}
          >
            ← Back to Registration
          </button>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
