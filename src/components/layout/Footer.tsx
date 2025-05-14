
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-safespeak-primary" />
              <span className="ml-2 text-lg font-bold text-safespeak-dark">
                Safe<span className="text-safespeak-primary">Speak</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              SafeSpeak provides a safe, anonymous space to report sensitive issues and receive support from verified helpers.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/helpline" className="text-sm text-gray-500 hover:text-safespeak-primary">
                  Emergency Contacts
                </Link>
              </li>
              <li>
                <Link to="/helpline" className="text-sm text-gray-500 hover:text-safespeak-primary">
                  Legal Resources
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-safespeak-primary">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-safespeak-primary">
                  Community Rules
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-safespeak-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-safespeak-primary">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-safespeak-primary">
                  Anonymity Protection
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-safespeak-primary">
                  Data Security
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} SafeSpeak. All rights reserved. Made with <Heart className="inline h-4 w-4 text-red-500" /> for safety.
          </p>
          <p className="text-xs text-gray-400 text-center mt-4">
            <ExternalLink className="inline h-3 w-3 mr-1" />
            In an emergency, always contact your local emergency services directly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
