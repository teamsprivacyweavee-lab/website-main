import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Mail, Settings, User, Users, FileText, MessageSquare, Smartphone } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";

// Email config status type
interface EmailConfig {
  configured: boolean;
  service: string;
  user: string;
  recipients: string[];
  missingVariables: string[];
}

interface WhatsAppConfig {
  configured: boolean;
  accountSid: string;
  phoneNumber: string;
  recipientNumber: string;
  missingVariables: string[];
}

export default function AdminPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not logged in or not an admin
  if (!user) {
    return <Redirect to="/auth" />;
  }

  if (user.role !== "admin") {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">
            <User className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="inquiries">
            <Mail className="w-4 h-4 mr-2" />
            Inquiries
          </TabsTrigger>
          <TabsTrigger value="applications">
            <FileText className="w-4 h-4 mr-2" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="w-4 h-4 mr-2" />
            Email Settings
          </TabsTrigger>
          <TabsTrigger value="whatsapp">
            <MessageSquare className="w-4 h-4 mr-2" />
            WhatsApp Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <AdminOverview />
        </TabsContent>
        
        <TabsContent value="inquiries">
          <InquiriesPanel />
        </TabsContent>
        
        <TabsContent value="applications">
          <ApplicationsPanel />
        </TabsContent>
        
        <TabsContent value="email">
          <EmailSettings />
        </TabsContent>
        
        <TabsContent value="whatsapp">
          <WhatsAppSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AdminOverview() {
  const { user } = useAuth();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.name}</CardTitle>
          <CardDescription>Admin Dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            This is your admin dashboard for PrivacyWeave. Here you can manage inquiries, 
            job applications, and system settings.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Inquiries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            View and manage client inquiries and demo requests.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Review job applications and download resumes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function InquiriesPanel() {
  const { toast } = useToast();
  
  const { data: inquiries, isLoading, error } = useQuery({
    queryKey: ['/api/admin/inquiries'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/inquiries');
      return res.json();
    }
  });
  
  if (isLoading) return <p>Loading inquiries...</p>;
  if (error) return <p>Error loading inquiries: {(error as Error).message}</p>;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Client Inquiries</h2>
      
      {inquiries && inquiries.length > 0 ? (
        <div className="space-y-4">
          {inquiries.map((inquiry: any) => (
            <Card key={inquiry.id}>
              <CardHeader>
                <CardTitle>{inquiry.firstName} {inquiry.lastName}</CardTitle>
                <CardDescription>{inquiry.company} - {inquiry.industry}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2"><strong>Email:</strong> {inquiry.email}</p>
                <p className="text-sm mb-4"><strong>Message:</strong> {inquiry.message}</p>
                <p className="text-xs text-gray-500">
                  Submitted on: {new Date(inquiry.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No inquiries yet.</p>
      )}
    </div>
  );
}

function ApplicationsPanel() {
  const { toast } = useToast();
  
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['/api/admin/job-applications'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/job-applications');
      return res.json();
    }
  });
  
  if (isLoading) return <p>Loading applications...</p>;
  if (error) return <p>Error loading applications: {(error as Error).message}</p>;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
      
      {applications && applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((application: any) => (
            <Card key={application.id}>
              <CardHeader>
                <CardTitle>{application.fullName}</CardTitle>
                <CardDescription>{application.position} - {application.experience} years experience</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2"><strong>Email:</strong> {application.email}</p>
                <p className="text-sm mb-2"><strong>Phone:</strong> {application.phone}</p>
                <p className="text-sm mb-4"><strong>Message:</strong> {application.message || 'No message provided'}</p>
                <p className="text-xs text-gray-500">
                  Submitted on: {new Date(application.createdAt).toLocaleString()}
                </p>
              </CardContent>
              <CardFooter>
                {application.resumePath ? (
                  <a 
                    href={`/api/admin/job-applications/${application.id}/resume`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                  >
                    Download Resume
                  </a>
                ) : (
                  <p className="text-sm text-gray-500">No resume provided</p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>No job applications yet.</p>
      )}
    </div>
  );
}

function EmailSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Fetch email configuration
  const { data: config, isLoading, error, refetch } = useQuery<EmailConfig>({
    queryKey: ['/api/admin/email-config'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/email-config');
      return res.json();
    }
  });
  
  // Test email mutation
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
  
  if (isLoading) return <p>Loading email configuration...</p>;
  if (error) return <p>Error loading email config: {(error as Error).message}</p>;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Email Settings</h2>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Email Configuration</CardTitle>
          <CardDescription>Email service status and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold mr-2">Status:</span>
              {config?.configured ? (
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
              <span className="font-semibold">Service:</span> {config?.service}
            </div>
            
            <div>
              <span className="font-semibold">Email User:</span> {config?.user}
            </div>
            
            <div>
              <span className="font-semibold">Recipients:</span>
              <ul className="list-disc list-inside ml-4">
                {config?.recipients.map((recipient, index) => (
                  <li key={index} className="text-sm">{recipient}</li>
                ))}
              </ul>
            </div>
            
            {!config?.configured && config?.missingVariables && config.missingVariables.length > 0 && (
              <div className="mt-4">
                <span className="font-semibold text-red-500">Missing Environment Variables:</span>
                <ul className="list-disc list-inside ml-4">
                  {config.missingVariables.map((variable, index) => (
                    <li key={index} className="text-sm text-red-500">{variable}</li>
                  ))}
                </ul>
                <p className="text-sm mt-2">
                  See EMAIL_SETUP.md for instructions on how to set up email credentials.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button
            onClick={() => sendTestEmail('inquiry')}
            disabled={!config?.configured || testEmailMutation.isPending}
            variant="outline"
          >
            Test Inquiry Email
          </Button>
          <Button
            onClick={() => sendTestEmail('job-application')}
            disabled={!config?.configured || testEmailMutation.isPending}
            variant="outline"
          >
            Test Job Application Email
          </Button>
          <Button 
            onClick={() => refetch()} 
            variant="ghost"
          >
            Refresh Status
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
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
    </div>
  );
}

function WhatsAppSettings() {
  const { toast } = useToast();
  
  // Fetch WhatsApp configuration
  const { data: config, isLoading, error, refetch } = useQuery<WhatsAppConfig>({
    queryKey: ['/api/admin/whatsapp-config'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/whatsapp-config');
      return res.json();
    }
  });
  
  // Test WhatsApp message mutation
  const testWhatsAppMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/admin/test-whatsapp');
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "WhatsApp Message Sent",
          description: "Test WhatsApp message was sent successfully.",
          variant: "default",
        });
      } else {
        toast({
          title: "Failed to Send",
          description: data.message || "Could not send test WhatsApp message. Check server logs.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to send test WhatsApp message: ${(error as Error).message}`,
        variant: "destructive",
      });
    }
  });
  
  const sendTestWhatsApp = async () => {
    testWhatsAppMutation.mutate();
  };
  
  if (isLoading) return <p>Loading WhatsApp configuration...</p>;
  if (error) return <p>Error loading WhatsApp config: {(error as Error).message}</p>;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">WhatsApp Notification Settings</h2>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>WhatsApp Configuration</CardTitle>
          <CardDescription>WhatsApp notification status and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold mr-2">Status:</span>
              {config?.configured ? (
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
              <span className="font-semibold">Twilio Account SID:</span> {config?.accountSid ? config.accountSid.substring(0, 5) + '...' : 'Not configured'}
            </div>
            
            <div>
              <span className="font-semibold">WhatsApp Phone Number:</span> {config?.phoneNumber || 'Not configured'}
            </div>
            
            <div>
              <span className="font-semibold">Recipient Number:</span> {config?.recipientNumber || 'Not configured'}
            </div>
            
            {!config?.configured && config?.missingVariables && config.missingVariables.length > 0 && (
              <div className="mt-4">
                <span className="font-semibold text-red-500">Missing Environment Variables:</span>
                <ul className="list-disc list-inside ml-4">
                  {config.missingVariables.map((variable, index) => (
                    <li key={index} className="text-sm text-red-500">{variable}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button
            onClick={sendTestWhatsApp}
            disabled={!config?.configured || testWhatsAppMutation.isPending}
            variant="outline"
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Send Test WhatsApp Message
          </Button>
          <Button 
            onClick={() => refetch()} 
            variant="ghost"
          >
            Refresh Status
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            To configure WhatsApp notifications, you need to set the following environment variables:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li className="text-sm"><strong>TWILIO_ACCOUNT_SID</strong> - Your Twilio account SID</li>
            <li className="text-sm"><strong>TWILIO_AUTH_TOKEN</strong> - Your Twilio auth token</li>
            <li className="text-sm"><strong>TWILIO_PHONE_NUMBER</strong> - Your Twilio WhatsApp-enabled phone number</li>
            <li className="text-sm"><strong>WHATSAPP_RECIPIENT_NUMBER</strong> - The WhatsApp number to receive notifications</li>
          </ul>
          <p className="text-sm mt-4">
            You can obtain these credentials by signing up for a Twilio account at <a href="https://www.twilio.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">www.twilio.com</a>.
          </p>
          <p className="text-sm mt-2">
            For WhatsApp notifications, make sure to set up WhatsApp in your Twilio console and add your recipient number to the verified numbers.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}