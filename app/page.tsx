import Link from "next/link";
import { businesses, categories, getBusinessesByCategory } from "@/lib/businesses";
import BusinessCard from "@/components/BusinessCard";
import SearchBar from "@/components/SearchBar";

export default function Home({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const selectedCategory = searchParams.category || "All";
  const query = searchParams.q?.toLowerCase() || "";

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

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Local Businesses
          </h1>
          <p className="text-blue-200 text-lg mb-8">
            Discover trusted businesses in your area — browse by category or search by name.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${cat}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Featured Listings */}
        {!query && selectedCategory === "All" && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Featured Businesses
            </h2>
            <p className="text-gray-500 text-sm mb-6">Top-rated and verified businesses</p>
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
                  ? `Results for "${searchParams.q}"`
                  : selectedCategory === "All"
                  ? "All Businesses"
                  : selectedCategory}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {filtered.length} {filtered.length === 1 ? "business" : "businesses"} found
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg font-medium">No businesses found</p>
              <p className="text-sm">Try a different search or category</p>
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

      <footer className="bg-gray-800 text-gray-400 text-center py-8 mt-16 text-sm">
        <p>© {new Date().getFullYear()} Classified Directory. All rights reserved.</p>
      </footer>
    </main>
  );
}
