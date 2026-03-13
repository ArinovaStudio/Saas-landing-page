"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, LogIn, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    setIsDropdownOpen(false);
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between py-9 px-6">
      {/* Page Title or Search */}
      <div className="flex-1">
        <Link href="/" className="text-lg font-semibold text-gray-900 hover:text-[#f0b31e] transition-colors">
          SaaS Platform
        </Link>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        ) : session ? (
          // Logged In - Show User Menu
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-200 via-pink-300 to-purple-200/20 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                {session.user?.name || session.user?.email || "User"}
              </span>
              <ChevronDown size={16} className="text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {session.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session.user?.email}
                  </p>
                </div>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <User size={16} />
                  Dashboard
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          // Not Logged In - Show Login Button
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-4 py-2 bg-pink-600/80 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            <LogIn size={16} />
            <span className="hidden sm:inline">Sign In</span>
            <span className="sm:hidden">Login</span>
          </button>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
}
