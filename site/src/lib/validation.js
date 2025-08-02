import { z } from 'zod';

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters'),
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  subject: z.enum(['general', 'hiring', 'collaboration', 'project', 'other'], {
    errorMap: () => ({ message: 'Please select a valid subject' })
  }),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

// Site content validation schema
export const siteContentSchema = z.object({
  profile: z.object({
    name: z.string().min(1, 'Name is required'),
    titles: z.array(z.string()).min(1, 'At least one title is required'),
    location: z.string().min(1, 'Location is required'),
    linkedinUrl: z.string().url('Valid LinkedIn URL is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(1, 'Phone is required'),
    profileImage: z.string().min(1, 'Profile image path is required'),
  }),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  highlights: z.array(z.object({
    icon: z.string().min(1, 'Icon is required'),
    title: z.string().min(1, 'Title is required'),
    desc: z.string().min(1, 'Description is required'),
    border: z.string().min(1, 'Border class is required'),
  })).min(1, 'At least one highlight is required'),
  skills: z.object({
    technical: z.array(z.string()).min(1, 'At least one technical skill is required'),
    tools: z.array(z.string()).min(1, 'At least one tool is required'),
    databases: z.array(z.string()).min(1, 'At least one database is required'),
    cloud: z.array(z.string()).min(1, 'At least one cloud platform is required'),
  }),
  experience: z.array(z.object({
    id: z.number().positive('Valid ID is required'),
    company: z.string().min(1, 'Company name is required'),
    position: z.string().min(1, 'Position is required'),
    duration: z.string().min(1, 'Duration is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    achievements: z.array(z.string()).min(1, 'At least one achievement is required'),
  })),
  education: z.array(z.object({
    id: z.number().positive('Valid ID is required'),
    institution: z.string().min(1, 'Institution name is required'),
    degree: z.string().min(1, 'Degree is required'),
    duration: z.string().min(1, 'Duration is required'),
    cgpa: z.string().min(1, 'CGPA is required'),
    activities: z.array(z.string()).min(1, 'At least one activity is required'),
  })),
  certifications: z.array(z.object({
    id: z.number().positive('Valid ID is required'),
    name: z.string().min(1, 'Certification name is required'),
    issuer: z.string().min(1, 'Issuer is required'),
    date: z.string().min(1, 'Date is required'),
    credentialId: z.string().optional(),
  })),
  projects: z.array(z.object({
    id: z.number().positive('Valid ID is required'),
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    technologies: z.array(z.string()).min(1, 'At least one technology is required'),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
  })),
  statistics: z.object({
    experience: z.string().min(1, 'Experience statistic is required'),
    projects: z.string().min(1, 'Projects statistic is required'),
    clients: z.string().min(1, 'Clients statistic is required'),
  }),
});

// Admin authentication schema
export const adminAuthSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

// Email template schema
export const emailTemplateSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1, 'Subject is required'),
  template: z.string().min(1, 'Template is required'),
  data: z.record(z.any()),
});

// Validation helper functions
export const validateRequest = (schema) => {
  return async (request) => {
    try {
      const body = await request.json();
      return { success: true, data: schema.parse(body) };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { 
          success: false, 
          error: 'Validation failed', 
          details: error.errors 
        };
      }
      return { 
        success: false, 
        error: 'Invalid JSON format' 
      };
    }
  };
}; 