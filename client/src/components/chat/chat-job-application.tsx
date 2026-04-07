import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Paperclip, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatJobApplicationProps {
  conversationId: number;
  onApplicationSubmit: (data: ApplicationFormData) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
  resumeFile: File | null;
}

export function ChatJobApplication({ 
  conversationId, 
  onApplicationSubmit,
  isOpen,
  onOpenChange
}: ChatJobApplicationProps) {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    resumeFile: null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user edits it
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

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
      
      setFormData(prev => ({ ...prev, resumeFile: file }));
      
      // Clear error for this field
      if (errors.resumeFile) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.resumeFile;
          return newErrors;
        });
      }
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, resumeFile: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.experience.trim()) {
      newErrors.experience = 'Years of experience is required';
    }
    
    if (!formData.resumeFile) {
      newErrors.resumeFile = 'Resume is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onApplicationSubmit(formData);
      // Removed duplicate close - Dialog will be closed by the onOpenChange prop
      // No need to call onOpenChange(false) here as it causes double close
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for a Position</DialogTitle>
          <DialogDescription>
            Fill out this form to submit your job application through the chat. We'll review your application and get back to you soon.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName" className="flex items-center">
              Full Name
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "border-destructive" : ""}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email" className="flex items-center">
              Email
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="position" className="flex items-center">
              Position
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="position"
              name="position"
              placeholder="Position you're applying for"
              value={formData.position}
              onChange={handleChange}
              className={errors.position ? "border-destructive" : ""}
            />
            {errors.position && (
              <p className="text-xs text-destructive">{errors.position}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="experience" className="flex items-center">
              Years of Experience
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="experience"
              name="experience"
              placeholder="E.g. 1-2 years"
              value={formData.experience}
              onChange={handleChange}
              className={errors.experience ? "border-destructive" : ""}
            />
            {errors.experience && (
              <p className="text-xs text-destructive">{errors.experience}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="message">Cover Letter / Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about yourself and why you're interested in this position"
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label className="flex items-center">
              Resume / CV
              <span className="text-destructive ml-1">*</span>
            </Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  id="resumeFile"
                  name="resumeFile"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full ${errors.resumeFile ? "border-destructive text-destructive" : ""}`}
                >
                  <Paperclip className="mr-2 h-4 w-4" />
                  {formData.resumeFile ? 'Change Resume' : 'Attach Resume'}
                </Button>
              </div>
              
              {formData.resumeFile && (
                <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <span className="text-sm truncate flex-1">
                    {formData.resumeFile.name}
                  </span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={removeFile}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {errors.resumeFile && (
                <p className="text-xs text-destructive">{errors.resumeFile}</p>
              )}
              
              <p className="text-xs text-muted-foreground">
                Accepts PDF or Word documents (doc, docx) up to 5MB
              </p>
            </div>
          </div>
        
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}