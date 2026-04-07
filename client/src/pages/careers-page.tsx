import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { JobListing } from "@shared/schema";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Clock, Briefcase, ArrowRight, Star, Zap, Users, Heart, GraduationCap, LightbulbIcon, BrainCircuit } from "lucide-react";
import InternFeedbackSection from "@/components/sections/intern-feedback-section";

const CareersPage = () => {
  const { data: jobs, isLoading } = useQuery<JobListing[]>({
    queryKey: ["/api/job-listings"],
  });

  return (
    <>
      {/* Hero section */}
      <section className="relative overflow-hidden bg-[#f8fafc] py-24 md:py-32">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 right-[10%] w-64 h-64 rounded-full bg-[#0a2c5a]/5 blur-2xl"></div>
          <div className="absolute -bottom-40 left-[5%] w-96 h-96 rounded-full bg-[#0a2c5a]/5 blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full border border-[#0a2c5a]/10"></div>
          <div className="absolute bottom-1/4 right-1/3 w-32 h-32 rounded-full border border-[#0a2c5a]/10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-[#0a2c5a]/10 rounded-full text-sm font-medium mb-6 gap-2">
              <div className="size-5 bg-[#0a2c5a] text-[#f8fafc] rounded-full flex items-center justify-center">
                <Star className="size-3" />
              </div>
              <span className="text-[#0a2c5a]">Join our team</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#0a2c5a]">
              Careers at PrivacyWeave
            </h1>

            <p className="text-xl text-[#0a2c5a]/90 max-w-2xl font-light leading-relaxed mb-10">
              Join our team of passionate professionals dedicated to transforming data privacy through AI and automation. Create meaningful impact in the world of data security.
            </p>

            <Button
              size="lg"
              className="bg-[#0a2c5a] text-[#f8fafc] hover:bg-[#0a2c5a]/90 px-8 py-6 rounded-md font-medium"
              onClick={() => {
                const element = document.getElementById('open-positions');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Open Positions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Internship Program Section */}
      <section className="py-20 bg-[#f0f4f8]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2c5a] mb-6">Internship Program</h2>
            <p className="text-lg text-[#0a2c5a]/80 max-w-3xl mx-auto font-light">
              Our internship program is designed to nurture fresh talent and provide real-world experience in data privacy and security technologies.
            </p>
            <div className="mt-8">
              <Link href="/careers/apply-internship">
                <Button size="lg" className="bg-[#0a2c5a] hover:bg-[#0a2c5a]/90 text-[#f8fafc] px-8 rounded-md font-medium">
                  Apply for Internship
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#0a2c5a]/10 flex items-center justify-center text-[#0a2c5a] mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2c5a] mb-3">Performance-Based Conversion</h3>
              <p className="text-[#0a2c5a]/80 font-light mb-4">
                Internships are not automatically converted to full-time positions. We evaluate performance, skills development, and team fit during the internship period to determine full-time opportunities.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#0a2c5a]/10 flex items-center justify-center text-[#0a2c5a] mb-5">
                <LightbulbIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2c5a] mb-3">Learning Environment</h3>
              <p className="text-[#0a2c5a]/80 font-light mb-4">
                We provide structured mentorship, hands-on projects with real impact, and regular feedback to help interns develop their technical and professional skills.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#0a2c5a]/10 flex items-center justify-center text-[#0a2c5a] mb-5">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2c5a] mb-3">Evaluation Criteria</h3>
              <p className="text-[#0a2c5a]/80 font-light mb-4">
                Interns are evaluated on technical proficiency, problem-solving ability, collaboration skills, initiative, and alignment with our company values.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-[#0a2c5a] mb-4">Internship Program Details</h3>
            <ul className="space-y-3 text-[#0a2c5a]/80">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#0a2c5a]/10 flex-shrink-0 flex items-center justify-center text-[#0a2c5a] mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#0a2c5a]"></div>
                </div>
                <span><span className="font-medium text-[#0a2c5a]">Duration:</span> Typically 3-6 months, with possible extension based on project needs and performance</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#0a2c5a]/10 flex-shrink-0 flex items-center justify-center text-[#0a2c5a] mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#0a2c5a]"></div>
                </div>
                <span><span className="font-medium text-[#0a2c5a]">Eligibility:</span> Students pursuing degrees in Computer Science, Cybersecurity, Data Science, or related fields</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#0a2c5a]/10 flex-shrink-0 flex items-center justify-center text-[#0a2c5a] mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#0a2c5a]"></div>
                </div>
                <span><span className="font-medium text-[#0a2c5a]">Compensation:</span> Competitive stipend based on qualifications and program structure</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#0a2c5a]/10 flex-shrink-0 flex items-center justify-center text-[#0a2c5a] mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#0a2c5a]"></div>
                </div>
                <span><span className="font-medium text-[#0a2c5a]">Working Model:</span> Flexible options including remote, hybrid, or in-office based on role requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#0a2c5a]/10 flex-shrink-0 flex items-center justify-center text-[#0a2c5a] mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#0a2c5a]"></div>
                </div>
                <span><span className="font-medium text-[#0a2c5a]">Application Process:</span> Resume screening, coding/technical assessment, and interview rounds</span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-[#0a2c5a] font-medium">
                At PrivacyWeave, we're committed to finding passionate individuals who demonstrate potential, regardless of experience level.
              </p>
              <Link href="/careers/apply-internship">
                <Button className="bg-[#0a2c5a] hover:bg-[#0a2c5a]/90 text-[#f8fafc] px-6 rounded-md font-medium">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intern Feedback Section */}
      <InternFeedbackSection />

      {/* Open positions section */}
      <section id="open-positions" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2c5a] mb-6">Open Positions</h2>
            <p className="text-lg text-[#0a2c5a]/80 max-w-3xl mx-auto font-light">
              We're looking for talented individuals who are passionate about data privacy and technology.
              Explore our current openings below.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#0a2c5a]" />
            </div>
          ) : jobs && jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-[#0a2c5a] mb-3 group-hover:text-[#1e5285] transition-all">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0a2c5a]/5 text-[#0a2c5a] text-sm">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{job.type}</span>
                        </div>
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0a2c5a]/5 text-[#0a2c5a] text-sm">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{job.location}</span>
                        </div>
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0a2c5a]/5 text-[#0a2c5a] text-sm">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{job.experience}</span>
                        </div>
                      </div>
                      <p className="mb-4 text-[#0a2c5a]/80 line-clamp-2">{job.description}</p>
                    </div>

                    <div className="md:flex-shrink-0">
                      <Link href={`/careers/apply/${job.id}`}>
                        <Button className="bg-[#0a2c5a] hover:bg-[#0a2c5a]/90 text-[#f8fafc] rounded-md font-medium px-8 w-full md:w-auto">
                          <span>Apply Now</span>
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-start gap-2">
                      <h4 className="font-semibold text-[#0a2c5a]">Requirements:</h4>
                      <p className="text-[#0a2c5a]/80 font-light">{job.requirements}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100 max-w-2xl mx-auto">
              <div className="bg-[#0a2c5a]/10 size-20 rounded-full flex items-center justify-center text-[#0a2c5a] mx-auto mb-6">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-[#0a2c5a] mb-2">No Open Positions</h3>
              <p className="text-[#0a2c5a]/80">We don't have any open positions at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why work with us section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#f0f4f8] relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#0a2c5a]/5 blur-3xl"></div>
          <div className="absolute bottom-10 left-[5%] w-80 h-80 rounded-full bg-[#0a2c5a]/5 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a2c5a]/10 to-[#1e5285]/10 blur-3xl opacity-30 -z-10 rounded-full transform translate-x-10"></div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a2c5a]/20 to-transparent mix-blend-overlay z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-auto object-cover"
                />

                {/* Floating elements */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 z-20">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[#0a2c5a] flex items-center justify-center text-[#f8fafc] text-xs">JD</div>
                      <div className="w-8 h-8 rounded-full bg-[#1e5285] flex items-center justify-center text-[#f8fafc] text-xs">KM</div>
                      <div className="w-8 h-8 rounded-full bg-[#3a86ff] flex items-center justify-center text-[#f8fafc] text-xs">TS</div>
                    </div>
                    <span className="text-sm font-medium text-[#0a2c5a]">Team collaboration</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2c5a] mb-8">Why Work With Us?</h2>
              <div className="space-y-8">
                <div className="group">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0a2c5a]/10 flex items-center justify-center text-[#0a2c5a] group-hover:bg-[#0a2c5a]/20 transition-all">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0a2c5a] mb-2 group-hover:text-[#1e5285] transition-all">Cutting-Edge Technology</h3>
                      <p className="text-[#0a2c5a]/80 font-light">Work with the latest AI and machine learning technologies to solve real-world privacy challenges.</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0a2c5a]/10 flex items-center justify-center text-[#0a2c5a] group-hover:bg-[#0a2c5a]/20 transition-all">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0a2c5a] mb-2 group-hover:text-[#1e5285] transition-all">Growth Opportunities</h3>
                      <p className="text-[#0a2c5a]/80 font-light">Continuous learning and development paths to advance your career and skills.</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0a2c5a]/10 flex items-center justify-center text-[#0a2c5a] group-hover:bg-[#0a2c5a]/20 transition-all">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0a2c5a] mb-2 group-hover:text-[#1e5285] transition-all">Meaningful Impact</h3>
                      <p className="text-[#0a2c5a]/80 font-light">Make a difference by protecting sensitive data and helping organizations maintain privacy compliance.</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[#0a2c5a]/10 flex items-center justify-center text-[#0a2c5a] group-hover:bg-[#0a2c5a]/20 transition-all">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0a2c5a] mb-2 group-hover:text-[#1e5285] transition-all">Great Benefits</h3>
                      <p className="text-[#0a2c5a]/80 font-light">Competitive salary, flexible work options, health benefits, and more.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Button
                  size="lg"
                  className="bg-[#0a2c5a] hover:bg-[#0a2c5a]/90 text-[#f8fafc] px-8 rounded-md font-medium"
                  onClick={() => {
                    const element = document.getElementById('open-positions');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Open Positions
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareersPage;