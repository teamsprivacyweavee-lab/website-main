import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
import VideoSection from "@/components/sections/video-section";
import ProductsSection from "@/components/sections/products-section";
import ComparisonSection from "@/components/sections/comparison-section";
import StatsSection from "@/components/sections/stats-section";
import StopBreachesSection from "@/components/sections/stop-breaches-section";
import AiMlSection from "@/components/sections/aiml-section";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <VideoSection />
      <AiMlSection />
      <FeaturesSection />
      <ProductsSection />
      <ComparisonSection />
      <StatsSection />
      <StopBreachesSection />
    </>
  );
};

export default HomePage;
