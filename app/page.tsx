import Link from "next/link";
import { businesses, categories, getBusinessesByCategory } from "@/lib/businesses";
import BusinessCard from "@/components/BusinessCard";
import SearchBar from "@/components/SearchBar";

const CATEGORY_META: Record<string, { icon: string; color: string }> = {
  "All": { icon: "🏙️", color: "bg-gray-700" },
  "Home Services": { icon: "🔧", color: "bg-orange-500" },
  "Food & Dining": { icon: "🍽️", color: "bg-green-600" },
  "Technology": { icon: "💻", color: "bg-violet-600" },
  "Healthcare": { icon: "🏥", color: "bg-rose-500" },
  "Health & Fitness": { icon: "💪", color: "bg-cyan-500" },
  "Pet Services": { icon: "🐾", color: "bg-yellow-500" },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const selectedCategory = category || "All";
  const query = q?.toLowerCase() || "";

  let filtered = getBusinessesByCategory(selectedCategory);
  if (query) {
    filtered = filtered.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.city.toLowerCase().includes(query)
    );
  }

  const featured = businesses.filter((b) => b.featured);
  const totalBusinesses = businesses.length;
  const totalCategories = categories.length - 1;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {totalBusinesses} Businesses Listed
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
            Find the Best<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400">
              Local Businesses
            </span>
          </h1>
          <p className="text-blue-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Discover trusted businesses in your area. Browse by category, search by name, and get complete contact details instantly.
          </p>
          <SearchBar />

          {/* Quick Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[
              { label: "Businesses", value: totalBusinesses },
              { label: "Categories", value: totalCategories },
              { label: "Verified", value: businesses.filter(b => b.verified).length },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}+</p>
                <p className="text-blue-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat] || { icon: "🏢", color: "bg-gray-600" };
            const isActive = selectedCategory === cat;
            return (
              <Link
                key={cat}
                href={`/?category=${encodeURIComponent(cat)}`}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? `${meta.color} text-white shadow-md scale-105`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{meta.icon}</span> {cat}
              </Link>
            );
          })}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Category Cards (shown only on All / no search) */}
        {!query && selectedCategory === "All" && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Browse by Category</h2>
            <p className="text-gray-400 text-sm mb-6">Pick a category to explore businesses</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {categories.slice(1).map((cat) => {
                const meta = CATEGORY_META[cat] || { icon: "🏢", color: "bg-gray-600" };
                return (
                  <Link
                    key={cat}
                    href={`/?category=${encodeURIComponent(cat)}`}
                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all text-center"
                  >
                    <span className={`w-12 h-12 ${meta.color} rounded-xl flex items-center justify-center text-2xl shadow`}>
                      {meta.icon}
                    </span>
                    <span className="text-xs font-semibold text-gray-700 leading-tight">{cat}</span>
                    <span className="text-xs text-gray-400">
                      {getBusinessesByCategory(cat).length} listed
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Featured Listings */}
        {!query && selectedCategory === "All" && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">⭐ Featured Businesses</h2>
                <p className="text-gray-400 text-sm mt-1">Handpicked top-rated & verified businesses</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </section>
        )}

        {/* All / Filtered Listings */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {query
                  ? `🔍 Results for "${q}"`
                  : selectedCategory === "All"
                  ? "All Businesses"
                  : `${CATEGORY_META[selectedCategory]?.icon || ""} ${selectedCategory}`}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {filtered.length} {filtered.length === 1 ? "business" : "businesses"} found
              </p>
            </div>
            {(query || selectedCategory !== "All") && (
              <Link
                href="/"
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Clear filter ×
              </Link>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg font-semibold text-gray-600">No businesses found</p>
              <p className="text-sm mt-1">Try a different search term or category</p>
              <Link href="/" className="mt-6 inline-block text-blue-600 font-medium hover:underline">
                Browse all businesses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-16 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-white font-bold text-xl mb-2">📋 Classified Directory</h3>
          <p className="text-sm text-gray-500 mb-6">Your trusted source for finding local businesses.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
            {categories.slice(1).map(cat => (
              <Link key={cat} href={`/?category=${encodeURIComponent(cat)}`} className="hover:text-white transition-colors">
                {cat}
              </Link>
            ))}
          </div>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Classified Directory. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
