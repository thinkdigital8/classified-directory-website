import Link from "next/link";
import { Business } from "@/lib/businesses";

const CATEGORY_GRADIENTS: Record<string, string> = {
  "Home Services": "from-orange-400 to-amber-500",
  "Food & Dining": "from-green-400 to-emerald-500",
  "Technology": "from-violet-400 to-purple-500",
  "Healthcare": "from-rose-400 to-pink-500",
  "Health & Fitness": "from-cyan-400 to-blue-500",
  "Pet Services": "from-yellow-400 to-orange-400",
  "Hotels & Travel": "from-sky-400 to-blue-600",
  "Education": "from-indigo-400 to-indigo-600",
  "Automotive": "from-slate-500 to-gray-700",
  "Shopping & Retail": "from-pink-400 to-rose-500",
  "Entertainment": "from-red-400 to-orange-500",
};

const CATEGORY_ICONS: Record<string, string> = {
  "Home Services": "🔧",
  "Food & Dining": "🍽️",
  "Technology": "💻",
  "Healthcare": "🏥",
  "Health & Fitness": "💪",
  "Pet Services": "🐾",
  "Hotels & Travel": "🏨",
  "Education": "🎓",
  "Automotive": "🚗",
  "Shopping & Retail": "🛍️",
  "Entertainment": "🎵",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs font-bold text-gray-700 ml-1">{rating}</span>
    </div>
  );
}

export default function BusinessCard({ business }: { business: Business }) {
  const gradient = CATEGORY_GRADIENTS[business.category] || "from-blue-400 to-blue-600";
  const icon = CATEGORY_ICONS[business.category] || "🏢";

  return (
    <Link
      href={`/business/${business.slug}`}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 block group overflow-hidden"
    >
      {/* Colored Header */}
      <div className={`bg-gradient-to-r ${gradient} px-5 pt-5 pb-8 relative`}>
        <div className="flex items-start justify-between">
          <span className="text-4xl">{icon}</span>
          <div className="flex gap-1.5">
            {business.featured && (
              <span className="text-xs bg-yellow-300 text-yellow-900 font-bold px-2 py-0.5 rounded-full">
                ⭐ Featured
              </span>
            )}
            {business.verified && (
              <span className="text-xs bg-white/30 text-white font-medium px-2 py-0.5 rounded-full">
                ✓ Verified
              </span>
            )}
          </div>
        </div>
        {/* Category label */}
        <p className="text-white/80 text-xs font-medium mt-2">{business.category}</p>
      </div>

      {/* Content (overlapping the header) */}
      <div className="-mt-4 mx-4 bg-white rounded-xl shadow-md p-4 mb-4">
        <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors mb-2">
          {business.name}
        </h3>

        <StarRating rating={business.rating} />
        <p className="text-xs text-gray-400 mt-0.5">({business.reviewCount} reviews)</p>

        <p className="text-gray-500 text-xs mt-3 line-clamp-2 leading-relaxed">
          {business.description}
        </p>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-base">📞</span>
            <span className="font-medium">{business.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-base">📍</span>
            <span>{business.city}, {business.state}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={`mx-4 mb-4 bg-gradient-to-r ${gradient} text-white text-sm font-semibold py-2.5 rounded-xl text-center group-hover:opacity-90 transition-opacity`}>
        View Full Details →
      </div>
    </Link>
  );
}
