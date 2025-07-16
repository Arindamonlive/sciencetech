import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">

                {/* Social Media */}
                <div>
                    <h2 className="text-lg font-bold mb-2">Follow Us</h2>
                    <div className="flex justify-center md:justify-start gap-4">
                        <a href="https://www.facebook.com/ScienceTechAcademy7" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-500">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com/sciencetech.academy?fbclid=IwZXh0bgNhZW0CMTAAAR2WNhPaqeSlWMhtNElR3-3bRCYyrDEOOGuF_YdliX-8IHxuuyyLS3vGESw_aem_O7bD8FhBtoyCuxkWa1icnQ" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-500">
                            <FaInstagram />
                        </a>
                        <a href="https://www.youtube.com/@ScienceTech2022" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-red-500">
                            <FaYoutube />
                        </a>
                    </div>
                </div>

                {/* Google Map */}
                <div>
                    <h2 className="text-lg font-bold mb-2">Our Location</h2>
                    <iframe
                        title="Google Map"
                        className="w-full h-32 rounded-md"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.5767247909157!2d88.4088075!3d22.387173900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a026ddaf951ebe1%3A0x5bd9fe94429247d7!2sDakshin%20Gobindapur%20Rd%2C%20West%20Bengal%20700145!5e1!3m2!1sen!2sin!4v1742911495677!5m2!1sen!2sin"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Copyright */}
                <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-semibold mb-3 text-gray-300">© {new Date().getFullYear()} ScienceTech Academy</h2>

                    <p className="text-gray-400 flex items-center justify-center gap-2">
                        📧 <a href="mailto:academysciencetech4@gmail.com" className="hover:text-blue-400 transition">academysciencetech4@gmail.com</a>
                    </p>

                    <p className="text-gray-400 flex items-center justify-center gap-2 mt-1">
                        📞 <a href="tel:+918335043379" className="hover:text-blue-400 transition">+91-83350 43379</a>
                    </p>

                    <div className="mt-4">
                        <p className="text-gray-500">Created by
                            <a
                                href="https://rjrinfinity.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 font-semibold hover:underline ml-1"
                            >
                                R J R Infinity
                            </a>
                        </p>
                    </div>
                </div>


            </div>
        </footer>
    );
};

export default Footer;
