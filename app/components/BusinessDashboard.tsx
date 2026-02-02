'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface MetricData {
    label: string;
    value: number;
}

interface DonutSegment {
    label: string;
    value: number;
    color: string;
}

const BusinessDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('project');

    const tabs = [
        { id: 'project', label: 'Project Management' },
        { id: 'team', label: 'Team Collaboration' },
        { id: 'analytics', label: 'Advanced Analytics' },
        { id: 'crm', label: 'CRM & Customer Support' }
    ];

    const barData: MetricData[] = [
        { label: 'Jan', value: 28 },
        { label: 'Feb', value: 42 },
        { label: 'Mar', value: 35 },
        { label: 'Apr', value: 52 }
    ];

    const donutData: DonutSegment[] = [
        { label: 'Active', value: 45, color: '#FFD93D' },
        { label: 'Completed', value: 30, color: '#1E40AF' },
        { label: 'Pending', value: 25, color: '#E5E7EB' }
    ];

    const maxValue = Math.max(...barData.map(d => d.value));

    const getDonutPath = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (endAngle - 90) * Math.PI / 180;

        const x1 = 50 + outerRadius * Math.cos(startRad);
        const y1 = 50 + outerRadius * Math.sin(startRad);
        const x2 = 50 + outerRadius * Math.cos(endRad);
        const y2 = 50 + outerRadius * Math.sin(endRad);
        const x3 = 50 + innerRadius * Math.cos(endRad);
        const y3 = 50 + innerRadius * Math.sin(endRad);
        const x4 = 50 + innerRadius * Math.cos(startRad);
        const y4 = 50 + innerRadius * Math.sin(startRad);

        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
    };

    let currentAngle = 0;
    const totalValue = donutData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="min-h-screen bg-white p-8 font-display">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4 px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm">
                        <span className="text-xs font-medium text-gray-600 tracking-wide">NEXT ESSENTIAL</span>
                    </div>
                    <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-800 mb-2 leading-tight">
                        Everything You Need to Run and<br />Scale Your Business
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'text-blue-500 border-b-2 border-blue-500'
                                    : 'text-gray-600 hover:bg-white/60'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Card */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-50 to-pink-100">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                        <div className="absolute top-10 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 left-10 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl"></div>
                    </div>

                    <div className="p-12 grid md:grid-cols-2 gap-12 items-center relative">
                        {/* Left Section - Content */}
                        <div className="text-black w-full h-full min-h-[400px] flex flex-col justify-center">
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                                    </svg>
                                </div>
                                <h1 className="font-display text-4xl font-bold text-gray-800 mb-4 leading-tight">Team Collaboration</h1>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    Seamlessly connect your team through integrated chat, file sharing, and video conferencing tools. Work 365 days a year.
                                </p>
                                <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Right Section - Charts */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Bar Chart Card */}
                            <div
                                className="col-span-2 md:col-span-1 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50"
                                style={{ animation: 'pulse-glow 4s ease-in-out infinite' }}
                            >
                                <div className="flex items-end justify-between h-32 gap-3">
                                    <Image
                                        src="/barchart.jpg"
                                        alt="Team Collaboration"
                                        fill
                                        className="object-fill rounded-2xl"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Donut Chart Card */}
                            <div
                                className="col-span-2 md:col-span-1 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-2">
                                        <Image
                                            src="/donut-chart.jpg"
                                            alt="Team Collaboration"
                                            fill
                                            className="object-fill rounded-2xl"
                                            priority
                                        />
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

export default BusinessDashboard;