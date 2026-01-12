import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate=useNavigate()
  const { state } = useLocation();

  if (!state) return <p>No payment data</p>;

  const { session, duration, totalCost } = state;
  console.log(state,"state");
  
  console.log(state.session,"sessionId");

  const handlePayment = async () => {
    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/payment/createorder",
        {sessionId:state.session },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      openRazorpay(res.data.order);
      if(res.data.success){
        navigate('/paymentsuccess',{state:res.data})
      }
    } catch (err) {
      alert("Payment failed");
      console.error(err);
    }
  };

  const openRazorpay = (order) => {
    const options = {
      key: "rzp_test_Rc23zKSi6P5WfQ",
      amount: order.amount,
      currency: order.currency,
      name: "EV Buddy",
      description: "EV Charging Payment",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful");
        console.log(response);
      },
      theme: { color: "#10b981" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] px-6 pt-5 pb-24 flex flex-col items-center">
      
      <h2 className="text-[20px] font-extrabold my-3">
        Charging Summary
      </h2>

      <div className="w-full max-w-[420px] bg-white rounded-xl p-4 shadow-md">

        <div className="flex justify-between py-2 border-b">
          <span>Charging Duration</span>
          <strong>{duration} minutes</strong>
        </div>

        <div className="flex justify-between py-2 border-b">
          <span>Price per minute</span>
          <span>₹ {(totalCost / duration).toFixed(2)}</span>
        </div>

        <div className="flex justify-between pt-3 font-extrabold text-lg">
          <span>Total Payable</span>
          <strong>₹ {totalCost}</strong>
        </div>
      </div>

      <button
        onClick={()=>handlePayment()}
        className="w-full max-w-[420px] mt-4 py-3 bg-emerald-500 text-white rounded-2xl font-bold"
      >
        Proceed to Pay
      </button>
    </div>
  );
}

export default Payment;
