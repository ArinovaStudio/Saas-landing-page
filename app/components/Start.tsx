import { ArrowRight } from "lucide-react";

function Start() {
    return (
        <div className="max-w-5xl pt-35 mx-auto">
            <div className="text-center max-w-5xl mx-auto mb-16">

                <h1 className="text-7xl font-display leading-tight text-gray-900 mb-6 tracking-tight">
                    <span className="block whitespace-nowrap">Simplify Your Business Operations</span>
                    <span className="block pl-15 whitespace-nowrap">with One Powerful Platform</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 font-display mb-10 max-w-3xl mx-auto leading-relaxed">
                    Manage projects, collaborate with teams, track performance, and grow your<br className="sm:hidden" />
                    business — all in one cloud-based solution.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-full font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg w-full sm:w-auto min-w-[220px]">
                        Start Free Trial
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    <button className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-5 rounded-full font-bold border border-gray-200 shadow-sm transition-all w-full sm:w-auto min-w-[220px]">
                        Book a Demo
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Start;
