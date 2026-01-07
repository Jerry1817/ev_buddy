import { useEffect, useState } from 'react';
import { MapPin, AlertCircle, Zap, Battery, Clock, Navigation, ChevronRight, LogIn,LogOut } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from "react-router-dom";



function Home(){
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const token =localStorage.getItem('token')
        setIsLoggedIn(!!token)

    },[])

const handleLogout =()=>{
    localStorage.removeItem('token');
    setIsLoggedIn(false);
}


  const handleGetLocation = () => {
    navigate('/location')
  };

  const handleLogin = () => {
    navigate('/login')
  };

  const stats = [
    { icon: Battery, label: 'Available', value: '12', suffix: 'stations' },
    { icon: Zap, label: 'Fast Charge', value: '8', suffix: 'DC ports' },
    { icon: Clock, label: 'Avg Wait', value: '5', suffix: 'mins' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      <style>{`
        @keyframes charging-drop {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        @keyframes charging-bolt {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.1);
            filter: brightness(1.3);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .charging-drop {
          animation: charging-drop 2s ease-in-out infinite;
        }

        .charging-drop:nth-child(2) {
          animation-delay: 0.7s;
        }

        .charging-drop:nth-child(3) {
          animation-delay: 1.4s;
        }

        .charging-bolt {
          animation: charging-bolt 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .ev-glass {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .ev-icon-container {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        }

        .ev-stat-card {
          background: white;
          border-radius: 12px;
          padding: 16px 12px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          animation: slide-up 0.6s ease-out;
        }

        .ev-stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .charging-icon-container {
          position: relative;
          width: 80px;
          height: 120px;
          overflow: hidden;
        }

        .charging-icon-drop {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>

      {/* Login Button - Fixed top right */}
       <div className="fixed top-6 right-6 z-50 animate-slide-up">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="ev-glass px-6 py-3 rounded-xl font-semibold text-slate-900 hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="ev-glass px-6 py-3 rounded-xl font-semibold text-slate-900 hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>
        )}
      </div>

      {/* Map Layer */}
      {location && (
        <div className="absolute inset-0 z-0 animate-fade-in">
          <LocationMap latitude={location.latitude} longitude={location.longitude} />
        </div>
      )}

      {/* Background Pattern */}
      {!location && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
      )}

      {/* UI Overlay */}
      <div className={`relative z-10 flex flex-col min-h-screen transition-all duration-500 ${location ? 'justify-start' : 'justify-center'}`}>
        
        {/* Header - Only when map is showing */}
        {location && (
          <header className="p-4 animate-slide-up">
            <div className="ev-glass rounded-2xl p-4 max-w-md mx-auto flex items-center gap-3">
              <div className="ev-icon-container w-10 h-10 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white charging-bolt" />
              </div>
              <div className="flex-1">
                <h1 className="font-bold text-slate-900">EV Charge Finder</h1>
                <p className="text-xs text-slate-600 font-mono">
                  {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
                </p>
              </div>
              <button
                onClick={handleGetLocation}
                disabled={isLoading}
                className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Navigation className="w-4 h-4" />
                )}
              </button>
            </div>
          </header>
        )}

        {/* Main Content - Before Location */}
        {!location && (
          <div className="px-6 py-12 max-w-lg mx-auto w-full animate-slide-up">
            {/* Logo & Title */}
            <div className="text-center mb-10">
              {/* Animated Charging Icons Container */}
              <div className="charging-icon-container mx-auto mb-6">
                <div className="ev-icon-container w-20 h-20 rounded-2xl flex items-center justify-center mx-auto animate-float">
                  <Zap className="w-10 h-10 text-white charging-bolt" />
                </div>
                
                {/* Animated charging bolts moving from top to bottom */}
                <div className="charging-icon-drop charging-drop">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="charging-icon-drop charging-drop">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="charging-icon-drop charging-drop">
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mb-3">
                EV Charge Finder
              </h1>
              <p className="text-slate-600 text-lg">
                Find nearby charging stations in seconds
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="ev-stat-card text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-600">{stat.suffix}</div>
                </div>
              ))}
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Main CTA */}
            <button
              onClick={handleGetLocation}
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white rounded-xl py-4 px-6 font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-lg shadow-emerald-600/30"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Getting Location...
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5" />
                  Find Charging Stations
                </>
              )}
            </button>

            {/* Feature List */}
            <div className="mt-10 space-y-3">
              {[
                'Real-time availability updates',
                'Filter by connector type',
                'Navigate to station'
              ].map((feature) => (
                <div 
                  key={feature}
                  className="flex items-center gap-3 text-slate-600"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;