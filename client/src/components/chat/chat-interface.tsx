import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Paperclip, SendHorizontal, X, MessageCircle, BriefcaseBusiness } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { ChatMessage } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { ChatJobApplication, ApplicationFormData } from './chat-job-application';

interface ChatInterfaceProps {
  minimized?: boolean;
  onMinimize?: () => void;
}

export function ChatInterface({ minimized = false, onMinimize }: ChatInterfaceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Load or create the session ID on component mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chat_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('chat_session_id', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Fetch or create conversation
  const createConversationMutation = useMutation({
    mutationFn: async () => {
      if (!sessionId) return null;

      const response = await apiRequest('/api/chat/conversations', {
        method: 'POST',
        body: JSON.stringify({
          sessionId,
          userEmail: userInfo.email || null,
          userName: userInfo.name || null,
          category: 'general'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    },
    onSuccess: (data) => {
      if (data && data.id) {
        setConversationId(data.id);
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: 'Failed to initialize chat. Please try again later.',
        variant: 'destructive'
      });
      console.error('Chat initialization error:', error);
    }
  });

  // Get messages for this conversation
  const { data: messages = [] } = useQuery<ChatMessage[]>({
    queryKey: ['/api/chat/conversations', conversationId, 'messages'],
    queryFn: async () => {
      if (!conversationId) return [];
      const res = await apiRequest(`/api/chat/conversations/${conversationId}/messages`);
      return await res.json();
    },
    enabled: !!conversationId,
    refetchInterval: 5000, // Poll for new messages every 5 seconds
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      if (!conversationId || !message.trim()) return null;

      const formData = new FormData();
      formData.append('sender', 'user');
      formData.append('content', message);
      formData.append('isApplicationRequest', 'false');

      // Add metadata if user provided name/email
      if (userInfo.name || userInfo.email) {
        const metadata = {
          userName: userInfo.name,
          userEmail: userInfo.email
        };
        formData.append('metadata', JSON.stringify(metadata));
      }

      // Add attachment if present
      if (attachment) {
        formData.append('attachment', attachment);
      }

      const response = await apiRequest(`/api/chat/conversations/${conversationId}/messages`, {
        method: 'POST',
        body: formData
      });

      // Server returns both the user message and bot response in one object
      // We'll return this combined response to be handled in onSuccess
      return await response.json();
    },
    onSuccess: (data) => {
      setMessage('');
      setAttachment(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Invalidate query to refresh messages
      queryClient.invalidateQueries({
        queryKey: ['/api/chat/conversations', conversationId, 'messages']
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
      console.error('Send message error:', error);
    }
  });

  // Initialize chat session when opened
  useEffect(() => {
    if (isOpen && sessionId && !conversationId) {
      createConversationMutation.mutate();
    }
  }, [isOpen, sessionId, conversationId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Remove attachment handler
  const handleRemoveAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Send a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || attachment) {
      sendMessageMutation.mutate();
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select a file smaller than 5MB.',
          variant: 'destructive'
        });
        return;
      }

      // Check file type (PDF or Word docs only)
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (fileExt !== 'pdf' && fileExt !== 'doc' && fileExt !== 'docx') {
        toast({
          title: 'Unsupported file type',
          description: 'Only PDF and Word documents are supported.',
          variant: 'destructive'
        });
        return;
      }

      setAttachment(file);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check if a message contains explicit job application intent
  const isJobRelatedMessage = (content: string) => {
    const lowerContent = content.toLowerCase();
    // Only match explicit application intent phrases
    return (lowerContent.includes('apply for') &&
      (lowerContent.includes('job') ||
        lowerContent.includes('position') ||
        lowerContent.includes('role'))) ||
      (lowerContent.includes('how') &&
        lowerContent.includes('apply') &&
        (lowerContent.includes('job') ||
          lowerContent.includes('position') ||
          lowerContent.includes('role'))) ||
      (lowerContent.includes('interested in') &&
        lowerContent.includes('position')) ||
      (lowerContent.includes('job application') &&
        lowerContent.includes('form')) ||
      (lowerContent.includes('submit') &&
        lowerContent.includes('resume'));
  };

  // Handle job application submission
  const handleApplicationSubmit = async (formData: ApplicationFormData) => {
    if (!conversationId) return;

    // Create FormData instance for the API call
    const apiFormData = new FormData();

    // Set application flag and add all form fields as metadata
    apiFormData.append('sender', 'user');
    apiFormData.append('content', `I'm applying for the "${formData.position}" position.\n\n${formData.message || 'Please consider my application.'}`);
    apiFormData.append('isApplicationRequest', 'true');

    const metadata = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      experience: formData.experience,
      isJobApplication: true
    };

    apiFormData.append('metadata', JSON.stringify(metadata));

    // Add resume if provided
    if (formData.resumeFile) {
      apiFormData.append('attachment', formData.resumeFile);
    }

    try {
      // Submit the application message
      const response = await apiRequest(`/api/chat/conversations/${conversationId}/messages`, {
        method: 'POST',
        body: apiFormData
      });

      // Server returns both the user message and bot response in one object
      const data = await response.json();
      console.log('Job application submission response:', data);

      // Update userInfo if it wasn't set before
      if (!userInfo.name || !userInfo.email) {
        setUserInfo({
          name: formData.fullName,
          email: formData.email
        });
      }

      // Invalidate query to refresh messages
      queryClient.invalidateQueries({
        queryKey: ['/api/chat/conversations', conversationId, 'messages']
      });

      toast({
        title: 'Application Submitted',
        description: 'Your job application has been submitted successfully. We will contact you soon.',
        variant: 'default'
      });

    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      {/* Job Application Dialog */}
      <ChatJobApplication
        conversationId={conversationId || 0}
        onApplicationSubmit={handleApplicationSubmit}
        isOpen={isApplicationDialogOpen}
        onOpenChange={setIsApplicationDialogOpen}
      />

      {/* Chat Trigger Button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 rounded-full h-14 w-14 p-0 shadow-lg bg-[#154D71] hover:bg-[#154D71]/90"
            size="icon"
          >
            <MessageCircle size={24} />
          </Button>
        </SheetTrigger>

        <SheetContent className="sm:max-w-md p-0 border-l h-full flex flex-col" style={{ borderColor: '#154D71' }}>
          <SheetHeader className="p-4 border-b" style={{ borderColor: '#154D71' }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/images/privacy-weave-logo.png" alt="PrivacyWeave" className="mix-blend-multiply" />
                  <AvatarFallback>PW</AvatarFallback>
                </Avatar>
                <SheetTitle className="text-lg" style={{ color: '#154D71' }}>PrivacyWeave Support</SheetTitle>
              </div>
              <SheetClose className="rounded-full p-0">
                <X className="h-4 w-4" />
              </SheetClose>
            </div>
            <SheetDescription>
              Ask us anything about our services or leave a message.
            </SheetDescription>
          </SheetHeader>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-70">
                <MessageCircle className="h-12 w-12 mb-2 text-gray-400" />
                <p className="text-center text-sm">
                  Start a conversation with our AI assistant. We're here to help with any questions about our services.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                        }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                      <div className="text-xs mt-1 opacity-70 text-right">
                        {formatTimestamp(msg.timestamp)}
                      </div>

                      {/* Show attachment if present */}
                      {msg.attachmentUrl && (
                        <div className="mt-2 p-2 bg-background/20 rounded flex items-center gap-2">
                          <Paperclip className="h-4 w-4" />
                          <span className="text-xs truncate">Attachment</span>
                        </div>
                      )}

                      {/* Apply button for bot messages that are job-related */}
                      {(msg.sender === 'bot' && isJobRelatedMessage(msg.content)) && (
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => setIsApplicationDialogOpen(true)}
                          >
                            <BriefcaseBusiness className="mr-1 h-3 w-3" />
                            Apply for a position
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>

          {/* User Info Form - shown only first time */}
          {messages.length === 0 && (
            <div className="p-4 border-t">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Your Name (optional)</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Your Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Message Input Area */}
          <div className="p-4 border-t mt-auto">
            {attachment && (
              <div className="mb-2 p-2 bg-muted rounded-md flex justify-between items-center">
                <div className="flex items-center gap-2 truncate">
                  <Paperclip className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm truncate">{attachment.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={handleRemoveAttachment}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Textarea
                placeholder="Type your message..."
                className="min-h-10 flex-1 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <Button
                type="submit"
                size="icon"
                disabled={(!message.trim() && !attachment) || sendMessageMutation.isPending}
                className="flex-shrink-0"
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}