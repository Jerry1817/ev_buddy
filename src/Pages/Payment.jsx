import { useState } from "react";
import api from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Clock, Battery, CreditCard, CheckCircle } from "lucide-react";

function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">No payment data available</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-emerald-600 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Extract payment data from state
  const { 
    session, 
    duration = 0, 
    totalCost = 0, 
    requestId,
    energyConsumed = 0,
    pricePerUnit = 0,
    stationData = {}
  } = state;

  console.log("Payment State:", state);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const res = await api.post(
        "http://localhost:5000/api/auth/payment/createorder",
        { requestId: requestId || state.requestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (res.data.success) {
        openRazorpay(res.data.order, res.data);
      }
    } catch (err) {
      alert("Payment failed. Please try again.");
      console.error(err);
      setIsProcessing(false);
    }
  };

  const openRazorpay = (order, fullResponse) => {
    const options = {
      key: "rzp_test_Rc23zKSi6P5WfQ",
      amount: order.amount,
      currency: order.currency,
      name: "EV Buddy",
      description: "EV Charging Payment",
      order_id: order.id,
      handler: async function (response) {
        try {
          setIsProcessing(true);
          // Verify payment with backend
          const verifyRes = await api.post("http://localhost:5000/api/auth/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            requestId: requestId || state.requestId
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          });

          if (verifyRes.data.success) {
            // Add verification details to state
            const successState = {
              ...fullResponse,
              order: {
                ...fullResponse.order,
                status: 'paid', // Update status for display
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
              }
            };
            navigate('/paymentsuccess', { state: successState });
          } else {
             alert("Payment verification failed! Please contact support.");
          }
        } catch (error) {
          console.error("Verification Error:", error);
          alert("Payment verification failed! Please contact support.");
        } finally {
           setIsProcessing(false);
        }
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        }
      },
      theme: { color: "#10b981" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Format duration display
  const formatDuration = (mins) => {
    if (!mins || mins === 0) return "0 min";
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-2xl font-bold text-white">Payment</h1>
        <p className="text-emerald-100">Complete your charging session payment</p>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Station Info */}
        {stationData?.name && (
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{stationData.name}</p>
                <p className="text-sm text-slate-500">{stationData.address || "EV Charging Station"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Charging Summary Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 mb-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Charging Summary
          </h2>

          <div className="space-y-4">
            {/* Duration */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-slate-600">Charging Duration</span>
              </div>
              <span className="font-semibold text-slate-900">{formatDuration(duration)}</span>
            </div>

            {/* Energy Consumed */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Battery className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-slate-600">Energy Consumed</span>
              </div>
              <span className="font-semibold text-slate-900">{energyConsumed.toFixed(2)} kWh</span>
            </div>

            {/* Price per Unit */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-slate-600">Price per kWh</span>
              </div>
              <span className="font-semibold text-slate-900">₹{pricePerUnit}</span>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 pt-4 border-t-2 border-emerald-100">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-slate-900">Total Amount</span>
              <span className="text-2xl font-bold text-emerald-600">₹{totalCost.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Pay ₹{totalCost.toFixed(2)}
            </>
          )}
        </button>

        {/* Secure Payment Note */}
        <p className="text-center text-sm text-slate-500 mt-4">
          🔒 Secured by Razorpay
        </p>
      </div>
    </div>
  );
}

export default Payment;

