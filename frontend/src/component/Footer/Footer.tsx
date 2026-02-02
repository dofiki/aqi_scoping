import React from "react";
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaWind } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800/50 bg-black/50 backdrop-blur-sm mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaWind className="-rotate-180 text-white" />
              <span className="text-xl font-semibold text-white">
                AQI Scoping
              </span>
            </div>
            <p className="text-white/50  text-sm leading-relaxed">
              Empowering individuals to breathe aware and live better through
              real-time air quality monitoring.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#why-aqi"
                  className="text-white/50  hover:text-hover transition-colors text-sm"
                >
                  Why AQI Matters
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-helps"
                  className="text-white/50 ext-gray-400 hover:text-hover transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/50  hover:text-hover transition-colors text-sm"
                >
                  AQI Scale Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-white/50  hover:text-hover transition-colors text-sm"
                >
                  My Tracks
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-white/50  hover:text-hover transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/dofiki/aqi_scoping"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaGithub
                  className="text-gray-400 hover:text-white transition-colors"
                  size={20}
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaTwitter
                  className="text-gray-400 hover:text-white transition-colors"
                  size={20}
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaLinkedin
                  className="text-gray-400 hover:text-white transition-colors"
                  size={20}
                />
              </a>
            </div>
            <a
              href="mailto:support@aqiscoping.com"
              className="flex items-center gap-2 text-white/50  hover:text-hover transition-colors text-sm"
            >
              <MdEmail size={18} />
              aqiscoping@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} AQI Scoping. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
