import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { JobListing } from "@shared/schema";
import { Loader2 } from "lucide-react";

const CareerSection = () => {
  const { data: jobListings, isLoading } = useQuery<JobListing[]>({
    queryKey: ["/api/job-listings"],
  });

  return (
    <section className="py-20 bg-gradient-to-r from-white via-gray-50 to-white text-[#0a2c5a]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a2c5a]">Explore Opportunities</h2>
          <p className="text-lg text-[#0a2c5a] max-w-3xl mx-auto">
            We're building a team of passionate professionals dedicated to creating cutting-edge privacy solutions. If you're excited about data privacy and AI, we want to hear from you.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#578FCA]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 data-governance" style={{ color: "#578FCA" }}>
            {jobListings && jobListings.slice(0, 2).map((job, index) => (
              <motion.div
                key={job.id}
                className="bg-[#578FCA]/5 backdrop-blur-sm rounded-xl p-8 border border-[#578FCA]/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4 text-[#0a2c5a]">
                  {index === 0 ? "Encryption and Cybersecurity Specialist (0-1 Year Experience)" : "Full Stack Developer (0-1 Year Experience)"}
                </h3>
                <p className="mb-6 text-[#578FCA]">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#578FCA]/20 text-[#578FCA] text-sm">Full-time</span>
                  <span className="px-3 py-1 rounded-full bg-[#578FCA]/20 text-[#578FCA] text-sm">Remote</span>
                  <span className="px-3 py-1 rounded-full bg-[#578FCA]/20 text-[#578FCA] text-sm">0-1 year</span>
                </div>
                <Link href={`/careers/apply/${job.id}`} className="text-[#578FCA] inline-flex items-center font-medium">
                  Apply Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/careers">
            <Button variant="outline" className="border-2 border-[#578FCA] text-[#578FCA] hover:bg-[#578FCA]/10 hover:border-[#578FCA] transition-all">
              View All Openings
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerSection;
