import { notFound } from "next/navigation";
import Link from "next/link";
import { businesses, getBusinessBySlug } from "@/lib/businesses";

export async function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xl font-bold text-gray-800 ml-1">{rating}</span>
    </div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  "Home Services": "from-orange-500 to-amber-500",
  "Food & Dining": "from-green-500 to-emerald-600",
  "Technology": "from-violet-500 to-purple-600",
  "Healthcare": "from-rose-500 to-pink-600",
  "Health & Fitness": "from-cyan-500 to-blue-500",
  "Pet Services": "from-yellow-500 to-orange-400",
  "Hotels & Travel": "from-sky-500 to-blue-700",
  "Education": "from-indigo-500 to-indigo-700",
  "Automotive": "from-slate-600 to-gray-800",
  "Shopping & Retail": "from-pink-500 to-rose-600",
  "Entertainment": "from-red-500 to-orange-500",
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

const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  if (!business) notFound();

  const gradient = CATEGORY_COLORS[business.category] || "from-blue-500 to-blue-700";
  const icon = CATEGORY_ICONS[business.category] || "🏢";

  const todayName = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <nav className="bg-white border-b px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 font-medium flex items-center gap-1">
            ← Home
          </Link>
          <span>/</span>
          <Link href={`/?category=${encodeURIComponent(business.category)}`} className="hover:text-blue-600">
            {business.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate">{business.name}</span>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className={`bg-gradient-to-br ${gradient} text-white py-12 px-4`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Left: Business Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-5xl">{icon}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{business.name}</h1>
                    {business.verified && (
                      <span className="flex items-center gap-1 bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                        ✓ Verified
                      </span>
                    )}
                    {business.featured && (
                      <span className="bg-yellow-300 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <p className="text-white/80 mt-1 text-sm">
                    {business.category}{business.subcategory ? ` · ${business.subcategory}` : ""}
                    {business.established ? ` · Est. ${business.established}` : ""}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <StarRating rating={business.rating} />
                <span className="text-white/70 text-sm">({business.reviewCount} reviews)</span>
              </div>

              <p className="mt-4 text-white/90 text-sm leading-relaxed max-w-xl">
                {business.description.slice(0, 160)}…
              </p>
            </div>

            {/* Right: CTA Buttons */}
            <div className="flex flex-col gap-3 min-w-[180px]">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center justify-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-lg text-sm"
              >
                📞 Call Now
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-white/30 text-sm"
              >
                ✉️ Send Email
              </a>
              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-white/30 text-sm"
                >
                  🌐 Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">📍</span>
            <span>{business.address}, {business.city}, {business.state} {business.zipCode}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">📞</span>
            <a href={`tel:${business.phone}`} className="hover:text-blue-600 font-medium">{business.phone}</a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">✉️</span>
            <a href={`mailto:${business.email}`} className="hover:text-blue-600 font-medium">{business.email}</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full inline-block" />
              About {business.name}
            </h2>
            <p className="text-gray-600 leading-relaxed">{business.description}</p>
          </section>

          {/* Services */}
          <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full inline-block" />
              Services Offered
            </h2>
            <div className="flex flex-wrap gap-2">
              {business.services.map((service) => (
                <span
                  key={service}
                  className="bg-blue-50 text-blue-700 text-sm font-medium px-4 py-2 rounded-full border border-blue-100"
                >
                  ✓ {service}
                </span>
              ))}
            </div>
          </section>

          {/* Business Hours */}
          <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full inline-block" />
              Business Hours
            </h2>
            <div className="divide-y divide-gray-100">
              {dayOrder.map((day) => {
                const hours = business.hours[day as keyof typeof business.hours];
                if (!hours) return null;
                const isToday = todayName === day;
                const isClosed = hours === "Closed";
                return (
                  <div
                    key={day}
                    className={`flex justify-between items-center py-3 text-sm ${
                      isToday ? "bg-blue-50 -mx-2 px-2 rounded-lg" : ""
                    }`}
                  >
                    <span className={`capitalize font-medium ${isToday ? "text-blue-700" : "text-gray-700"}`}>
                      {isToday && <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded mr-2">Today</span>}
                      {day}
                    </span>
                    <span className={
                      isClosed
                        ? "text-red-500 font-medium"
                        : isToday
                        ? "text-blue-700 font-bold"
                        : "text-gray-600"
                    }>
                      {hours}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Contact Card */}
          <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Contact Details</h2>
            <div className="space-y-4">
              <a href={`tel:${business.phone}`}
                className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
                <span className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-lg shrink-0">📞</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Phone</p>
                  <p className="text-green-700 font-bold group-hover:underline">{business.phone}</p>
                </div>
              </a>

              <a href={`mailto:${business.email}`}
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
                <span className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg shrink-0">✉️</span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-medium">Email</p>
                  <p className="text-blue-700 font-bold group-hover:underline truncate">{business.email}</p>
                </div>
              </a>

              {business.website && (
                <a href={business.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group">
                  <span className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg shrink-0">🌐</span>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 font-medium">Website</p>
                    <p className="text-purple-700 font-bold group-hover:underline truncate">
                      {business.website.replace(/^https?:\/\//, "")}
                    </p>
                  </div>
                </a>
              )}

              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                <span className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white text-lg shrink-0">📍</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Address</p>
                  <p className="text-orange-800 font-semibold text-sm">
                    {business.address}<br />
                    {business.city}, {business.state} {business.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Business Info */}
          <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Business Info</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: "Category", value: business.category },
                business.subcategory ? { label: "Type", value: business.subcategory } : null,
                business.established ? { label: "Established", value: String(business.established) } : null,
                { label: "Rating", value: `${business.rating} / 5.0` },
                { label: "Reviews", value: `${business.reviewCount} reviews` },
                { label: "Status", value: business.verified ? "✅ Verified" : "Unverified" },
              ]
                .filter(Boolean)
                .map((item) => (
                  <div key={item!.label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500">{item!.label}</span>
                    <span className="font-semibold text-gray-800">{item!.value}</span>
                  </div>
                ))}
            </div>
          </section>

          {/* Social Media */}
          {business.socialMedia && Object.values(business.socialMedia).some(Boolean) && (
            <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Follow Us</h2>
              <div className="grid grid-cols-2 gap-2">
                {business.socialMedia.facebook && (
                  <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                    Facebook
                  </a>
                )}
                {business.socialMedia.instagram && (
                  <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium px-3 py-2 rounded-xl hover:opacity-90 transition-opacity">
                    Instagram
                  </a>
                )}
                {business.socialMedia.twitter && (
                  <a href={business.socialMedia.twitter} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-sky-500 text-white text-sm font-medium px-3 py-2 rounded-xl hover:bg-sky-600 transition-colors">
                    Twitter
                  </a>
                )}
                {business.socialMedia.linkedin && (
                  <a href={business.socialMedia.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-blue-800 text-white text-sm font-medium px-3 py-2 rounded-xl hover:bg-blue-900 transition-colors">
                    LinkedIn
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 py-8 mt-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} Classified Directory. All rights reserved.</p>
          <Link href="/" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            ← Back to Directory
          </Link>
        </div>
      </footer>
    </main>
  );
}
