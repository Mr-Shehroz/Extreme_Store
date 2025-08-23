"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-gray-300 pt-16 pb-8">
      <div className="max-w-[1450px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo + About */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Extreme<span className="text-[#38bdf8]">Store</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Your one-stop shop for premium products. We bring you the best
            deals with fast delivery and trusted service.
          </p>
        </div>

        {/* Quick Links */}
        <div className="2xl:ml-20">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Shop", "About", "Contact"].map((item, i) => (
              <li key={i}>
                <Link
                  href="#"
                  className="hover:text-[#38bdf8] transition-colors duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            {["FAQ", "Help Center", "Privacy Policy", "Terms & Conditions"].map(
              (item, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="hover:text-[#38bdf8] transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
          <p className="text-sm mb-4 text-gray-400">
            Subscribe to get the latest updates and offers.
          </p>
          <div className="flex rounded-xl overflow-hidden bg-gradient-to-r from-[#334155] to-[#1e293b]">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 text-sm w-full outline-none bg-transparent text-white placeholder-gray-400"
            />
            <button className="bg-[#38bdf8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0ea5e9] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        <p className="text-sm text-gray-400 text-center md:text-left">
          © {new Date().getFullYear()} ExtremeStore. All rights reserved.
        </p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-[#38bdf8] transition-colors">
            <Facebook size={22} />
          </a>
          <a href="#" className="hover:text-[#38bdf8] transition-colors">
            <Instagram size={22} />
          </a>
          <a href="#" className="hover:text-[#38bdf8] transition-colors">
            <Twitter size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}
