
import React from "react";
import {
    FaExclamationTriangle,
    FaHome,
    FaArrowLeft,
    FaSearch
} from "react-icons/fa";

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-[#F3EEFF] flex items-center justify-center px-4 py-10">

            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-purple-100 p-8 md:p-12 text-center">

                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[#F0E9FF] rounded-full flex items-center justify-center">
                        <FaExclamationTriangle className="text-4xl text-violet-600" />
                    </div>
                </div>

                {/* 404 Number */}
                <h1 className="text-8xl md:text-9xl font-extrabold text-violet-600 tracking-wider">
                    404
                </h1>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-[#28134D] mt-5 mb-4">
                    Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-base md:text-lg leading-8 max-w-lg mx-auto mb-8">
                    Sorry, the page you are looking for doesn't exist,
                    may have been moved, or is temporarily unavailable.
                    Please check the URL or return to our homepage.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">

                    <Link
                        to="/"
                        className="flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-800 text-white px-7 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-300"
                    >
                        <FaHome />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-3 border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white px-7 py-3.5 rounded-xl font-semibold transition duration-300"
                    >
                        <FaArrowLeft />
                        Go Back
                    </button>

                </div>

                {/* Bottom Information */}
                <div className="border-t border-purple-100 mt-10 pt-6">
                    <p className="flex items-center justify-center gap-2 text-sm font-medium text-violet-700">
                        <FaSearch />
                        Lost? Let's get you back on track!
                    </p>
                </div>

            </div>

        </div>
    );
};

export default ErrorPage;
