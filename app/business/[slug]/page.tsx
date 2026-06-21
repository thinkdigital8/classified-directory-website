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
          className={`w-5 h-5 ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-lg font-bold text-gray-800 ml-1">{rating}</span>
    </div>
  );
}

const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default function BusinessDetailPage({ params }: { params: { slug: string } }) {
  const business = getBusinessBySlug(params.slug);
  if (!business) notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <nav className="bg-white border-b px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors font-medium">
            Home
          </Link>
          <span>/</span>
          <Link href={`/?category=${business.category}`} className="hover:text-blue-600 transition-colors">
            {business.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{business.name}</span>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{business.name}</h1>
                {business.verified && (
                  <span className="flex items-center gap-1 bg-blue-500 bg-opacity-40 text-blue-100 text-xs px-2 py-1 rounded-full">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                )}
                {business.featured && (
                  <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 text-blue-200 text-sm">
                <span>{business.category}{business.subcategory ? ` · ${business.subcategory}` : ""}</span>
                {business.established && <span>Est. {business.established}</span>}
              </div>
              <div className="mt-3">
                <StarRating rating={business.rating} />
                <p className="text-blue-300 text-sm mt-1">{business.reviewCount} customer reviews</p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-2 bg-white text-blue-700 font-bold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-blue-500 transition-colors text-sm border border-blue-400"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">{business.description}</p>
          </section>

          {/* Services */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Services Offered</h2>
            <div className="flex flex-wrap gap-2">
              {business.services.map((service) => (
                <span
                  key={service}
                  className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
          </section>

          {/* Business Hours */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Business Hours</h2>
            <div className="divide-y divide-gray-100">
              {dayOrder.map((day) => {
                const hours = business.hours[day as keyof typeof business.hours];
                if (!hours) return null;
                const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
                const isToday = today === day;
                return (
                  <div
                    key={day}
                    className={`flex justify-between py-2.5 text-sm ${isToday ? "text-blue-600 font-semibold" : "text-gray-600"}`}
                  >
                    <span className="capitalize">{day}</span>
                    <span className={hours === "Closed" ? "text-red-500" : ""}>{hours}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column — Contact & Info */}
        <div className="space-y-6">
          {/* Contact Details */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Phone</p>
                  <a href={`tel:${business.phone}`} className="text-blue-600 font-semibold hover:underline">
                    {business.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Email</p>
                  <a href={`mailto:${business.email}`} className="text-blue-600 font-semibold hover:underline break-all">
                    {business.email}
                  </a>
                </div>
              </div>

              {business.website && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Website</p>
                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline break-all">
                      {business.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Address</p>
                  <p className="text-gray-700 font-medium">
                    {business.address}<br />
                    {business.city}, {business.state} {business.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Social Media */}
          {business.socialMedia && (
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h2>
              <div className="flex flex-wrap gap-3">
                {business.socialMedia.facebook && (
                  <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Facebook
                  </a>
                )}
                {business.socialMedia.instagram && (
                  <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-pink-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                    Instagram
                  </a>
                )}
                {business.socialMedia.twitter && (
                  <a href={business.socialMedia.twitter} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-sky-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
                    Twitter
                  </a>
                )}
                {business.socialMedia.linkedin && (
                  <a href={business.socialMedia.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                    LinkedIn
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Quick Info */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Business Info</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <span className="font-medium text-gray-800">{business.category}</span>
              </div>
              {business.subcategory && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-800">{business.subcategory}</span>
                </div>
              )}
              {business.established && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Established</span>
                  <span className="font-medium text-gray-800">{business.established}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className={`font-medium ${business.verified ? "text-green-600" : "text-gray-600"}`}>
                  {business.verified ? "✓ Verified" : "Unverified"}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="bg-gray-800 text-gray-400 text-center py-8 mt-8 text-sm">
        <p>© {new Date().getFullYear()} Classified Directory. All rights reserved.</p>
        <Link href="/" className="text-blue-400 hover:underline mt-2 inline-block">← Back to Directory</Link>
      </footer>
    </main>
  );
}
