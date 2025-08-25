"use client";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      {/* Hero / Banner */}
      <section className="px-8 pt-30 text-center">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-10 backdrop-blur-lg shadow-xl max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Up to <span className="text-cyan-400">50% Off</span> on Electronics
          </h2>
          <p className="text-gray-300 mb-6">
            Upgrade your lifestyle with the latest gadgets and accessories.
          </p>
          <Link
            href="/shop"
            className="px-8 py-3 bg-cyan-500 rounded-xl font-semibold hover:bg-cyan-400 transition shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Flash Sale */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">🔥 Flash Sale</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4 hover:scale-105 transition">
              <Image src={`/product${i}.png`} alt="product" width={200} height={200} className="mx-auto" />
              <p className="mt-4 font-semibold">Product {i}</p>
              <p className="text-cyan-400">$99.99</p>
            </div>
          ))}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">📂 Browse by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {["Phones", "Laptops", "Fashion", "Gaming", "Home"].map((cat, i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-6 text-center hover:bg-cyan-500/20 transition">
              <p className="font-semibold">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">🏆 Best Selling</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4 hover:scale-105 transition">
              <Image src={`/product${i}.png`} alt="product" width={200} height={200} className="mx-auto" />
              <p className="mt-4 font-semibold">Best Product {i}</p>
              <p className="text-cyan-400">$149.99</p>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-10 text-center shadow-lg">
          <h3 className="text-3xl font-bold mb-4">🎧 Enhance Your Music Experience</h3>
          <p className="text-white/90 mb-6">Get the best deals on premium headphones and speakers.</p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">✨ New Arrivals</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4 hover:scale-105 transition">
              <Image src={`/new${i}.png`} alt="new product" width={200} height={200} className="mx-auto" />
              <p className="mt-4 font-semibold">New Product {i}</p>
              <p className="text-cyan-400">$199.99</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
