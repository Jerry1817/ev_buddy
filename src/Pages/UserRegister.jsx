import { useState } from "react";
import {
  Mail,
  Lock,
  Phone,
  User,
  Car,
  Eye,
  EyeOff,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function UserRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    evModel: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.password
      ) {
        toast.error("Please fill all required fields");
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        setLoading(false);
        return;
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        toast.error("Please enter a valid 10-digit phone number");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log(res, "rresss");
      
      if (res.data.success) {
        toast.success(
          "User registered successfully. Please check your email for OTP verification.",
          {
            duration: 4000,
            position: "top-right",
          }
        );
        navigate("/otpverification",{state:{email:formData.email}});
    }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const evModels = [
    "Tesla Model 3",
    "Tesla Model Y",
    "Nissan Leaf",
    "Hyundai Kona Electric",
    "MG ZS EV",
    "Tata Nexon EV",
    "Mahindra e-Verito",
    "Other",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-8 relative overflow-hidden">
      <Toaster />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(5, 150, 105, 0.3); }
          50% { box-shadow: 0 0 30px rgba(5, 150, 105, 0.5); }
        }

        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }

        .input-focus:focus-within {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }
      `}</style>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-md animate-slide-in">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-4 animate-float animate-pulse-glow">
            <Zap className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Join EV Buddy
          </h1>
          <p className="text-slate-600">
            Create your account and start charging smarter ⚡
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <p className="text-red-700 text-sm flex-1">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <div className="input-focus relative flex items-center border-2 border-slate-200 rounded-xl px-4 py-3 bg-white transition-all duration-200">
                <User className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="input-focus relative flex items-center border-2 border-slate-200 rounded-xl px-4 py-3 bg-white transition-all duration-200">
                <Mail className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="input-focus relative flex items-center border-2 border-slate-200 rounded-xl px-4 py-3 bg-white transition-all duration-200">
                <Phone className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="input-focus relative flex items-center border-2 border-slate-200 rounded-xl px-4 py-3 bg-white transition-all duration-200">
                <Lock className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* EV Model Select */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                EV Model{" "}
                <span className="text-slate-400 text-xs">(Optional)</span>
              </label>
              <div className="input-focus relative flex items-center border-2 border-slate-200 rounded-xl px-4 py-3 bg-white transition-all duration-200">
                <Car className="w-5 h-5 text-slate-400 mr-3" />
                <select
                  name="evModel"
                  value={formData.evModel}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-slate-900 cursor-pointer"
                >
                  <option value="">Select your EV model</option>
                  {evModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl py-4 px-6 flex items-center justify-center gap-2 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed group mt-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">or</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-slate-600">
              Already have an account?{" "}
              <a
                href="/"
                className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">
          By creating an account, you agree to our{" "}
          <a href="/terms" className="text-emerald-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-emerald-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;
