'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    image: string;
}

const SupportTestimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const teamMembers = [
        { id: 1, image: '/face1.webp', name: 'Team Member 1', position: 'top-6 left-12' },
        { id: 2, image: '/face2.webp', name: 'Team Member 2', position: 'top-12 right-16' },
        { id: 3, image: '/face3.jpg', name: 'Team Member 3', position: '-top-105 -left-30' },
        { id: 4, image: '/face4.avif', name: 'Team Member 4', position: 'top-70 left-1/2 -translate-x-1/2' },
        { id: 5, image: '/face5.webp', name: 'Team Member 5', position: '-top-100 -right-10' },
        { id: 6, image: '/face1.webp', name: 'Team Member 6', position: '-top-40 -right-40' }
    ];

    const testimonials: Testimonial[] = [
        {
            id: 1,
            quote: "This platform streamlined our entire workflow. We saved hours every week and saw a 30% increase in team productivity.",
            author: "Sarah Walsh",
            role: "CEO, TechCorp",
            image: "/face1.webp"
        },
        {
            id: 2,
            quote: "Simple to set up, easy to use, and the customer support is quickly responsive!",
            author: "David Lewis",
            role: "Product Manager",
            image: "/face2.webp"
        },
        {
            id: 3,
            quote: "The best investment we made this year. Our team collaboration has never been better.",
            author: "Emily Chen",
            role: "Marketing Director",
            image: "/face3.jpg"
        }
    ];

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="min-h-screen">
            {/* Support Team Section */}
            <section className="relative h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-10 px-4">
                <div className="max-w-6xl mx-auto relative">
                    {/* Top Label */}
                    <div className="text-center mb-8">
                        <span className="inline-block text-xs font-semibold text-slate-500 uppercase tracking-widest">
                            OUR SUPPORT
                        </span>
                    </div>

                    {/* Main Heading */}
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                            Our caring support team<br />
                            are here for you
                        </h2>
                    </div>

                    {/* Team Members - Floating Images */}
                    <div className="relative h-100 mb-32">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className={`absolute ${member.position} transition-transform duration-300 hover:scale-110 hover:z-20`}
                            >
                                <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-full shadow-xl"></div>
                                    <div className="absolute inset-1 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gradient-to-b from-slate-50 to-white py-10 pt-50 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="mb-16">
                        <span className="inline-block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                            TESTIMONIAL
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900">
                            What Our Users<br />
                            Are Saying
                        </h2>
                    </div>

                    {/* Testimonials Carousel */}
                    <div className="relative">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Navigation Buttons */}
                            <div className="flex gap-4 order-2 md:order-1">
                                <button
                                    onClick={handlePrevious}
                                    className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="w-16 h-16 rounded-full bg-white border-2 border-slate-300 text-slate-700 flex items-center justify-center hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                                >
                                    <svg
                                        className="w-6 h-6"
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

                            {/* Testimonial Cards Carousel */}
                            <div className="relative order-1 md:order-2 min-h-[400px]">
                                <div className="relative">
                                    {testimonials.map((testimonial, index) => {
                                        const isActive = index === currentIndex;
                                        const isNext = index === (currentIndex + 1) % testimonials.length;

                                        return (
                                            <div
                                                key={testimonial.id}
                                                className={`
                absolute inset-0 transition-all duration-700 
                ${isActive ? "opacity-100 translate-x-0 z-20" : ""}
                ${isNext ? "opacity-70 translate-x-[80%] scale-95 z-10" : ""}
                ${!isActive && !isNext ? "opacity-0 translate-x-full pointer-events-none" : ""}
            `}
                                            >
                                                <div
                                                    className={`
                    rounded-3xl p-8 w-100 shadow-xl border transition-all duration-700
                    ${isActive ? "bg-orange-50/30 border-orange-100" : "bg-white/60 border-gray-100"}
                `}
                                                >
                                                    {/* Quote Icon */}
                                                    <div className="text-6xl text-gray-300 font-serif leading-none mb-4">"</div>

                                                    {/* Quote */}
                                                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                                                        {testimonial.quote}
                                                    </p>

                                                    {/* Author */}
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                                                            <Image src={testimonial.image} alt={testimonial.author} fill className="object-cover" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                                                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center md:justify-start gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'bg-blue-600 w-8'
                                        : 'bg-slate-300 hover:bg-slate-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SupportTestimonials;