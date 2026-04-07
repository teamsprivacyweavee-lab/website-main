import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Inquiry, JobApplication } from "@shared/schema";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Loader2, Download, CheckCircle, AlertCircle, Mail, Settings } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";

const AdminDashboard = () => {
  const [inquiriesPage, setInquiriesPage] = useState(1);
  const [applicationsPage, setApplicationsPage] = useState(1);
  const pageSize = 10;
  const { user } = useAuth();

  const { 
    data: inquiries, 
    isLoading: inquiriesLoading 
  } = useQuery<Inquiry[]>({
    queryKey: ["/api/admin/inquiries"],
  });

  const { 
    data: applications, 
    isLoading: applicationsLoading 
  } = useQuery<JobApplication[]>({
    queryKey: ["/api/admin/job-applications"],
  });

  // Calculate pagination for inquiries
  const totalInquiryPages = inquiries ? Math.ceil(inquiries.length / pageSize) : 0;
  const paginatedInquiries = inquiries ? 
    inquiries.slice((inquiriesPage - 1) * pageSize, inquiriesPage * pageSize) : 
    [];

  // Calculate pagination for job applications
  const totalApplicationPages = applications ? Math.ceil(applications.length / pageSize) : 0;
  const paginatedApplications = applications ? 
    applications.slice((applicationsPage - 1) * pageSize, applicationsPage * pageSize) : 
    [];

  // Handle resume download
  const handleResumeDownload = async (applicationId: number) => {
    try {
      window.open(`/api/admin/job-applications/${applicationId}/resume`, '_blank');
    } catch (error) {
      console.error("Failed to download resume:", error);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  // Define the interface for email config
  interface EmailConfig {
    configured: boolean;
    service: string;
    user: string;
    recipients: string[];
    missingVariables: string[];
  }
  
  // Fetch email configuration
  const { 
    data: emailConfig, 
    isLoading: emailConfigLoading,
    refetch: refetchEmailConfig
  } = useQuery<EmailConfig>({
    queryKey: ['/api/admin/email-config'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/email-config');
      return res.json();
    }
  });
  
  // Test email mutation
  const { toast } = useToast();
  const testEmailMutation = useMutation({
    mutationFn: async (emailType: 'inquiry' | 'job-application') => {
      const res = await apiRequest('POST', '/api/admin/test-email', { emailType });
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Email Sent",
          description: "Test email was sent successfully.",
          variant: "default",
        });
      } else {
        toast({
          title: "Failed to Send",
          description: data.message || "Could not send test email. Check server logs.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to send test email: ${(error as Error).message}`,
        variant: "destructive",
      });
    }
  });
  
  const sendTestEmail = async (type: 'inquiry' | 'job-application') => {
    testEmailMutation.mutate(type);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="inquiries">
        <TabsList className="mb-8">
          <TabsTrigger value="inquiries">Client Inquiries</TabsTrigger>
          <TabsTrigger value="applications">Job Applications</TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email Settings
          </TabsTrigger>
        </TabsList>
        
        {/* Inquiries Tab */}
        <TabsContent value="inquiries">
          <Card>
            <CardHeader>
              <CardTitle>Client Inquiries</CardTitle>
              <CardDescription>
                View and manage incoming client requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {inquiriesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : inquiries && inquiries.length > 0 ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedInquiries.map((inquiry) => (
                        <TableRow key={inquiry.id}>
                          <TableCell>
                            {format(new Date(inquiry.createdAt), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>
                            {inquiry.firstName} {inquiry.lastName}
                          </TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell>{inquiry.company}</TableCell>
                          <TableCell>
                            {inquiry.industry.charAt(0).toUpperCase() + inquiry.industry.slice(1)}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {inquiry.message}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {/* Pagination for inquiries */}
                  {totalInquiryPages > 1 && (
                    <Pagination className="mt-6">
                      <PaginationContent>
                        <PaginationItem>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setInquiriesPage(Math.max(1, inquiriesPage - 1))}
                            disabled={inquiriesPage === 1}
                          >
                            <span className="sr-only">Go to previous page</span>
                            &lt;
                          </Button>
                        </PaginationItem>
                        {Array.from({ length: totalInquiryPages }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => setInquiriesPage(i + 1)}
                              isActive={inquiriesPage === i + 1}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setInquiriesPage(Math.min(totalInquiryPages, inquiriesPage + 1))}
                            disabled={inquiriesPage === totalInquiryPages}
                          >
                            <span className="sr-only">Go to next page</span>
                            &gt;
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-dark">No inquiries yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Job Applications Tab */}
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Job Applications</CardTitle>
              <CardDescription>
                Review job applications from candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {applicationsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : applications && applications.length > 0 ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Resume</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            {format(new Date(application.createdAt), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>{application.fullName}</TableCell>
                          <TableCell>{application.email}</TableCell>
                          <TableCell>{application.phone}</TableCell>
                          <TableCell>{application.position}</TableCell>
                          <TableCell>{application.experience}</TableCell>
                          <TableCell>
                            {application.resumePath ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleResumeDownload(application.id)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            ) : (
                              <span className="text-muted-foreground">No resume</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {/* Pagination for applications */}
                  {totalApplicationPages > 1 && (
                    <Pagination className="mt-6">
                      <PaginationContent>
                        <PaginationItem>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setApplicationsPage(Math.max(1, applicationsPage - 1))}
                            disabled={applicationsPage === 1}
                          >
                            <span className="sr-only">Go to previous page</span>
                            &lt;
                          </Button>
                        </PaginationItem>
                        {Array.from({ length: totalApplicationPages }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              onClick={() => setApplicationsPage(i + 1)}
                              isActive={applicationsPage === i + 1}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setApplicationsPage(Math.min(totalApplicationPages, applicationsPage + 1))}
                            disabled={applicationsPage === totalApplicationPages}
                          >
                            <span className="sr-only">Go to next page</span>
                            &gt;
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-dark">No job applications yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Email Settings Tab */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Email service status and settings</CardDescription>
            </CardHeader>
            <CardContent>
              {emailConfigLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Status:</span>
                    {emailConfig?.configured ? (
                      <span className="flex items-center text-green-500">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Configured
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Not Configured
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <span className="font-semibold">Service:</span> {emailConfig?.service}
                  </div>
                  
                  <div>
                    <span className="font-semibold">Email User:</span> {emailConfig?.user}
                  </div>
                  
                  <div>
                    <span className="font-semibold">Recipients:</span>
                    <ul className="list-disc list-inside ml-4">
                      {emailConfig?.recipients.map((recipient, index) => (
                        <li key={index} className="text-sm">{recipient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {!emailConfig?.configured && emailConfig?.missingVariables && emailConfig.missingVariables.length > 0 && (
                    <div className="mt-4">
                      <span className="font-semibold text-red-500">Missing Environment Variables:</span>
                      <ul className="list-disc list-inside ml-4">
                        {emailConfig.missingVariables.map((variable, index) => (
                          <li key={index} className="text-sm text-red-500">{variable}</li>
                        ))}
                      </ul>
                      <p className="text-sm mt-2">
                        See EMAIL_SETUP.md for instructions on how to set up email credentials.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button
                onClick={() => sendTestEmail('inquiry')}
                disabled={!emailConfig?.configured || testEmailMutation.isPending}
              >
                Test Inquiry Email
              </Button>
              <Button
                onClick={() => sendTestEmail('job-application')}
                disabled={!emailConfig?.configured || testEmailMutation.isPending}
              >
                Test Job Application Email
              </Button>
              <Button 
                onClick={() => refetchEmailConfig()} 
                variant="outline"
              >
                Refresh Status
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Email Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                To configure email notifications, you need to set the following environment variables:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li className="text-sm"><strong>EMAIL_SERVICE</strong> - The email service (gmail, outlook, etc.)</li>
                <li className="text-sm"><strong>EMAIL_USER</strong> - The sender email address</li>
                <li className="text-sm"><strong>EMAIL_PASSWORD</strong> - The email password or app password</li>
                <li className="text-sm"><strong>EMAIL_RECIPIENTS</strong> - Comma-separated list of recipient emails</li>
              </ul>
              <p className="text-sm mt-4">
                For detailed setup instructions, please refer to the EMAIL_SETUP.md file in the project root.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
