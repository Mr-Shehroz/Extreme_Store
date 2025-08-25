"use client"
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";   // Google logo (colorful)
import { FaFacebook } from "react-icons/fa"; // Facebook logo


export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // 👈 NEW state

  const signup = async (e: any) => {
    e.preventDefault();
    setLoading(true); // start loading

    try {
      const response: any = await axios.post("/api/users/signup", user);
      console.log(response.data);
      setSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="min-h-[110vh] flex items-center justify-center bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4">
      <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-md p-8 border border-white/20">
        
        {/* If signup success */}
        {success ? (
          <h2 className="text-2xl font-bold text-green-400 text-center animate-pulse">
            🎉 Account Created Successfully!
          </h2>
        ) : (
          <>
            {/* Heading */}
            <h2 className="text-3xl font-bold text-center text-white mb-2">
              Create an Account
            </h2>
            <p className="text-center text-gray-300 text-sm mb-8">
              Join us today! Fill in your details to get started.
            </p>

            {/* Form */}
            <form onSubmit={signup} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    name="username"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    name="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    name="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    type="password"
                    placeholder="********"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 
                  ${loading ? "bg-cyan-400 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-400"} 
                  text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-[1px] bg-gray-600 flex-1"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-[1px] bg-gray-600 flex-1"></div>
        </div>

        {/* Social Sign Up */}
        <div className="flex flex-col gap-3">
          <button
            className="w-full flex items-center justify-center gap-2 border border-gray-600 py-3 rounded-xl text-white hover:bg-white/10 transition">
            <FcGoogle size={20} />
            Continue with Google
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 border border-gray-600 py-3 rounded-xl text-white hover:bg-white/10 transition">
            <FaFacebook size={20} />
            Continue with Facebook
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
