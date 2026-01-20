import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


function AddReview() {
  const { requestId } = useParams();
  console.log(requestId, "oii");
  const { state } = useLocation();
  console.log(state, "state");
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const stationData = state?.stationData;

  useEffect(() => {
    if (!stationData) {
      alert("No station data found. Redirecting back...");
      navigate(-1);
    }
  }, [stationData, navigate]);

  if (!stationData) {
    return null;
  }

  const station = {
    name: stationData.name,
    address: stationData.address,
    power: stationData.power || "N/A", // Use actual power if available
    availableChargers: stationData.availableChargers,
    pricePerUnit: stationData.chargingPricePerUnit,
    // You might want to get these from the request data if available
    chargedAmount: state.chargedAmount || "N/A",
    totalCost: state.totalCost || "N/A",
  };

  const reviewTags = [
    { id: 1, label: "Fast Charging", emoji: "⚡" },
    { id: 2, label: "Easy to Find", emoji: "📍" },
    { id: 3, label: "Clean Location", emoji: "✨" },
    { id: 4, label: "Good Parking", emoji: "🅿️" },
    { id: 5, label: "Helpful Staff", emoji: "👥" },
    { id: 6, label: "Great Value", emoji: "💰" },
    { id: 7, label: "Well Maintained", emoji: "🔧" },
    { id: 8, label: "Safe Area", emoji: "🛡️" },
  ];

  const handleTagToggle = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating before submitting", {
        duration: 3000,
        icon: "⭐",
      });
      return;
    }

    if (review.length > 500) {
       toast.error("Review must be 500 characters or less", {
        duration: 3000,
      });
      return;
    }
    setIsSubmitting(true);

        const loadingToast = toast.loading("Submitting your review...");


    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
       toast.error("Please login to submit a review", {
          duration: 4000,
        });
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/addreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requestId,
          station,
          rating,
          review,
          tags: selectedTags,
        }),
      });

      // if (!response.ok) {
      //   throw new Error("Failed to submit review");
      // }
      const data = await response.json();

      toast.dismiss(loadingToast);

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      toast.success("Review submitted successfully! 🎉", {
        duration: 4000,
        icon: "✅",
      });


      setTimeout(() => {
        setSubmitted(true);
      }, 1000);

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.dismiss(loadingToast);
      toast.error(err.message || "Failed to submit review. Please try again.", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            padding: "48px",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "40px",
            }}
          >
            ✓
          </div>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#0f172a",
              marginBottom: "12px",
            }}
          >
            Thank You!
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#64748b",
              marginBottom: "32px",
            }}
          >
            Your review has been submitted successfully. It helps others find
            the best charging stations!
          </p>
          <button
            onClick={() => window.history.back()}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
              color: "white",
              border: "none",
              padding: "16px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(5,150,105,0.3)",
              transition: "all 0.2s",
            }}
          >
            Back to My Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .star {
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .star:hover {
          transform: scale(1.2);
        }

        .tag-button {
          transition: all 0.2s ease;
        }

        .tag-button:hover {
          transform: translateY(-2px);
        }

        textarea {
          font-family: system-ui, -apple-system, sans-serif;
        }

        button:active {
          transform: scale(0.98);
        }
      `}</style>

      {/* Header */}
      <Toaster /> 
      <div
        style={{
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          padding: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => window.history.back()}
              style={{
                width: "40px",
                height: "40px",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
                transition: "all 0.2s",
              }}
            >
              ←
            </button>
            <div>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "white",
                  margin: 0,
                }}
              >
                Rate Your Experience
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "#d1fae5",
                  margin: "4px 0 0 0",
                }}
              >
                Help others by sharing your feedback
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "24px" }}>
        {/* Station Info Card */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
            animation: "slide-up 0.4s ease-out",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              ⚡
            </div>
            <div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {station.name}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  margin: "4px 0 0 0",
                }}
              >
                📍 {station.address}
              </p>
            </div>
          </div>

          <div
            style={{
              background: "#f8fafc",
              borderRadius: "12px",
              padding: "16px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  margin: "0 0 4px 0",
                }}
              >
                Power
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {station.power} kW
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  margin: "0 0 4px 0",
                }}
              >
                Chargers
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {station.availableChargers}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  margin: "0 0 4px 0",
                }}
              >
                Charging price per unit
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {station.pricePerUnit}
              </p>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
            animation: "slide-up 0.5s ease-out",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#0f172a",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            How was your experience?
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#64748b",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Tap to rate the charging station
          </p>

          {/* Star Rating */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="star"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  fontSize: "48px",
                  color:
                    star <= (hoverRating || rating) ? "#fbbf24" : "#e2e8f0",
                  filter:
                    star <= (hoverRating || rating)
                      ? "drop-shadow(0 2px 4px rgba(251,191,36,0.5))"
                      : "none",
                }}
              >
                ★
              </span>
            ))}
          </div>

          {/* Rating Text */}
          {rating > 0 && (
            <p
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "600",
                color:
                  rating >= 4 ? "#059669" : rating >= 3 ? "#f59e0b" : "#ef4444",
                animation: "pulse 0.5s ease-out",
              }}
            >
              {rating === 5 && "⭐ Excellent!"}
              {rating === 4 && "😊 Great!"}
              {rating === 3 && "👍 Good"}
              {rating === 2 && "😐 Fair"}
              {rating === 1 && "😞 Poor"}
            </p>
          )}
        </div>

        {/* Quick Tags */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
            animation: "slide-up 0.6s ease-out",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#0f172a",
              marginBottom: "16px",
            }}
          >
            What did you like? (Optional)
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            {reviewTags.map((tag) => (
              <button
                key={tag.id}
                className="tag-button"
                onClick={() => handleTagToggle(tag.id)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "2px solid",
                  borderColor: selectedTags.includes(tag.id)
                    ? "#059669"
                    : "#e2e8f0",
                  background: selectedTags.includes(tag.id)
                    ? "#d1fae5"
                    : "white",
                  color: selectedTags.includes(tag.id) ? "#065f46" : "#64748b",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: "18px" }}>{tag.emoji}</span>
                <span>{tag.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid #e2e8f0",
            animation: "slide-up 0.7s ease-out",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#0f172a",
              marginBottom: "8px",
            }}
          >
            Share your detailed experience (Optional)
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#64748b",
              marginBottom: "16px",
            }}
          >
            Help others know what to expect
          </p>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell us about your charging experience... Was it easy to find? How was the location? Any suggestions?"
            style={{
              width: "100%",
              minHeight: "120px",
              padding: "16px",
              borderRadius: "12px",
              border: "2px solid #e2e8f0",
              fontSize: "15px",
              color: "#0f172a",
              resize: "vertical",
              outline: "none",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#059669")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />

          <p
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              marginTop: "8px",
              textAlign: "right",
            }}
          >
            {review.length} / 500 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
          style={{
            width: "100%",
            background:
              rating === 0 || isSubmitting
                ? "#cbd5e1"
                : "linear-gradient(135deg, #059669 0%, #047857 100%)",
            color: "white",
            border: "none",
            padding: "18px",
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: "700",
            cursor: rating === 0 || isSubmitting ? "not-allowed" : "pointer",
            boxShadow:
              rating === 0 || isSubmitting
                ? "none"
                : "0 4px 16px rgba(5,150,105,0.4)",
            transition: "all 0.3s",
            animation: "slide-up 0.8s ease-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {isSubmitting ? (
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
              Submitting...
            </>
          ) : (
            <>
              <span>✓</span>
              Submit Review
            </>
          )}
        </button>

        <p
          style={{
            fontSize: "13px",
            color: "#94a3b8",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          Your review will be public and help other EV drivers
        </p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AddReview;
