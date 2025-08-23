"use client";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const login = async (e:any) => {
    e.preventDefault()

    try {

      const response = await axios.post('/api/users/login', user)
      console.log("Login successful:", response.data);
      router.push('/');

    } catch (error:any) {
      console.error("Login failed:", error.message);
      
    }
  }

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4">
      <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-md p-8 border border-white/20">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-300 text-sm mb-8">
          Login to your account and continue exploring.
        </p>

        {/* Form */}
        <form onSubmit={login} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-cyan-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                type="password"
                placeholder="********"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-[1px] bg-gray-600 flex-1"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-[1px] bg-gray-600 flex-1"></div>
        </div>

        {/* Social Login */}
        <div className="flex flex-col gap-3">
          <button
            className="w-full flex items-center justify-center gap-2 border border-gray-600 py-3 rounded-xl text-white hover:bg-white/10 transition">
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 border border-gray-600 py-3 rounded-xl text-white hover:bg-white/10 transition">
            <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
            Continue with Facebook
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don`t have an account?{" "}
          <Link
            href="/signup"
            className="text-cyan-400 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
