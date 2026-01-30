import { ArrowRight, Settings, Home, Users } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-4">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-lg font-display text-gray-600 max-w-3xl mx-auto">
            Manage customer relationships and support tickets in one place for better<br />
            customer experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Step 1 - Create Free Account */}
          <div className="text-center group p-12 rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-pink-300/20 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 md:w-8 md:h-8 text-black" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Free Account</h3>
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
              Sign up in seconds no credit card<br />
              needed and teams add.
            </p>
            <button className="text-black font-medium text-base flex items-center gap-2 mx-auto hover:gap-3 transition-all group">
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Step 2 - Set Up Workspace */}
          <div className="text-center group bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-12 rounded-3xl">
            <div className="w-20 h-20 md:w-24 md:h-24rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center shadow-lg">
                <Settings className="w-7 h-7 md:w-8 md:h-8 text-black" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Set Up Workspace</h3>
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
              Customize projects, add your team,<br />
              connect your favorite apps.
            </p>
            <button className="text-black font-medium text-base flex items-center gap-2 mx-auto hover:gap-3 transition-all group">
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Step 3 - Launch & Scale */}
          <div className="text-center group bg-gradient-to-br from-orange-50 via-yellow-50 to-white p-12 rounded-3xl">
            <div className="w-20 h-20 md:w-24 md:h-24rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center shadow-lg">
                <Home className="w-7 h-7 md:w-8 md:h-8 text-black" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Launch & Scale</h3>
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
              Start managing operations monitor<br />
              your growth in real-time.
            </p>
            <button className="text-black font-medium text-base flex items-center gap-2 mx-auto hover:gap-3 transition-all group">
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;