import { Link } from "wouter";
import { Mail, Phone } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import Logo from "@/components/logo";
import { CookieConsentManager } from "@/components/cookie-consent-manager";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold">
                <span className="text-blue-400">Privacy</span>
                <span className="text-white"> Weave</span>
              </span>
            </Link>
            <p className="mb-6 text-gray-300 font-light">
              Empowering organizations with AI-driven privacy automation solutions to protect data and maintain compliance.
            </p>
            <div className="mb-6 flex flex-col space-y-3">
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center mr-3 transition-all group-hover:bg-white/20">
                  <Mail className="text-white" size={16} />
                </div>
                <a href="mailto:teams@privacyweave.in" className="text-gray-300 hover:text-white transition-all">
                  teams@privacyweave.in
                </a>
              </div>
              <div className="flex items-center group">
                <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center mr-3 transition-all group-hover:bg-white/20">
                  <Phone className="text-white" size={16} />
                </div>
                <a href="tel:+919087695972" className="text-gray-300 hover:text-white transition-all">
                  +91-9087695972
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a href="https://www.linkedin.com/company/privacyweave/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://www.linkedin.com/company/privacyweave/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/90 transition-colors">LinkedIn</a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Resources</h3>
            <ul className="space-y-4">
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Whitepapers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="relative my-12">
          <div className="absolute left-0 right-0 h-px bg-white/20"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-gray-400 text-sm font-light">© 2025 PrivacyWeave. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 items-center">
            <a href="/privacy-policy" className="text-gray-400 text-sm hover:text-white transition-all">Privacy Policy</a>
            <a href="/cookie-policy" className="text-gray-400 text-sm hover:text-white transition-all">Cookie Policy</a>
            <CookieConsentManager />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
