'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>
            {/* Navigation */}
            < nav
                className={`fixed top-0 left-0 right-0 z-500 transition-all duration-300 ${isScrolled ? ' backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white rounded" />
                            </div>
                            <span className="text-2xl font-semibold text-gray-900">
                                WorkNest
                            </span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-gray-900 hover:text-slate-900 transition-colors font-bold">
                                Home
                            </Link>
                            <a href="#features" className="text-gray-900 hover:text-slate-900 transition-colors font-bold cursor-pointer">
                                •   Features
                            </a>
                            <Link href="#pricing" className="text-gray-900 hover:text-slate-900 transition-colors font-bold">
                                •   Pricing
                            </Link>
                            <a href="#solutions" className="text-gray-900 hover:text-slate-900 transition-colors font-bold cursor-pointer">
                                •  Solutions
                            </a>
                            <a href="#contact" className="text-gray-900 hover:text-slate-900 transition-colors font-bold cursor-pointer">
                                •  Contact
                            </a>
                        </div>

                        <div className="flex items-center gap-6">
                            <button className="text-gray-900 hover:text-slate-900 transition-colors font-bold">
                                Login
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-full font-bold transition-all hover:shadow-lg hover:shadow-blue-600/30">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Header