'use client';

import React, { useState } from 'react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  subtitle: string;
  price: string;
  period: string;
  features: PricingFeature[];
  highlighted?: boolean;
  badge?: string;
}

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      subtitle: 'For individuals & small teams',
      price: '19',
      period: 'month',
      features: [
        { text: 'Project & Task Management', included: true },
        { text: 'Unlimited Projects & Clients', included: true },
        { text: 'Team Chat & File Sharing', included: true },
        { text: 'CRM- Up to 100 contacts', included: true },
        { text: 'Basic Reports & Analytics', included: true }
      ]
    },
    {
      name: 'Professional',
      subtitle: 'Best for small & medium businesses',
      price: '49',
      period: 'month',
      highlighted: true,
      badge: 'MOST POPULAR',
      features: [
        { text: 'Everything in Starter, plus', included: true },
        { text: 'Custom Dashboards & Reports', included: true },
        { text: 'Time Tracking & Billing', included: true },
        { text: 'Accounting Integration', included: true },
        { text: 'Priority Email + Live Chat Support', included: true }
      ]
    },
    {
      name: 'Enterprise',
      subtitle: 'Perfect for enterprise-scale teams',
      price: '99',
      period: 'month',
      features: [
        { text: 'Everything in Pro, plus', included: true },
        { text: 'Dedicated Account Manager', included: true },
        { text: 'SLA Uptime Guarantee', included: true },
        { text: 'Single Sign-On (SSO)', included: true },
        { text: 'Onboarding & Training Sessions', included: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4 pb-40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            No contracts, no surprise fees—just simple pricing you can understand
          </p>
        </div>

        <div className="flex items-center justify-center mb-10">
          <div className="flex border-1 border-gray-200 rounded-full  cursor-pointer">
            {/* Monthly */}
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${billingCycle === "monthly" ? "bg-blue-600 text-white" : "text-slate-600"}
      `}
            >
              Monthly
            </button>

            {/* Yearly */}
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${billingCycle === "yearly" ? "bg-blue-600 text-white" : "text-slate-600"}
      `}
            >
              Yearly
            </button>
          </div>
        </div>


        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl transition-all duration-300 ${tier.highlighted
                ? 'bg-white shadow-2xl md:scale-105 border-2 border-blue-600'
                : 'bg-white/80 backdrop-blur-sm shadow-lg border border-slate-200 hover:shadow-xl'
                }`}
            >
              {/* Popular Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Tier Name */}
                <div className="mb-6">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {tier.name}
                  </span>
                  <h3 className="text-2xl font-semibold text-slate-900 mt-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2">{tier.subtitle}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-slate-900">
                      ${tier.price}
                    </span>
                    <span className="text-slate-500 text-sm font-medium">
                      /{tier.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3"
                    >
                      <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-slate-700 leading-relaxed">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${tier.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-white border-2 border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                >
                  Get started
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;