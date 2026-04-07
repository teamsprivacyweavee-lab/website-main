import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { JobListing, jobApplicationWithResumeSchema } from "@shared/schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

type ApplyFormValues = z.infer<typeof jobApplicationWithResumeSchema>;

const ApplyJobPage = () => {
  const [match, params] = useRoute<{ id: string }>("/careers/apply/:id");
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  // Fetch job details
  const { data: job, isLoading } = useQuery<JobListing>({
    queryKey: [match ? `/api/job-listings/${params.id}` : null],
    enabled: !!match,
  });

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(jobApplicationWithResumeSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: job?.title || "",
      experience: "",
      message: "",
      resumeLink: "",
    },
  });

  // Update position when job data is fetched
  useEffect(() => {
    if (job) {
      form.setValue("position", job.title);
    }
  }, [job, form]);

  const onSubmit = async (data: ApplyFormValues) => {
    if (!match || !job) return;

    setIsSubmitting(true);

    try {
      // Map resumeLink to resumePath before sending
      const payload = {
        ...data,
        resumePath: data.resumeLink,  // <-- Map here
      };

      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit application");

      toast({
        title: "Application submitted successfully!",
        description: "We'll review your application and get back to you soon.",
      });

      navigate("/careers");
    } catch (error) {
      toast({
        title: "Failed to submit application",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!match) {
    navigate("/careers");
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Job not found</h1>
        <p>The job you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/careers")} className="mt-4">
          Back to Careers
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Apply for: {job.title}</h1>

        <Card>
          <CardHeader>
            <CardTitle>Submit Your Application</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position*</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 3 years in data privacy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resumeLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume Link (Google Drive or other)*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Paste your resume link here"
                          {...field}
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
                    I consent to PrivacyWeave processing my data for the purpose of contacting me about job opportunities. <span className="text-primary">*</span>
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !consent}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyJobPage;