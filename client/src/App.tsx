import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import ContactPage from "@/pages/contact-page";
import CareersPage from "@/pages/careers-page";
import ApplyJobPage from "@/pages/apply-job";
import ApplyInternshipPage from "@/pages/apply-internship";
import AboutPage from "@/pages/about-page";
import AdminDashboard from "@/pages/admin-dashboard";
import CookiePolicy from "@/pages/cookie-policy";
import PrivacyPolicy from "@/pages/privacy-policy";
import UseCasesPage from "@/pages/use-case";
import BlogPage from "@/pages/blog-page";
import BlogPostPrivacyWeave from "@/pages/blog-post-privacyweave";
import BlogPostDLPIAM from "@/pages/blog-post-dlp-iam";
import BlogPostQuantumPrivacy from "@/pages/blog-post-quantum-privacy";
import BlogPostDataPrivacy2025 from "@/pages/blog-post-data-privacy-2025";
import FeaturePage from "@/pages/feature-page";
import BlogPostAIConsent from "@/pages/blog-post-ai-consent";
import BlogPostResponsibleAIPrivacy from "@/pages/blog-post-responsible-ai-privacy";
import BlogPostZeroTrustEncryption from "@/pages/blog-post-zero-trust-encryption";
import BlogPostRealTimeMasking from "@/pages/blog-post-real-time-masking";
import BlogPostComplianceByDesign from "@/pages/blog-post-compliance-by-design";
import BlogPostPrivacyByDesign from "@/pages/blog-post-privacy-by-design";
import ProductsIndex from "@/pages/products";
import AIScannerPage from "@/pages/products/ai-scanner";
import ProtectionShieldPage from "@/pages/products/protection-shield";
import SupplyChainPage from "@/pages/products/supply-chain";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import Footer from "./components/layout/footer";
import { ChatInterface } from "./components/chat/chat-interface";
// removed corner logo per request
import { CookieBanner } from "./components/cookie-banner";
import Feedback from "@/pages/Feedback"; // ✅ Import Feedback component

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/use-cases" component={UseCasesPage} />
      <Route path="/careers" component={CareersPage} />
      <Route path="/careers/apply/:id" component={ApplyJobPage} />
      <Route path="/careers/apply-internship" component={ApplyInternshipPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/feedback" component={Feedback} /> {/* ✅ New Feedback route */}
      <Route path="/feature" component={FeaturePage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/beyond-encryption-privacyweave" component={BlogPostPrivacyWeave} />
      <Route path="/blog/dlp-iam-security-blindspot" component={BlogPostDLPIAM} />
      <Route path="/blog/quantum-enhanced-ai-privacy" component={BlogPostQuantumPrivacy} />
      <Route path="/blog/understanding-data-privacy-2025" component={BlogPostDataPrivacy2025} />
      <Route path="/blog/ai-consent-automation" component={BlogPostAIConsent} />
      <Route path="/blog/responsible-ai-privacy" component={BlogPostResponsibleAIPrivacy} />
      <Route path="/blog/zero-trust-encryption" component={BlogPostZeroTrustEncryption} />
      <Route path="/blog/real-time-data-masking" component={BlogPostRealTimeMasking} />
      <Route path="/blog/compliance-by-design" component={BlogPostComplianceByDesign} />
      <Route path="/blog/privacy-by-design" component={BlogPostPrivacyByDesign} />
      <Route path="/products" component={ProductsIndex} />
      <Route path="/products/ai-scanner" component={AIScannerPage} />
      <Route path="/products/protection-shield" component={ProtectionShieldPage} />
      <Route path="/products/supply-chain" component={SupplyChainPage} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const hideFooter = [
    "/products/ai-scanner",
    "/products/protection-shield",
    "/products/supply-chain",
    "/use-cases",
  ].some((path) => location.startsWith(path));
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex flex-col min-h-screen relative">
          <main className="flex-grow relative z-10">
            <Router />
          </main>
          {!hideFooter && <Footer />}
          <ChatInterface />
          <CookieBanner />
        </div>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;