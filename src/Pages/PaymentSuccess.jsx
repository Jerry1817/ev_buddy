import { useState, useEffect } from 'react';
import { CheckCircle2, Download, Home, Zap, User, MapPin, CreditCard, Calendar, Clock, FileText } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [paymentData, setPaymentData] = useState(null);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  useEffect(() => {
    if (!state) {
      // If no state data, redirect to home
      navigate('/');
      return;
    }

    const { user, host, session, order } = state;

    console.log(state,"state");
    
    // Structure the data for display
    const structuredData = {
      // Payment/Order Details
      paymentId: order.id,
      orderId: order.receipt,
      razorpayPaymentId: order.razorpayPaymentId || 'N/A',
      razorpayOrderId: order.razorpayOrderId || 'N/A',
      amount: session.totalCost || 0,
      currency: "INR",
      status: order.status || "success",
      method: order.paymentMethod || "Razorpay",
      timestamp: order.createdAt || new Date().toISOString(),
      
      // User Details
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone || 'N/A',
        evModel: user.evModel || 'N/A',
        roles :user.roles || 'N/A'
      },
      
      // Station Details (from host's evStation)
      station: {
        name: host.evStation?.name || 'N/A',
        address: host.evStation?.address || 'N/A',
        power: session?.chargerType || 'N/A',
        priceperunit:host.evStation?.chargingPricePerUnit || 'N/A',
        connectorType: session?.connectorType || 'Type 2',
        chargerNumber: session?.chargerNumber || 'N/A',
        availableChargers: host.evStation?.availableChargers || 0
      },
      
      // Host Details
      host: {
        name: host.name,
        email: host.email,
        phone: host.phone || 'N/A',
        gstNumber: host.gstNumber || 'N/A'
      },
      
      // Charging Session Details
      charging: {
        duration: calculateDuration(session.startTime, session.endTime),
        energyConsumed: `${session.energyConsumed || 0} kWh`,
        startTime: formatTime(session.startTime),
        endTime: formatTime(session.endTime),
        ratePerUnit: `₹${session.totalCost || 0}/perunit`,
        date: formatDate(session.startTime || new Date())
      }
    };

    setPaymentData(structuredData);
  }, [state, navigate]);

  // Helper function to calculate duration
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 'N/A';
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end - start;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} mins`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours}h ${mins}m`;
    }
  };

  // Helper function to format time
  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleDownloadInvoice = async () => {
    setIsGeneratingInvoice(true);
    
    try {
      const token = localStorage.getItem('token');
      
      // Call your backend API to generate invoice
      const res = await axios.get(
        `http://localhost:5000/api/payment/invoice/${paymentData.paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          responseType: 'blob'
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${paymentData.paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setIsGeneratingInvoice(false);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Using browser print instead...');
      window.print(); // Fallback to browser print
      setIsGeneratingInvoice(false);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Loading state
  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
      <style>{`
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .invoice-section, .invoice-section * {
            visibility: visible;
          }
          .invoice-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-6 shadow-2xl">
            <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Payment Successful! ⚡
          </h1>
          <p className="text-slate-600">
            Your charging session has been confirmed
          </p>
          <p className="text-sm text-emerald-600 font-semibold mt-2">
            Payment ID: {paymentData.paymentId}
          </p>
        </div>

        {/* Main Content Cards */}
        <div className="space-y-4 animate-slide-up invoice-section">
          
          {/* Payment Summary Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-emerald-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Payment Details</h2>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Total Amount Paid</span>
                <span className="text-3xl font-bold text-emerald-600">
                  ₹{paymentData.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Payment Method: {paymentData.method}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {paymentData.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-slate-500">Order ID</p>
                  <p className="font-semibold text-slate-900 text-xs break-all">{paymentData.orderId}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-slate-500">Razorpay ID</p>
                  <p className="font-semibold text-slate-900 text-xs break-all">{paymentData.razorpayPaymentId}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-slate-500">Date</p>
                  <p className="font-semibold text-slate-900">{paymentData.charging.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-slate-500">Time</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(paymentData.timestamp).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Details Card */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">User Details</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Name</p>
                <p className="font-semibold text-slate-900">{paymentData.user.name}</p>
              </div>
               <div>
                <p className="text-xs text-slate-500 mb-1">role</p>
                <p className="font-semibold text-slate-900">{paymentData.user.roles}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className="font-semibold text-slate-900">{paymentData.user.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Phone</p>
                <p className="font-semibold text-slate-900">{paymentData.user.phone}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">EV Model</p>
                <p className="font-semibold text-slate-900">{paymentData.user.evModel}</p>
              </div>
            </div>
          </div>

          {/* Station & Host Details */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Station Details */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Station Details</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Station Name</p>
                  <p className="font-semibold text-slate-900 text-sm">{paymentData.station.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Address</p>
                  <p className="font-semibold text-slate-900 text-sm">{paymentData.station.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Power</p>
                    <p className="font-semibold text-slate-900 text-sm">⚡ {paymentData.station.power}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Chargers</p>
                    <p className="font-semibold text-slate-900 text-sm">🔌 {paymentData.station.availableChargers}</p>
                  </div>
                    <div>
                    <p className="text-xs text-slate-500 mb-1">priceperunit</p>
                    <p className="font-semibold text-slate-900 text-sm">🔌 {paymentData.station.priceperunit}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Connector Type</p>
                  <p className="font-semibold text-slate-900 text-sm">{paymentData.station.connectorType}</p>
                </div>
              </div>
            </div>

            {/* Host Details */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Host Details</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Host Name</p>
                  <p className="font-semibold text-slate-900 text-sm">{paymentData.host.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Email</p>
                  <p className="font-semibold text-slate-900 text-sm">{paymentData.host.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Phone</p>
                  <p className="font-semibold text-slate-900 text-sm">{paymentData.host.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">GST Number</p>
                  <p className="font-semibold text-slate-900 text-sm">{paymentData.host.gstNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charging Session Details */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-teal-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Charging Session</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-teal-50 rounded-xl p-4">
                <p className="text-xs text-slate-600 mb-1">Duration</p>
                <p className="text-2xl font-bold text-teal-600">{paymentData.charging.duration}</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-4">
                <p className="text-xs text-slate-600 mb-1">Energy Consumed</p>
                <p className="text-2xl font-bold text-teal-600">{paymentData.charging.energyConsumed}</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-4">
                <p className="text-xs text-slate-600 mb-1">Rate</p>
                <p className="text-2xl font-bold text-teal-600">{paymentData.charging.ratePerUnit}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center bg-slate-50 rounded-xl p-4">
              <div>
                <p className="text-xs text-slate-500">Start Time</p>
                <p className="font-semibold text-slate-900">{paymentData.charging.startTime}</p>
              </div>
              <div className="text-slate-400">→</div>
              <div>
                <p className="text-xs text-slate-500">End Time</p>
                <p className="font-semibold text-slate-900">{paymentData.charging.endTime}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4 no-print">
            <button
              onClick={handleDownloadInvoice}
              disabled={isGeneratingInvoice}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg disabled:opacity-50"
            >
              {isGeneratingInvoice ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating Invoice...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Invoice
                </>
              )}
            </button>

            <button
              onClick={handleGoHome}
              className="bg-white border-2 border-slate-200 text-slate-700 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:border-emerald-500 hover:text-emerald-600 transition-all"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500 no-print">
          <p>Need help? Contact support at support@evbuddy.com</p>
          <p className="mt-2">Thank you for choosing EV Buddy! 🌱</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;