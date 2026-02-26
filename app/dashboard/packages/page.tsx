"use client";
import { Check, X, Plus } from "lucide-react";
import { useState, useEffect } from "react";

interface Feature {
  name: string;
  included?: boolean;
}

interface Package {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency: string;
  features: Feature[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


interface PricingHeaderProps {
  billingCycle: "monthly" | "yearly";
  setBillingCycle: (cycle: "monthly" | "yearly") => void;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPackage, setNewPackage] = useState<Package>({
    id: "",
    name: "",
    slug: "",
    price: 0,
    currency: "USD",
    features: [{ name: "Feature 1", included: true }],
    isPopular: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/packages");

      if (!response.ok) {
        throw new Error("Failed to fetch packages");
      }

      const data = await response.json();
      setPackages(data.packages || data);
      setError(null);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError("Failed to load packages. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getSectionTitle = (index: number, packages: Package[]) => {
    if (index === 0) return "KEY FEATURES:";
    return `EVERYTHING IN ${packages[index].name.toUpperCase()} +`;
  };

  const getButtonStyle = (pkg: Package) => {
    if (pkg.isPopular) {
      return "bg-white/90 text-gray-900 hover:bg-gray-100";
    }

    const packageIndex = packages.findIndex(p => p.id === pkg.id);
    if (packageIndex === 1) {
      return "bg-gray-100 text-gray-900 hover:bg-gray-200";
    }

    if (packageIndex === packages.length - 1 || pkg.price === 0 && pkg.name.toLowerCase().includes('enterprise')) {
      return "bg-gray-100 text-gray-700 hover:bg-gray-50";
    }

    return "bg-[#202020] text-white hover:bg-gray-800";
  };

  const getButtonText = (pkg: Package) => {
    if (pkg.name.toLowerCase().includes('enterprise')) {
      return "Get a Demo";
    }
    if (pkg.price === 0 && pkg.name.toLowerCase().includes('free')) {
      return "Get Started";
    }
    return "Get started";
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency === "INR" ? "₹" : "$"}${price}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Packages</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchPackages}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No packages available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 px-8">
      {/* Header Section */}
      <div className="max-w-[1400px] mx-auto mb-6">
        {/* Main Heading */}
        <h1
          className="
    text-center 
    font-bold 
    text-[60px] 
    leading-[1.1] 
    tracking-[-2.1px] 
    whitespace-pre-line
    bg-[linear-gradient(98deg,#202020_43.06%,#8f8f8f_70%)]
    bg-clip-text 
    text-transparent
    mb-12
  "
        >
          The best work solution,
          <br />
          for the best price.
        </h1>
        {/* Bottom Section with Guarantee and Toggle */}
        <div className="flex items-center justify-between">
          {/* Money-back Guarantee - Left Side */}
          <div className="flex items-center gap-2 bg-gray-100 py-2 px-4 rounded-full">
            <Check className="text-green-900" size={18} />
            <span className="text-gray-900 text-sm font-medium">100% Money-back Guarantee</span>
          </div>

          {/* Center - Add Package Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus size={18} />
          </button>

          {/* Right Side - Save text and Toggle */}
          <div className="flex flex-col items-center gap-2">
            <div>
              <span className="text-[13px] text-[#4a2fff] font-medium">Save up to 30% with yearly</span>
            </div>
            <div className="inline-flex w-50 rounded-full bg-gray-50 p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 w-508 rounded-full text-sm font-medium transition-all ${billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 w-508 rounded-full text-sm font-medium transition-all ${billingCycle === "yearly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className={`max-w-[1400px] mx-auto grid gap-6 transition-all duration-1000 ease-in-out ${selectedPackage ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
        {packages.map((pkg, index) => {
          const features = Array.isArray(pkg.features)
            ? pkg.features
            : typeof pkg.features === 'object'
              ? Object.values(pkg.features)
              : [];

          if (selectedPackage && selectedPackage !== pkg.id) return null;

          return (
            <div
              key={pkg.id}
              className={`relative rounded-2xl border overflow-hidden flex flex-col transition-all duration-1000 ease-in-out ${selectedPackage === pkg.id ? 'scale-100 opacity-100' : 'scale-100 opacity-100'} ${pkg.isPopular
                ? "bg-[#202020] border-[#2d2d2d]"
                : "bg-white border-gray-200"
                }`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute top-10 right-14 z-10">
                  <span className="inline-flex items-center rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
                    Popular
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-1">
                {/* Header */}
                <div className="mb-8">
                  {selectedPackage === pkg.id ? (
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e) => {
                        setPackages(packages.map(p => p.id === pkg.id ? { ...p, name: e.target.value } : p));
                      }}
                      className={`text-[28px] font-semibold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full ${pkg.isPopular ? "text-white" : "text-gray-900"}`}
                    />
                  ) : (
                    <h3 className={`text-[28px] font-semibold ${pkg.isPopular ? "text-white" : "text-gray-900"}`}>
                      {pkg.name}
                    </h3>
                  )}

                  {pkg.price === 0 && pkg.name.toLowerCase().includes('enterprise') ? (
                    <p className={`text-base ${pkg.isPopular ? "text-gray-400" : "text-gray-600"}`}>
                      Get a custom demo
                    </p>
                  ) : (
                    <>
                      {pkg.name !== 'Enterprise' && (
                        <>
                          <div className="flex items-baseline gap-0 mb-1">
                            {selectedPackage === pkg.id ? (
                              <input
                                type="number"
                                value={pkg.price}
                                onChange={(e) => {
                                  setPackages(packages.map(p => p.id === pkg.id ? { ...p, price: Number(e.target.value) } : p));
                                }}
                                className={`text-[42px] font-semibold leading-none bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none w-32 ${pkg.isPopular ? "text-white" : "text-gray-900"}`}
                              />
                            ) : (
                              <span className={`text-[42px] font-semibold leading-none ${pkg.isPopular ? "text-white" : "text-gray-900"}`}>
                                {formatPrice(Number(pkg.price), pkg.currency)}
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${pkg.isPopular ? "text-gray-400" : "text-gray-600"}`}>
                            Per user/month, billed yearly
                          </p>
                        </>
                      )}
                      {pkg.name === 'Enterprise' && (
                        <div className="mb-5 font-semibold mt-5 text-xl text-gray-900">
                          Get A custom Demo
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
                  className={`w-full h-7 px-6 rounded-lg font-semibold text-[15px] transition-all ${getButtonStyle(pkg)}`}
                >
                  {selectedPackage === pkg.id ? "Close" : getButtonText(pkg)}
                </button>
                <hr className="border-gray-200 my-6" />

                {/* Features Section */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-6">
                    <p className={`text-[11px] font-semibold tracking-[0.08em] uppercase ${pkg.isPopular ? "text-gray-400" : "text-gray-500"}`}>
                      {getSectionTitle(index, packages)}
                    </p>
                    {selectedPackage === pkg.id && (
                      <button
                        onClick={() => {
                          setPackages(packages.map(p => p.id === pkg.id ? { ...p, features: [...p.features, { name: "New Feature", included: true }] } : p));
                        }}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Plus size={14} /> Add
                      </button>
                    )}
                  </div>
                  <ul className="space-y-3.5">
                    {features.map((feature: any, idx: number) => {
                      const featureName = typeof feature === 'string'
                        ? feature
                        : feature.name || feature.title || '';
                      const isIncluded = typeof feature === 'object' ? feature.included !== false : true;

                      return (
                        <li key={idx} className="flex items-start gap-3">
                          {selectedPackage === pkg.id ? (
                            <>
                              <button
                                onClick={() => {
                                  const updated = [...features];
                                  updated[idx] = { ...updated[idx], name: featureName, included: !isIncluded };
                                  setPackages(packages.map(p => p.id === pkg.id ? { ...p, features: updated } : p));
                                }}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 mt-0.5 ${isIncluded ? "bg-blue-600" : "bg-gray-300"}`}
                              >
                                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isIncluded ? "translate-x-5" : "translate-x-1"}`} />
                              </button>
                              <input
                                type="text"
                                value={featureName}
                                onChange={(e) => {
                                  const updated = [...features];
                                  updated[idx] = { ...updated[idx], name: e.target.value };
                                  setPackages(packages.map(p => p.id === pkg.id ? { ...p, features: updated } : p));
                                }}
                                className={`flex-1 text-[14px] leading-relaxed bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none ${pkg.isPopular ? "text-white" : "text-gray-700"}`}
                              />
                              <button
                                onClick={() => {
                                  const updated = features.filter((_, i) => i !== idx);
                                  setPackages(packages.map(p => p.id === pkg.id ? { ...p, features: updated } : p));
                                }}
                                className="text-red-500 hover:text-red-700 flex-shrink-0"
                              >
                                <X size={16} />
                              </button>
                            </>
                          ) : (
                            <>
                              {pkg.isPopular && (
                                <div
                                  className={`flex-shrink-0 mt-0.5 rounded-full flex items-center justify-center ${pkg.isPopular ? "bg-white" : "bg-gray-900"}`}
                                  style={{ width: '18px', height: '18px', minWidth: '18px' }}
                                >
                                  <Check
                                    className={pkg.isPopular ? "text-gray-900" : "text-white"}
                                    size={12}
                                    strokeWidth={3}
                                  />
                                </div>
                              ) ||
                                <Check
                                  className={"text-gray-900 "}
                                  size={12}
                                  strokeWidth={3}
                                />
                              }
                              <span className={`text-[14px] leading-relaxed ${pkg.isPopular ? "text-white" : "text-gray-700"}`}>
                                {featureName}
                              </span>
                            </>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Package Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">

            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Add New Package</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">

              {/* Package Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Package Name</label>
                <input
                  type="text"
                  value={newPackage.name}
                  onChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    })
                  }
                  className="w-full px-4 py-2 bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Premium"
                />
              </div>

              {/* Price */}
              <div className="flex items-center justify-center">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Price</label>
                <input
                  type="number"
                  value={newPackage.price}
                  onChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
                <label className="block text-sm font-semibold text-gray-800 mb-2">early</label>
                <input
                  type="number"
                  value={newPackage.price}
                  onChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Currency</label>
                <select
                  value={newPackage.currency}
                  onChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      currency: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>

              {/* Popular Toggle */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPackage.isPopular}
                    onChange={(e) =>
                      setNewPackage({
                        ...newPackage,
                        isPopular: e.target.checked,
                      })
                    }
                    className="w-4 h-4 border-gray-400 text-blue-600 rounded"
                  />
                  <span className="text-sm font-semibold text-gray-800">Mark as Popular</span>
                </label>
              </div>

              {/* Bottom Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    const packageToAdd = { ...newPackage, id: Date.now().toString() };
                    setPackages([...packages, packageToAdd]);
                    setShowAddModal(false);
                    setNewPackage({
                      id: "",
                      name: "",
                      slug: "",
                      price: 0,
                      currency: "USD",
                      features: [{ name: "Feature 1", included: true }],
                      isPopular: false,
                      isActive: true,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                    });
                  }}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Package
                </button>

                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}