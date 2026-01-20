import { useState } from "react";
import { Mail, Lock, Phone, Eye, EyeOff, Zap, ArrowRight } from "lucide-react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


function Login() {
  const navigate =useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  

  const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    // Make the API call with await
    const res = await axios.post("http://localhost:5000/api/auth/login", { 
      email, 
      password ,
      phone
    });
    
    console.log(res, 'res');
    
    if (res.data.success) {

      // Set user token and role
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("role", "DRIVER");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      toast.success('Login successful! Welcome back.', {
          duration: 5000,
          position: 'top-right',
        });
        setTimeout(()=>{
          navigate("/",{state:{name:res.data.user.name}}); 
        },1000)
    }
  } catch (err) {
    console.error(err);
    const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
    setError(errorMessage);
    toast.error(errorMessage, {
      duration: 5000,
      icon: err.response?.data?.blocked ? '🚫' : '❌',
    });
  } finally {
    setIsLoading(false);
  }
};

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
            Welcome Back
          </h1>
          <p className="text-slate-600">
            Your next charge is just a click away ⚡
          </p>
        </div>

        {/* Login Card */}
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

          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="input-focus relative flex items-center border-2 border-slate-200 rounded-xl px-4 py-3 bg-white transition-all duration-200">
                <Mail className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
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

            {/* Phone Input (Optional) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mobile Number <span className="text-slate-400 text-xs">(Optional)</span>
              </label>
              <div className="input-focus relative flex items-center border-2 border-slate-200 rounded-xl px-4 py-3 bg-white transition-all duration-200">
                <Phone className="w-5 h-5 text-slate-400 mr-3" />
                <input
                  type="tel"
                  placeholder="+91 555 0000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                  className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl py-4 px-6 flex items-center justify-center gap-2 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg shadow-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login to EV Buddy</span>
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

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <a
                href="/UserRegister"
                className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">
          By continuing, you agree to our{" "}
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

export default Login;