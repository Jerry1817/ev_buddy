import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

function Charging() {
  const {state}=useLocation()
  const [seconds, setSeconds] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [sessionId, setSessionId] = useState(null);
 
  

  const navigate = useNavigate();

  // Start charging API
  const startCharging = async () => {
    try {
      const res = await api.post(
        "http://localhost:5000/api/auth/chargingstart",
        {
          requestId:state
          
         
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      setSessionId(res.data.data._id);
      setIsCharging(true);
    } catch (err) {
      toast.error("Failed to start charging");
      console.error(err);
    }
  };

  // Stop charging
const stopCharging = async () => {
  try {
    const res = await api.post(
      "http://localhost:5000/api/auth/chargingend",
      {
        sessionId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    if(res.data.success){
      navigate("/payment", {
        state: {
          session: res.data.data.sessionId,
          duration: res.data.data.durationInMinutes,
          totalCost: res.data.data.totalCost,
          energyConsumed: res.data.data.energyConsumed,
          pricePerUnit: res.data.data.pricePerUnit,
        },
      });

    }

  } catch (err) {
    console.error(err);
    toast.error("Failed to stop charging");
  }
};


  // Timer runs ONLY when charging started
  useEffect(() => {
    if (!isCharging) return;

    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isCharging]);

  const format = (s) =>
    `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(
      Math.floor((s % 3600) / 60)
    ).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-white p-6 pb-24 flex flex-col items-center font-sans">
      <h2 className="text-[20px] font-extrabold mt-4">
        Charging Active
      </h2>

      <div className="font-mono text-5xl font-black my-7">
        {format(seconds)}
      </div>

      {!isCharging ? (
        <button
          onClick={startCharging}
          className="py-3 px-6 bg-green-600 text-white rounded-xl font-bold"
        >
          Start Charging
        </button>
      ) : (
        <button
          onClick={stopCharging}
          className="py-3 px-6 bg-white border border-red-300 text-red-500 rounded-xl font-bold"
        >
          Stop Charging
        </button>
      )}
    </div>
  );
}

export default Charging;
