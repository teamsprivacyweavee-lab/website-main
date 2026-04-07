import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, Shield, Database, ClipboardCheck, FileSpreadsheet, BarChart, Key, Lock, Building, Briefcase, GraduationCap, ShieldAlert, Brain, Search, ShieldCheck, Network } from "lucide-react";
import Logo from "@/components/logo";

const Header = () => {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCornerLogo, setShowCornerLogo] = useState(true);

  // Check if we're on the homepage and control the corner logo visibility
  useEffect(() => {
    setShowCornerLogo(location === '/');
  }, [location]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-slate-900/95 text-white border-b border-white/10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Logo width={200} height={60} className="lg:w-[220px] lg:h-[65px] w-[200px] h-[55px] brightness-0 invert" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {/* Products Dropdown */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 py-2 font-medium text-white hover:text-white/90">
                  Products
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-0 bg-white border border-white/10 shadow-md rounded-md overflow-hidden">
                <div className="bg-[#4B4376] px-4 py-3 border-b border-white/10">
                  <span className="text-sm font-semibold text-white uppercase tracking-wide">AI Security Products</span>
                </div>

                <div className="grid p-2 gap-1">
                  <DropdownMenuItem asChild className="rounded-md p-2 hover:bg-[#FEF9F2]">
                    <Link href="/products/ai-scanner" className="flex items-start gap-3 cursor-pointer">
                      <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary">
                        <Search size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-primary">AI Security Scanner →</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Detect and block prompt injection, data exfiltration, and social engineering — all in real-time</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild className="rounded-md p-2 hover:bg-[#FEF9F2]">
                    <Link href="/products/protection-shield" className="flex items-start gap-3 cursor-pointer">
                      <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-primary">Real-Time Protection Shield →</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Your AI guard that never sleeps, never leaks</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild className="rounded-md p-2 hover:bg-[#FEF9F2]">
                    <Link href="/products/supply-chain" className="flex items-start gap-3 cursor-pointer">
                      <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary">
                        <Network size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-primary">AI TO AI Supply Chain</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Know every API, plugin, and service touching your data</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href="/use-cases">
            <Button variant="ghost" className="font-medium">Use Cases</Button>
          </Link>

          <Link href="/about">
            <Button
              variant="ghost"
              className={`font-medium ${isActive("/about") ? "text-primary" : ""}`}
            >
              About
            </Button>
          </Link>

          <Link href="/careers">
            <Button
              variant="ghost"
              className={`font-medium ${isActive("/careers") ? "text-primary" : ""}`}
            >
              Careers
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              variant="ghost"
              className={`font-medium text-white hover:text-white/90 ${isActive("/contact") ? "text-white" : ""}`}
            >
              Contact Us
            </Button>
          </Link>



        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/contact">
            <Button
              variant="outline"
              className="border-white border-2 text-white hover:bg-white hover:text-slate-900 rounded-full font-medium transition-all px-6 py-2"
            >
              Try for Free
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  className="bg-primary hover:bg-primary/80 text-[#f8fafc] font-medium rounded-md transition-colors"
                >
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 bg-white border border-primary/10 shadow-md rounded-md overflow-hidden">
                <div className="bg-[#789DBC] px-4 py-3 border-b border-primary/10">
                  <span className="text-sm font-semibold text-white uppercase tracking-wide">Account</span>
                </div>

                <div className="grid p-2 gap-1">
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild className="rounded-md p-2 hover:bg-[#FEF9F2]">
                      <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                        <div className="text-primary">
                          <Briefcase size={16} />
                        </div>
                        <div className="font-medium">Admin Dashboard</div>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-md p-2 hover:bg-[#FEF9F2] flex items-center gap-2 cursor-pointer"
                  >
                    <div className="text-primary">
                      <Lock size={16} />
                    </div>
                    <div className="font-medium">Logout</div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/80 text-[#f8fafc] font-medium rounded-md transition-colors"
              >
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="overflow-y-auto">
            <div className="flex justify-center mb-6 mt-4">
              <Logo width={180} height={60} />
            </div>
            <div className="flex flex-col gap-6">
              {/* Products Section - Styled like desktop dropdown */}
              <div className="space-y-3 border rounded-md overflow-hidden">
                <div className="bg-[#789DBC] px-4 py-3 border-b border-primary/10">
                  <span className="text-sm font-semibold text-white uppercase tracking-wide">Products</span>
                </div>

                <div className="p-3">
                  <Link href="/products/ai-scanner" onClick={() => setMenuOpen(false)} className="flex items-start gap-3 cursor-pointer p-2 rounded-md hover:bg-[#FEF9F2] mt-1">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary">
                      <Search size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-primary">AI Security Scanner →</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Detect and block prompt injection, data exfiltration, and social engineering — all in real-time</div>
                    </div>
                  </Link>

                  <Link href="/products/protection-shield" onClick={() => setMenuOpen(false)} className="flex items-start gap-3 cursor-pointer p-2 rounded-md hover:bg-[#FEF9F2] mt-1">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-primary">Real-Time Protection Shield →</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Your AI guard that never sleeps, never leaks</div>
                    </div>
                  </Link>

                  <Link href="/products/supply-chain" onClick={() => setMenuOpen(false)} className="flex items-start gap-3 cursor-pointer p-2 rounded-md hover:bg-[#FEF9F2] mt-1">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary">
                      <Network size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-primary">AI TO AI Supply Chain</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Know every API, plugin, and service touching your data</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Solutions Section - Styled like desktop dropdown */}
              <div className="space-y-3 border rounded-md overflow-hidden">
                <div className="bg-[#789DBC] px-4 py-3 border-b border-primary/10">
                  <span className="text-sm font-semibold text-white uppercase tracking-wide">Solutions</span>
                </div>

                <div className="p-3">
                  <div className="px-1 py-1 text-sm font-medium text-primary">By Industry</div>

                  <Link href="#" onClick={() => setMenuOpen(false)} className="flex items-start gap-3 cursor-pointer p-2 rounded-md hover:bg-[#FEF9F2] mt-1">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary">
                      <Building size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-primary">Healthcare</div>
                      <div className="text-xs text-muted-foreground mt-0.5">HIPAA-compliant privacy solutions</div>
                    </div>
                  </Link>

                  <Link href="#" onClick={() => setMenuOpen(false)} className="flex items-start gap-3 cursor-pointer p-2 rounded-md hover:bg-[#FEF9F2] mt-1">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary">
                      <Building size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-primary">Financial Services</div>
                      <div className="text-xs text-muted-foreground mt-0.5">PCI-DSS compliant solutions</div>
                    </div>
                  </Link>

                  <Link href="#" onClick={() => setMenuOpen(false)} className="flex items-start gap-3 cursor-pointer p-2 rounded-md hover:bg-[#FEF9F2] mt-1">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary">
                      <Building size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-primary">Retail & eCommerce</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Protect customer data</div>
                    </div>
                  </Link>

                  <div className="px-1 py-1 mt-3 text-sm font-medium text-primary">By Use Case</div>

                  <Link href="#" onClick={() => setMenuOpen(false)} className="flex items-start gap-3 cursor-pointer p-2 rounded-md hover:bg-[#FEF9F2] mt-1">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-primary">Regulatory Compliance</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Solutions for GDPR, DPDP Act, HIPAA</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Company Section - Styled like desktop dropdown */}
              <div className="space-y-3 border rounded-md overflow-hidden">
                <div className="bg-[#789DBC] px-4 py-3 border-b border-primary/10">
                  <span className="text-sm font-semibold text-white uppercase tracking-wide">Company</span>
                </div>

                <div className="p-3">
                  <Link href="/about" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-[#FEF9F2]">
                    <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                      <Building size={18} />
                    </div>
                    <div className="font-medium text-primary">About Us</div>
                  </Link>

                  <Link href="/careers" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-[#FEF9F2] mt-1">
                    <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                      <Briefcase size={18} />
                    </div>
                    <div className="font-medium text-primary">Careers</div>
                  </Link>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-white border-2 text-white hover:bg-white hover:text-slate-900 rounded-full font-medium transition-all"
                  >
                    Try for Free
                  </Button>
                </Link>

                {user ? (
                  <div className="space-y-3">
                    {user.role === 'admin' && (
                      <Link href="/admin" onClick={() => setMenuOpen(false)}>
                        <Button
                          variant="default"
                          className="w-full bg-primary hover:bg-primary/80 text-[#f8fafc] font-medium rounded-md transition-colors"
                        >
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="default"
                      className="w-full bg-primary hover:bg-primary/80 text-[#f8fafc] font-medium rounded-md transition-colors"
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/auth" onClick={() => setMenuOpen(false)}>
                    <Button
                      variant="default"
                      className="w-full bg-primary hover:bg-primary/80 text-[#f8fafc] font-medium rounded-md transition-colors"
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;