"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = unknown (prevents flicker)

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get("/api/users/me", { withCredentials: true });
      setIsLoggedIn(!!res.data?.authenticated);
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  // 1) Initial + on route change
  useEffect(() => {
    checkAuth();
  }, [checkAuth, pathname]);

  // 2) React to custom auth-change events
  useEffect(() => {
    const handler = () => checkAuth();
    window.addEventListener("auth:changed", handler);
    return () => window.removeEventListener("auth:changed", handler);
  }, [checkAuth]);

  const logout = async (e: any) => {
    e.preventDefault();
    try {
      await axios.get("/api/users/logout", { withCredentials: true });
      setIsLoggedIn(false);                              // update UI instantly
      window.dispatchEvent(new Event("auth:changed"));   // notify other tabs/components
      router.push("/login");
    } catch (error: any) {
      console.log(error.message, "Logout failed");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="bg-[#1e293b] py-4 px-4 shadow-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            Extreme<span className="text-[#38bdf8]">Store</span>
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex gap-8">
            <Link className="text-white hover:text-[#38bdf8] transition-colors text-lg" href="/">
              Home
            </Link>
            <Link className="text-white hover:text-[#38bdf8] transition-colors text-lg" href="/shop">
              Shop
            </Link>
            <Link className="text-white hover:text-[#38bdf8] transition-colors text-lg" href="/about">
              About
            </Link>
            <Link className="text-white hover:text-[#38bdf8] transition-colors text-lg" href="/contact">
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-6">
            <button
              className="text-white hover:text-[#38bdf8]"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={24} />
            </button>

            <button className="text-white hover:text-[#38bdf8]">
              <ShoppingCart size={24} />
            </button>

            {/* Auth buttons (render only when known) */}
            {isLoggedIn === null ? null : isLoggedIn ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-white bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 transition-colors text-lg font-semibold"
              >
                <User size={20} /> Logout
              </button>
            ) : (
              <Link
                className="flex items-center gap-2 text-white bg-[#38bdf8] px-4 py-2 rounded-xl hover:bg-[#0ea5e9] transition-colors text-lg font-semibold"
                href="/signup"
              >
                <User size={20} /> Sign Up
              </Link>
            )}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Search Input (Desktop Toggle) */}
        {searchOpen && (
          <div className="hidden md:flex items-center bg-[#334155] rounded-xl px-3 py-2 mt-3 max-w-[500px] mx-auto animate-slideDown">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent text-white placeholder-gray-300 text-sm w-full outline-none"
            />
            <Search className="text-[#38bdf8]" size={22} />
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#1e293b] shadow-lg p-6 space-y-6 animate-slideDown">
          <nav className="flex flex-col gap-4">
            <Link className="text-white hover:text-[#38bdf8] text-lg" href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link className="text-white hover:text-[#38bdf8] text-lg" href="/shop" onClick={() => setIsOpen(false)}>
              Shop
            </Link>
            <Link className="text-white hover:text-[#38bdf8] text-lg" href="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link className="text-white hover:text-[#38bdf8] text-lg" href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </nav>

          <div className="flex items-center bg-[#334155] rounded-xl px-3 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-white placeholder-gray-300 text-sm w-full outline-none"
            />
            <Search className="text-[#38bdf8]" size={22} />
          </div>

          <div className="flex items-center justify-between mt-4">
            <button className="text-white hover:text-[#38bdf8]">
              <ShoppingCart size={24} />
            </button>

            {isLoggedIn === null ? null : isLoggedIn ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-white bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 transition-colors text-lg font-semibold"
              >
                <User size={20} /> Logout
              </button>
            ) : (
              <Link
                className="flex items-center gap-2 text-white bg-[#38bdf8] px-4 py-2 rounded-xl hover:bg-[#0ea5e9] transition-colors text-lg font-semibold"
                href="/signup"
                onClick={() => setIsOpen(false)}
              >
                <User size={20} /> Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
