import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, 
  AlertCircle, 
  Zap, 
  DollarSign, 
  Clock, 
  MapPin, 
  Users, 
  Wifi, 
  CheckCircle2,
  X,
  Upload,
  Camera
} from 'lucide-react';

function ComplaintForm() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [requestId, setRequestId] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

const CATEGORY_MAP = {
  charging: "CHARGING",
  payment: "PAYMENT",
  station: "STATION",
  host: "HOST_BEHAVIOR",
  delay: "OTHER",
  connectivity: "OTHER",
};

const PRIORITY_MAP = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
};






  const categories = [
    { 
      id: 'charging', 
      label: 'Charging Issue', 
      icon: Zap, 
      color: 'from-yellow-500 to-orange-500',
      description: 'Problems with charging process'
    },
    { 
      id: 'payment', 
      label: 'Payment Issue', 
      icon: DollarSign, 
      color: 'from-green-500 to-emerald-500',
      description: 'Billing or payment concerns'
    },
    { 
      id: 'station', 
      label: 'Station Problem', 
      icon: MapPin, 
      color: 'from-blue-500 to-cyan-500',
      description: 'Station location or availability'
    },
    { 
      id: 'host', 
      label: 'Host Behavior', 
      icon: Users, 
      color: 'from-purple-500 to-pink-500',
      description: 'Issues with station host'
    },
    { 
      id: 'delay', 
      label: 'Delay/Wait Time', 
      icon: Clock, 
      color: 'from-red-500 to-rose-500',
      description: 'Long waiting or delays'
    },
    { 
      id: 'connectivity', 
      label: 'App/Connectivity', 
      icon: Wifi, 
      color: 'from-indigo-500 to-blue-500',
      description: 'Technical or app issues'
    },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
      toast.error('Maximum 3 images allowed');
      return;
    }
    setImages([...images, ...files.slice(0, 3 - images.length)]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("userToken");
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("category", CATEGORY_MAP[category]);
    formData.append("subject", subject.trim());
    formData.append("description", description.trim());
    formData.append("priority", PRIORITY_MAP[priority]);

    images.forEach((img) => formData.append("images", img));

    const response = await fetch(
      "http://localhost:5000/api/auth/complaint",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    console.log(response,"response");
    

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit complaint");
    }

    setSubmitted(true);
  } catch (err) {
    toast.error(err.message);
  } finally {
    setIsSubmitting(false);
  }
};


  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Complaint Submitted!
          </h2>
          <p className="text-slate-600 mb-2">
            Thank you for your feedback. We'll review your complaint and get back to you soon.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Ticket ID: <span className="font-mono font-semibold">#CPL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg"
          >
            Submit Another Complaint
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <style>{`
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

        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }

        .category-card {
          transition: all 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-4px);
        }

        .category-card.selected {
          box-shadow: 0 8px 24px rgba(5, 150, 105, 0.3);
          border: 2px solid #059669;
        }
      `}</style>

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : window.history.back()}
            className="flex items-center gap-2 mb-4 hover:bg-white/20 px-3 py-2 rounded-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-2xl font-bold mb-2">Submit a Complaint</h1>
          <p className="text-emerald-100">We're here to help resolve your concerns</p>
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`h-2 rounded-full flex-1 transition-all ${
                  s <= step ? 'bg-white' : 'bg-white/30'
                }`} />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm mt-2 text-emerald-100">
            <span className={step >= 1 ? 'text-white font-semibold' : ''}>Category</span>
            <span className={step >= 2 ? 'text-white font-semibold' : ''}>Details</span>
            <span className={step >= 3 ? 'text-white font-semibold' : ''}>Review</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6 pb-24">
        {/* Step 1: Select Category */}
        {step === 1 && (
          <div className="animate-slide-up">
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">What's the issue about?</h2>
              <p className="text-slate-600 text-sm mb-6">Select the category that best describes your complaint</p>
              
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`category-card cursor-pointer bg-white border-2 rounded-xl p-4 ${
                      category === cat.id ? 'selected' : 'border-slate-200'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center mb-3`}>
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{cat.label}</h3>
                    <p className="text-xs text-slate-500">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => category && setStep(2)}
              disabled={!category}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Enter Details */}
        {step === 2 && (
          <div className="animate-slide-up space-y-4">
            {/* Request ID (Optional) */}
            {/* <div className="bg-white rounded-2xl p-6 shadow-lg">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Request ID (Optional)
              </label>
              <input
                type="text"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                placeholder="e.g., #REQ123456"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all"
              />
              <p className="text-xs text-slate-500 mt-2">If related to a specific charging request</p>
            </div> */}

            {/* Subject */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of the issue"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide detailed information about your complaint..."
                rows="6"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-all resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">{description.length}/500 characters</p>
            </div>

            {/* Priority */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Priority Level
              </label>
              <div className="flex gap-3">
                {['low', 'medium', 'high'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      priority === p
                        ? p === 'low' 
                          ? 'bg-blue-500 text-white' 
                          : p === 'medium' 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-red-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Attach Images (Optional)
              </label>
              <p className="text-xs text-slate-500 mb-3">Upload up to 3 images to help us understand the issue</p>
              
              {images.length < 3 && (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:border-emerald-500 transition-all">
                  <Camera className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-sm text-slate-600 font-medium">Click to upload</span>
                  <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Upload ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!subject || !description}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="animate-slide-up space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Review Your Complaint</h2>
              
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-4">
                  <p className="text-sm text-slate-500 mb-1">Category</p>
                  <p className="font-semibold text-slate-900">
                    {categories.find(c => c.id === category)?.label}
                  </p>
                </div>

                {requestId && (
                  <div className="border-b border-slate-200 pb-4">
                    <p className="text-sm text-slate-500 mb-1">Request ID</p>
                    <p className="font-semibold text-slate-900">{requestId}</p>
                  </div>
                )}

                <div className="border-b border-slate-200 pb-4">
                  <p className="text-sm text-slate-500 mb-1">Subject</p>
                  <p className="font-semibold text-slate-900">{subject}</p>
                </div>

                <div className="border-b border-slate-200 pb-4">
                  <p className="text-sm text-slate-500 mb-1">Description</p>
                  <p className="text-slate-900">{description}</p>
                </div>

                <div className="border-b border-slate-200 pb-4">
                  <p className="text-sm text-slate-500 mb-1">Priority</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    priority === 'low' ? 'bg-blue-100 text-blue-700' :
                    priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </span>
                </div>

                {images.length > 0 && (
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Attachments ({images.length})</p>
                    <div className="grid grid-cols-3 gap-2">
                      {images.map((img, idx) => (
                        <img
                          key={idx}
                          src={URL.createObjectURL(img)}
                          alt={`Attachment ${idx + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-xl font-semibold hover:bg-slate-200 transition-all"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Complaint'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintForm;