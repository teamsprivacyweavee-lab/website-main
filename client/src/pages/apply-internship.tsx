import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
// import { apiRequest } from "@/lib/queryClient"; // Not used, can remove
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { jobApplicationWithResumeSchema } from "@shared/schema"; // We'll use a more specific one
import { Checkbox } from "@/components/ui/checkbox";

// Define the frontend schema for internship application form
// This schema expects 'resumeLink' as it's more user-friendly for a link input
const internshipApplicationFrontendSchema = jobApplicationWithResumeSchema.extend({
  applicationType: z.literal("internship").default("internship"),
  education: z.string().min(1, "Education field is required"),
  university: z.string().min(1, "University/College is required"),
  graduationYear: z.string().min(1, "Expected graduation year is required"),
  availabilityDate: z.string().min(1, "Availability date is required"),
});

const gradYearOptions = Array.from({ length: 6 }, (_, i) => {
  const year = new Date().getFullYear() + i;
  return { value: year.toString(), label: year.toString() };
});

const educationLevelOptions = [
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Bachelor's Degree", label: "Bachelor's Degree" },
  { value: "Master's Degree", label: "Master's Degree" },
  { value: "PhD", label: "PhD" },
  { value: "Other", label: "Other" }
];

type ApplyInternshipFormValues = z.infer<typeof internshipApplicationFrontendSchema>;

export default function ApplyInternshipPage() {
  const [, setLocation] = useLocation();
  // const params = useParams<{ id?: string }>(); // Not used, can remove if not needed
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  const form = useForm<ApplyInternshipFormValues>({
    resolver: zodResolver(internshipApplicationFrontendSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: "Internship Position", // Default position for internships
      experience: "", // Can be optional or specific e.g. "No prior professional experience"
      message: "",
      resumeLink: "", // Changed from resumeFile
      education: "",
      university: "",
      graduationYear: "",
      availabilityDate: "",
      applicationType: "internship"
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ApplyInternshipFormValues) => {
      // Prepare payload for the backend
      // The backend expects 'resumePath'
      const payload = {
        ...data,
        resumePath: data.resumeLink, // Map resumeLink to resumePath
      };
      // Remove resumeLink as it's now mapped to resumePath
      // delete (payload as any).resumeLink; // Or create a new object without it

      // More explicit payload construction:
      const backendPayload = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        experience: data.experience,
        message: data.message,
        resumePath: data.resumeLink, // Key change for backend
        applicationType: data.applicationType,
        education: data.education,
        university: data.university,
        graduationYear: data.graduationYear,
        availabilityDate: data.availabilityDate,
      };

      const response = await fetch('/api/job-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendPayload), // Send JSON
        // credentials: 'include' // Only if your API requires cookies for auth and is on a different domain/subdomain
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `${response.status}: Failed to submit application`);
      }

      return await response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      window.scrollTo(0, 0);
    },
    onError: (error: Error) => {
      // You might want to use a toast notification here
      console.error('Error submitting internship application:', error);
      alert(`Submission failed: ${error.message}`); // Simple alert for now
    }
  });

  // RHF's handleSubmit will prevent default and call this with validated data
  const onSubmit = (data: ApplyInternshipFormValues) => {
    // mutation.mutate(data) is asynchronous but we don't need to await it here
    // as useMutation handles the async flow and updates state (isPending, isError, etc.)
    mutation.mutate(data);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-xl mx-auto text-center bg-white p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="size-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
              <CheckCircle className="size-10" />
            </div>
            <h1 className="text-3xl font-bold text-[#0a2c5a] mb-4">Application Submitted!</h1>
            <p className="text-lg text-[#0a2c5a]/80 mb-6">
              Thank you for applying for our internship program. We've received your application and will review it shortly.
            </p>
            <div className="space-y-3 text-left bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-[#0a2c5a] flex-shrink-0" />
                <p className="text-[#0a2c5a]">Please note that internships are not automatically converted to full-time positions.</p>
              </div>
              <p className="text-[#0a2c5a]/80 text-sm">
                We evaluate performance, skills development, and team fit during the internship period to determine possible full-time opportunities.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                onClick={() => setLocation('/')}
                className="bg-[#0a2c5a] hover:bg-[#0a2c5a]/90 text-white"
              >
                Return to Home
              </Button>
              <Button
                onClick={() => setLocation('/careers')}
                variant="outline"
                className="border-[#0a2c5a] text-[#0a2c5a]"
              >
                View More Opportunities
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant="ghost"
              className="text-[#0a2c5a] hover:bg-[#0a2c5a]/5"
              onClick={() => setLocation('/careers')}
            >
              ← Back to Careers
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
            <h1 className="text-3xl font-bold text-[#0a2c5a] mb-2">Apply for Internship Program</h1>
            <p className="text-[#0a2c5a]/80 mb-8">
              Please complete the form below to apply for our internship program. All fields marked with an asterisk (*) are required.
            </p>

            <Form {...form}>
              {/*
                The form.handleSubmit(onSubmit) correctly calls your onSubmit function.
                The issue with the button not working was likely due to how mutation.mutateAsync
                was handled or if there were unhandled errors stopping the process.
                Using mutation.mutate() is often simpler for form submissions.
              */}
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0a2c5a]">Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0a2c5a]">Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0a2c5a]">Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Experience */}
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0a2c5a]">Relevant Experience *</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., academic projects, any skills" {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Education Level */}
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0a2c5a]">Education Level *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value} // Or value={field.value} if controlled
                        >
                          <FormControl>
                            <SelectTrigger className="border-gray-300">
                              <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {educationLevelOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* University */}
                  <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0a2c5a]">University/College *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your university/college" {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Graduation Year */}
                  <FormField
                    control={form.control}
                    name="graduationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0a2c5a]">Expected Graduation Year *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value} // Or value={field.value} if controlled
                        >
                          <FormControl>
                            <SelectTrigger className="border-gray-300">
                              <SelectValue placeholder="Select graduation year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {gradYearOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Availability */}
                  <FormField
                    control={form.control}
                    name="availabilityDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0a2c5a]">Availability to Start *</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Immediately, June 2025" {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0a2c5a]">Why are you interested in this internship?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us why you're interested and what you hope to learn..."
                          {...field}
                          value={field.value || ''} // Ensure value is controlled
                          rows={5}
                          className="border-gray-300 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Resume Link - Changed from File Upload */}
                <FormField
                  control={form.control}
                  name="resumeLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0a2c5a]">Resume Link (Google Drive, Dropbox, etc.) *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://your-resume-link.com"
                          {...field}
                          className="border-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Consent Checkbox */}
                <div className="flex items-center mb-2">
                  <Checkbox
                    id="consent-checkbox"
                    checked={consent}
                    onCheckedChange={setConsent}
                    className="mr-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label htmlFor="consent-checkbox" className="text-sm text-neutral-700 select-none">
                    I consent to PrivacyWeave processing my data for the purpose of contacting me about internship opportunities. <span className="text-primary">*</span>
                  </label>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg text-[#0a2c5a] text-sm">
                  <p className="font-medium mb-2">Performance-Based Conversion Policy</p>
                  <p>
                    Please note that internships are not automatically converted to full-time positions. We evaluate performance,
                    skills development, and team fit during the internship period to determine possible full-time opportunities.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-[#0a2c5a] hover:bg-[#0a2c5a]/90 text-white"
                  disabled={mutation.isPending || !consent} // Correctly use isPending from useMutation
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : "Submit Application"}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}