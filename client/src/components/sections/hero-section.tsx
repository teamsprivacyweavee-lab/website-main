import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="bg-gradient-to-b from-black to-[#070752] relative overflow-hidden min-h-screen">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-[5%] w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full border border-blue-400/20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 rounded-full border border-purple-400/20"></div>
      </div>

      {/* Integrated Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-blue-400">Privacy</span>
                <span className="text-white"> Weave</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-white/90 hover:bg-blue-600/30 font-medium flex items-center gap-1 rounded-md">
                    Products
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[360px] p-1 bg-slate-800 border border-white/10 shadow-md rounded-md overflow-hidden">
                  <DropdownMenuItem asChild className="rounded-md p-3 hover:bg-blue-600/30 data-[highlighted]:bg-blue-600/30 data-[highlighted]:text-white text-white cursor-pointer items-start flex-col gap-0 text-left">
                    <Link href="/products/ai-scanner" className="block w-full">
                      <div className="text-sm font-semibold leading-tight">AI Security Scanner</div>
                      <div className="text-xs text-white/70 mt-1 leading-snug whitespace-normal">Detect and block prompt injection, data exfiltration, and social engineering all in real-time</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-md p-3 hover:bg-blue-600/30 data-[highlighted]:bg-blue-600/30 data-[highlighted]:text-white text-white cursor-pointer items-start flex-col gap-0 text-left">
                    <Link href="/products/protection-shield" className="block w-full">
                      <div className="text-sm font-semibold leading-tight">Real‑Time Protection Shield</div>
                      <div className="text-xs text-white/70 mt-1 leading-snug whitespace-normal">Your AI guard that never sleeps, never leaks</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-md p-3 hover:bg-blue-600/30 data-[highlighted]:bg-blue-600/30 data-[highlighted]:text-white text-white cursor-pointer items-start flex-col gap-0 text-left">
                    <Link href="/products/supply-chain" className="block w-full">
                      <div className="text-sm font-semibold leading-tight">AI to AI Supply Chain</div>
                      <div className="text-xs text-white/70 mt-1 leading-snug whitespace-normal">Know every API, plugin, and service touching your data.</div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/use-cases">
                <Button variant="ghost" className="text-white hover:text-white/90 hover:bg-blue-600/30 font-medium rounded-md">
                  Use Cases
                </Button>
              </Link>

              <Link href="/about">
                <Button variant="ghost" className="text-white hover:text-white/90 hover:bg-blue-600/30 font-medium rounded-md">
                  About Us
                </Button>
              </Link>

              {/* Resources Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-white/90 hover:bg-blue-600/30 font-medium flex items-center gap-1 rounded-md">
                    Resources
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-1 bg-slate-800 border border-white/10 shadow-md rounded-md overflow-hidden">
                  <DropdownMenuItem asChild className="rounded-md p-2 hover:bg-slate-700 text-white cursor-pointer">
                    <Link href="/blog">Blog</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Try for Free →
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white"
              >
                <Menu size={24} />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="lg:hidden mt-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="space-y-2">
                <Link href="/products" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-white justify-start">Products</Button>
                </Link>
                <Link href="/use-cases" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-white justify-start">Use Cases</Button>
                </Link>
                <Link href="/about" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-white justify-start">About Us</Button>
                </Link>
                {/* Resources item for mobile */}
                <Link href="/blog" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-white justify-start">Resources · Blog</Button>
                </Link>
                <div className="pt-2">
                  <Link href="/contact" onClick={() => setMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="bg-white text-white hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Try for Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-32 pb-10 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-blue-400 rounded-full text-sm font-medium mb-8 gap-2 border border-white/20">

              <span>Smart Privacy. Smarter Business.</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
              Every AI system is one prompt {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
                away from catastrophic leak
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
              Privacy Weave is the intelligent privacy infrastructure that keeps your AI secure, compliant, and trustworthy.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 border-2 border-white bg-white/25 text-white backdrop-blur-sm rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/35 shadow-[0_0_22px_rgba(196,181,253,0.55)] hover:shadow-[0_0_34px_rgba(196,181,253,0.75)]"
                >
                  Try for Free
                </Button>
              </Link>
              <Link href="/use-cases">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 border-2 border-white bg-white/20 text-white backdrop-blur-sm rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/30"
                >
                  Use Cases
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
