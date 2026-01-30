'use client';
import Header from './components/header';
import Start from './components/Start';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

export default function WorkNestLanding() {
  return (
    <div className='min-h-screen font-display bg-gradient-to-b from-purple-50 via-pink-50 to-white'>
      {/* Hero section */}
      <div className="relative">
        <Header />
        <div className="pt-16 pb-45 z-10 relative max-w-5xl mx-auto px-4 text-center">
          <Start />
        </div>
        
        {/* Soft blurred transition overlay - reduced intensity */}
        <div className='absolute bottom-0 left-0 w-full h-64 bg-gradient-to-r from-purple-200 via-pink-300 to-purple-200/20 blur-2xl opacity-80' />
      </div>
      
      {/* Dashboard section */}
      <div className="relative -mt-32 lg:-mt-48 z-10 max-w-6xl mx-auto px-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200/50">
          <Dashboard />
        </div>
      </div>

      <Footer />
    </div>
  );
}