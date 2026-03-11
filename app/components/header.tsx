"use client";
import { Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between py-9 px-6">
      {/* Page Title or Search */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        {/* <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Bell size={20} />
        </button> */}

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">User</span>
        </div>
      </div>
    </header>
  );
}
