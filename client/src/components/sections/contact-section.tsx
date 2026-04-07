import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { insertInquirySchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Extend the inquiry schema with validation rules
const contactFormSchema = insertInquirySchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  company: z.string().optional().or(z.literal("")),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      industry: "",
      message: "",
      consent: false
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Remove consent field as it's not part of the backend schema
      const { consent, ...inquiryData } = data;

      await apiRequest("/api/inquiries", { method: "POST", body: JSON.stringify(inquiryData), headers: { "Content-Type": "application/json" }, credentials: "include" }); // ✅ 2 arguments

      toast({
        title: "Request submitted",
        description: "We'll be in touch with you shortly!",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-24 bg-gradient-to-b from-neutral-light/30 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-20 left-[10%] w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-40 right-[5%] w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full border border-primary/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:sticky lg:top-24"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="space-y-8">
                <div className="group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-primary group-hover:bg-primary/20 transition-all">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-lg text-primary-dark">Office Location</h4>
                  </div>
                  <p className="text-neutral-dark/80 pl-14">Near Flyover, Avinashi Road, Coimbatore-641018</p>
                </div>

                <div className="group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-primary group-hover:bg-primary/20 transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-lg text-primary-dark">Phone</h4>
                  </div>
                  <p className="text-neutral-dark/80 pl-14">+91-9087695972</p>
                </div>

                <div className="group">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-primary group-hover:bg-primary/20 transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-lg text-primary-dark">Email</h4>
                  </div>
                  <a
                    href="mailto:teams@privacyweave.in"
                    className="pl-14 hover:underline text-blue-700"
                  >
                    teams@privacyweave.in
                  </a>
                </div>

              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-lg text-primary-dark mb-4">Follow Us</h4>
                <div className="flex items-center space-x-3">
                  <a
                    href="https://www.linkedin.com/company/privacyweave/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-all text-primary"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/privacyweave/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    LinkedIn
                  </a>

                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Abstract decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none"></div>

              <h3 className="text-2xl font-bold text-blue-900 mb-8">Request a Demo</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-900 font-medium">First Name <span className="text-primary">*</span></FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="rounded-md border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary py-2 text-blue-900 placeholder:text-blue-900/80"
                              placeholder="Enter your first name"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-900 font-medium">Last Name <span className="text-primary">*</span></FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="rounded-md border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary py-2 text-blue-900 placeholder:text-blue-900/80"
                              placeholder="Enter your last name"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-900 font-medium">Email <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            className="rounded-md border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary py-2 text-blue-900 placeholder:text-blue-900/80"
                            placeholder="Enter your business email"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-900 font-medium">Company Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-md border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary py-2 text-blue-900 placeholder:text-blue-900/80"
                            placeholder="Enter your company name"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-900 font-medium">Industry <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                          <select
                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-blue-900"
                            {...field}
                          >
                            <option value="" disabled>Select your industry</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="finance">Finance</option>
                            <option value="technology">Technology</option>
                            <option value="retail">Retail</option>
                            <option value="education">Education</option>
                            <option value="other">Other</option>
                          </select>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-blue-900 font-medium">How can we help you? <span className="text-primary">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            {...field}
                            className="rounded-md border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary resize-none text-blue-900 placeholder:text-blue-900/80"
                            placeholder="Tell us about your privacy automation needs"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-blue-900">
                            I consent to PrivacyWeave processing my data for the purpose of contacting me about products and services. <span className="text-primary">*</span>
                          </FormLabel>
                          <FormMessage className="text-red-500" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 rounded-md font-medium py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Request Demo"}
                  </Button>
                  <p className="mt-2 text-sm text-gray-600">
                    Contact us with the mail regarding the demo:{" "}
                    <a href="mailto:connect@privacyweave.in" className="text-blue-600 hover:underline">
                      connect@privacyweave.in
                    </a>
                  </p>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
