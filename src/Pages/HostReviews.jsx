import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { 
  Star, 
  ArrowLeft, 
  User, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  Award,
  ThumbsUp
} from "lucide-react";

export default function HostReviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("hosttoken");
      if (!token) {
        navigate("/host/login");
        return;
      }

      const res = await api.get("http://localhost:5000/api/host/reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setReviews(res.data.data.reviews);
        setStats(res.data.data.stats);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const getMaxRatingCount = () => {
    return Math.max(...Object.values(stats.ratingDistribution), 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            My Reviews & Ratings
          </h1>
          <p className="text-emerald-100">
            See what drivers are saying about your charging station
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Average Rating */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                <Star className="w-7 h-7 text-white fill-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.averageRating || "N/A"}
                </p>
                <p className="text-sm text-slate-500">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Total Reviews */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.totalReviews}
                </p>
                <p className="text-sm text-slate-500">Total Reviews</p>
              </div>
            </div>
          </div>

          {/* Top Rated */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.ratingDistribution[5]}
                </p>
                <p className="text-sm text-slate-500">5-Star Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Rating Distribution
          </h2>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium text-slate-700">{rating}</span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (stats.ratingDistribution[rating] / getMaxRatingCount()) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-slate-600 w-8 text-right">
                  {stats.ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-emerald-600" />
            All Reviews ({stats.totalReviews})
          </h2>

          {reviews.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-100 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-slate-500">
                Reviews from drivers will appear here after they complete charging sessions.
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {review.driver?.name || "Anonymous"}
                      </p>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    {formatDate(review.createdAt)}
                  </div>
                </div>

                {/* Review Text */}
                {review.review && (
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    "{review.review}"
                  </p>
                )}

                {/* Tags */}
                {review.tags && review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Session Info */}
                {review.session && (
                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-slate-500">Cost</p>
                      <p className="font-semibold text-emerald-600">
                        ₹{(review.session.totalCost || 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-500">Energy</p>
                      <p className="font-semibold text-blue-600">
                        {(review.session.energyConsumed || 0).toFixed(2)} kWh
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-500">Duration</p>
                      <p className="font-semibold text-purple-600">
                        {review.session.durationInMinutes || 0} min
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
