import React from 'react';
import { Settings, Home } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="relative max-w-5xl w-full">
        <div className="absolute -top-10 -left-10 w-20 h-20 border-l-4 border-t-4 border-gray-900 rounded-tl-3xl opacity-80"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 border-r-4 border-b-4 border-gray-900 rounded-br-3xl opacity-80"></div>

        <div 
          className="
            bg-white rounded-3xl overflow-hidden border border-gray-200
            shadow-[0_35px_80px_-15px_rgba(0,0,0,0.25),0_20px_40px_-10px_rgba(0,0,0,0.15)]
            transition-all duration-300 hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.3)]
          "
        >
          <div className="bg-gray-100 px-5 py-3 flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-inner" />
            <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-inner" />
            <div className="w-4 h-4 rounded-full bg-green-500 shadow-inner" />
          </div>

          <div className="flex">
            <div className="w-64 bg-white border-r border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rounded-sm" />
                </div>
                <span className="font-bold text-gray-900 text-lg">WorkNest</span>
              </div>

              <nav className="space-y-2">
                <div className="bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3">
                  <Home className="w-5 h-5" />
                  Dashboard
                </div>
                {['Projects', 'Team', 'Reports', 'Analytics', 'Tasks', 'Calendar', 'Files', 'Team Inbox', 'Admin'].map((item) => (
                  <div key={item} className="text-gray-600 px-4 py-3 text-sm flex items-center gap-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md" />
                    {item}
                  </div>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-50/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
                  <p className="text-gray-500 mt-1">Welcome back, User!</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <Settings className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="w-5 h-5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Revenue Status', value: '$432', gradient: 'from-blue-500 to-cyan-500' },
                  { label: 'Page View', value: '12.4k', gradient: 'from-purple-500 to-pink-500' },
                  { label: 'Bounce Rate', value: '24.8%', gradient: 'from-orange-500 to-red-500' },
                  { label: 'Revenue Rate', value: '+18.2%', gradient: 'from-green-500 to-emerald-500' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                        <div className="w-6 h-6 bg-white/30 rounded-md" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Chart Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Sales Order</h3>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-blue-500 rounded-full" />Online</div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-purple-500 rounded-full" />Offline</div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-500 rounded-full" />Marketing</div>
                    </div>
                  </div>
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl relative overflow-hidden flex items-center justify-center">
                    {/* Simple SVG chart */}
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                        </linearGradient>
                      </defs>
                      <path d="M0,160 Q100,80 200,110 T400,90" stroke="#3b82f6" strokeWidth="3" fill="none" />
                      <path d="M0,160 L0,200 Q100,200 200,200 T400,200 L400,90 Q300,110 200,110 T0,160 Z" fill="url(#blueGrad)" />
                      <path d="M0,170 Q100,120 200,140 T400,120" stroke="#8b5cf6" strokeWidth="3" fill="none" />
                      <path d="M0,170 L0,200 Q100,200 200,200 T400,200 L400,120 Q300,135 200,140 T0,170 Z" fill="url(#purpleGrad)" />
                      <circle cx="200" cy="110" r="6" fill="#3b82f6" />
                    </svg>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                      $432 Peak
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%">
                      <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="3" cy="3" r="1.5" fill="#f59e0b" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#dots)" />
                    </svg>
                  </div>
                  <div className="text-center z-10">
                    <svg className="w-16 h-16 mx-auto mb-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <div className="text-lg font-semibold text-gray-800">Map View Coming Soon</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;