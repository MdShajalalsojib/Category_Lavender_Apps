
import React from "react";
import {
    FaLeaf,
    FaHome,
    FaEnvelope,
    FaBriefcase,
    FaNewspaper,
    FaTwitter,
    FaYoutube,
    FaFacebookF,
    FaGithub,
    FaArrowRight
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-violet-100 via-white to-purple-100 text-gray-700 pt-16">

            <div className="max-w-7xl mx-auto px-6">

                <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-8 md:p-12">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* Logo & Description */}
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="bg-purple-100 p-3 rounded-2xl">
                                    <FaLeaf className="text-3xl text-purple-600" />
                                </div>

                                <h2 className="text-3xl font-extrabold text-purple-950">
                                    ACME
                                </h2>
                            </div>

                            <p className="text-gray-500 leading-7">
                                Innovating a Better Tomorrow. Building a smarter,
                                greener and more connected world through creativity
                                and technology.
                            </p>

                            <div className="flex gap-3 mt-6">
                                <a href="https://twitter.com" target="_blank" rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white transition">
                                    <FaTwitter />
                                </a>

                                <a href="https://youtube.com" target="_blank" rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white transition">
                                    <FaYoutube />
                                </a>

                                <a href="https://facebook.com" target="_blank" rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white transition">
                                    <FaFacebookF />
                                </a>

                                <a href="https://github.com" target="_blank" rel="noreferrer"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white transition">
                                    <FaGithub />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-bold text-purple-950 mb-6">
                                Quick Links
                            </h3>

                            <div className="w-12 h-1 bg-purple-600 rounded-full mb-6"></div>

                            <ul className="space-y-4">
                                <li>
                                    <a href="/" className="flex items-center gap-3 hover:text-purple-600 transition">
                                        <FaHome className="text-purple-600" /> Home
                                    </a>
                                </li>

                                <li>
                                    <a href="/about" className="flex items-center gap-3 hover:text-purple-600 transition">
                                        <FaLeaf className="text-purple-600" /> About Us
                                    </a>
                                </li>

                                <li>
                                    <a href="/contact" className="flex items-center gap-3 hover:text-purple-600 transition">
                                        <FaEnvelope className="text-purple-600" /> Contact
                                    </a>
                                </li>

                                <li>
                                    <a href="/jobs" className="flex items-center gap-3 hover:text-purple-600 transition">
                                        <FaBriefcase className="text-purple-600" /> Careers
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-xl font-bold text-purple-950 mb-6">
                                Our Services
                            </h3>

                            <div className="w-12 h-1 bg-purple-600 rounded-full mb-6"></div>

                            <ul className="space-y-4">
                                <li><a href="/web-design" className="hover:text-purple-600 transition">Web Design</a></li>
                                <li><a href="/development" className="hover:text-purple-600 transition">Web Development</a></li>
                                <li><a href="/ui-design" className="hover:text-purple-600 transition">UI/UX Design</a></li>
                                <li><a href="/support" className="hover:text-purple-600 transition">Technical Support</a></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-xl font-bold text-purple-950 mb-6">
                                Stay Connected
                            </h3>

                            <div className="w-12 h-1 bg-purple-600 rounded-full mb-6"></div>

                            <p className="text-gray-500 leading-7 mb-5">
                                Subscribe to our newsletter to get the latest updates.
                            </p>

                            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border border-purple-200 rounded-xl overflow-hidden bg-purple-50">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 bg-transparent outline-none min-w-0"
                                />

                                <button type="submit" className="bg-purple-600 text-white px-4 py-4 hover:bg-purple-800 transition">
                                    <FaArrowRight />
                                </button>
                            </form>
                        </div>

                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-purple-100 mt-12 pt-7 flex flex-col md:flex-row items-center justify-between gap-4">

                        <p className="text-sm text-gray-500 text-center">
                            © {new Date().getFullYear()} ACME Industries Ltd. All rights reserved.
                        </p>

                        <div className="flex gap-6 text-sm">
                            <a href="/privacy" className="hover:text-purple-600 transition">
                                Privacy Policy
                            </a>

                            <a href="/terms" className="hover:text-purple-600 transition">
                                Terms & Conditions
                            </a>
                        </div>

                    </div>

                </div>

                <div className="text-center py-6 text-sm text-purple-800">
                    Made with care for a better tomorrow.
                </div>

            </div>
        </footer>
    );
};

export default Footer;

