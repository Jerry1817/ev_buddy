import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MapPicker from "../components/MapPicker";
import toast from "react-hot-toast";
import { 
  Zap, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Building2, 
  PlugZap, 
  DollarSign,
  FileText,
  ArrowLeft,
  CheckCircle
} from "lucide-react";

function HostRegister() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if user is already logged in
  const existingToken = localStorage.getItem("token");
  const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = !!existingToken && !!existingUser?.name;
  
  // If already logged in, start at step 2 (Station Details), otherwise step 1
  const [step, setStep] = useState(isLoggedIn ? 2 : 1);

  const [formData, setFormData] = useState({
    // Owner Details (only needed if not logged in)
    name: existingUser?.name || "",
    email: existingUser?.email || "",
    phone: existingUser?.phone || "",
    password: "",
    // Station Details
    stationName: "",
    totalChargers: "",
    power: "",
    rate: "",
    address: "",
    connectorType: "Type 2",
    description: "",
  });

  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });

  const connectorTypes = [
    { value: "Type 1", label: "Type 1 (J1772)" },
    { value: "Type 2", label: "Type 2 (Mennekes)" },
    { value: "CCS1", label: "CCS1 (Combo 1)" },
    { value: "CCS2", label: "CCS2 (Combo 2)" },
    { value: "CHAdeMO", label: "CHAdeMO" },
    { value: "Tesla", label: "Tesla Supercharger" },
    { value: "GB/T", label: "GB/T (China)" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location.lat || !location.lng) {
      toast.error("Please pick station location 📍");
      return;
    }

    setIsSubmitting(true);
    let token = localStorage.getItem("token");

    try {
      // If already logged in as driver, use existing token
      if (!token) {
        // Step 1: Try Register Host
        try {
          await axios.post("http://localhost:5000/api/auth/register", {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            roles: "HOST",
          });

          // If registration success → login
          const loginRes = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
              email: formData.email,
              password: formData.password,
            }
          );
          token = loginRes.data.token;
        } catch (error) {
          // If user already exists → login directly
          if (error.response?.data?.message?.includes("already exists")) {
            const loginRes = await axios.post(
              "http://localhost:5000/api/auth/login",
              {
                email: formData.email,
                password: formData.password,
              }
            );
            token = loginRes.data.token;
          } else {
            throw error;
          }
        }
      }

      // Step 2: Register Station (become host)
      await axios.post(
        "http://localhost:5000/api/auth/becomehost",
        {
          stationName: formData.stationName,
          availableChargers: formData.totalChargers,
          power: formData.power,
          chargingPricePerUnit: formData.rate,
          address: formData.address,
          connectorType: formData.connectorType,
          description: formData.description,
          latitude: location.lat,
          longitude: location.lng,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("token", token);
      localStorage.setItem("role", "host");

      toast.success("🎉 Station registered successfully! Welcome to EV Buddy Host Network!");
      navigate("/hostrequests");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.password) {
        toast.error("Please fill all owner details");
        return;
      }
    } else if (step === 2) {
      if (!formData.stationName || !formData.totalChargers || !formData.power || !formData.rate || !formData.address) {
        toast.error("Please fill all station details");
        return;
      }
    }
    setStep(step + 1);
  };

  // Don't allow going back to step 1 if already logged in
  const prevStep = () => {
    if (isLoggedIn && step === 2) return; // Can't go back if logged in
    setStep(step - 1);
  };

  // Steps to show - if logged in, only show steps 2 and 3 (renumbered as 1 and 2)
  const stepsToShow = isLoggedIn ? [2, 3] : [1, 2, 3];
  const getDisplayStepNumber = (s) => isLoggedIn ? s - 1 : s;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Become a Host
          </h1>
          <p className="text-slate-600 mt-2">
            {isLoggedIn 
              ? `Welcome ${existingUser?.name}! Register your charging station` 
              : "Register your charging station and start earning"
            }
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {stepsToShow.map((s, index) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s 
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg" 
                  : "bg-slate-200 text-slate-500"
              }`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : getDisplayStepNumber(s)}
              </div>
              {index < stepsToShow.length - 1 && (
                <div className={`w-16 h-1 mx-2 rounded-full ${step > s ? "bg-emerald-500" : "bg-slate-200"}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Owner Details */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-emerald-600" />
                  Owner Details
                </h2>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={handleChange} 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required 
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={handleChange} 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required 
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={handleChange} 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required 
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleChange} 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required 
                  />
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.01] transition-all"
                >
                  Continue to Station Details →
                </button>
              </div>
            )}

            {/* Step 2: Station Details */}
            {step === 2 && (
              <div className="space-y-5">
                {/* Only show back button if not logged in */}
                {!isLoggedIn && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}

                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  Station Details
                </h2>

                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    name="stationName" 
                    placeholder="Station Name" 
                    value={formData.stationName}
                    onChange={handleChange} 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required 
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    name="address" 
                    placeholder="Station Address" 
                    value={formData.address}
                    onChange={handleChange} 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <PlugZap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="number" 
                      name="totalChargers" 
                      placeholder="Total Chargers" 
                      value={formData.totalChargers}
                      onChange={handleChange} 
                      min="1"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required 
                    />
                  </div>

                  <div className="relative">
                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="number" 
                      name="power" 
                      placeholder="Power (kW)" 
                      value={formData.power}
                      onChange={handleChange} 
                      min="1"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="number" 
                      name="rate" 
                      placeholder="₹ Rate per kWh" 
                      value={formData.rate}
                      onChange={handleChange} 
                      min="0"
                      step="0.01"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required 
                    />
                  </div>

                  <div className="relative">
                    <PlugZap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <select 
                      name="connectorType" 
                      value={formData.connectorType}
                      onChange={handleChange} 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      {connectorTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <textarea 
                    name="description" 
                    placeholder="Station Description (optional) - e.g., Parking available, 24/7 access, etc." 
                    value={formData.description}
                    onChange={handleChange} 
                    rows="3"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.01] transition-all"
                >
                  Continue to Location →
                </button>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="space-y-5">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  Station Location
                </h2>

                <p className="text-slate-600 text-sm mb-4">
                  📍 Click on the map to set your station's exact location
                </p>

                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg">
                  <MapPicker setLocation={(loc) => setLocation(loc)} />
                </div>

                {location.lat && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-emerald-800 font-semibold">Location Selected</p>
                      <p className="text-emerald-600 text-sm">
                        Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !location.lat}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Register My Station
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Already a host?{" "}
          <button 
            onClick={() => navigate("/host/login")} 
            className="text-emerald-600 font-semibold hover:underline"
          >
            Login to Dashboard
          </button>
        </p>
      </div>
    </div>
  );
}

export default HostRegister;

