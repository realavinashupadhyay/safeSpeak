
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "./auth";

export interface Report {
  id: number;
  title: string;
  content: string;
  category: string;
  userId: number | string;
  anonymous: boolean;
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
  updatedAt: string;
}

export interface Reply {
  id: number;
  reportId: number;
  userId: number | string;
  content: string;
  username: string;
  role: string;
  upvotes: number;
  createdAt: string;
  isHelper: boolean;
  isOP: boolean;
}

export interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
  hours: string;
  description: string;
  category: string;
  website?: string;
}

export interface LegalResource {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
}

// Mock data for reports
const mockReports: Report[] = [
  {
    id: 1,
    title: "Workplace harassment situation",
    content: "I'm experiencing repeated uncomfortable comments from a senior colleague. They make remarks about my appearance and send inappropriate messages after work hours. I'm afraid to report it to HR as this person has influence in the company. What should I do?",
    category: "harassment",
    userId: 1,
    anonymous: true,
    status: "open",
    createdAt: "2025-04-25T14:32:00Z",
    updatedAt: "2025-04-25T14:32:00Z",
  },
  {
    id: 2,
    title: "Blackmail threats through social media",
    content: "Someone is threatening to share private photos unless I pay them. They contacted me through Instagram with screenshots of private content from my cloud storage that I thought was secure. I'm scared and don't know if I should pay or involve the police.",
    category: "blackmail",
    userId: 3,
    anonymous: true,
    status: "in_progress",
    createdAt: "2025-04-28T09:15:00Z",
    updatedAt: "2025-04-28T15:43:00Z",
  },
  {
    id: 3,
    title: "Cyberbullying in school group chat",
    content: "There's a group chat where several classmates are sharing embarrassing edited photos of me and other students. They're making fun of my appearance and spreading rumors. The administrators are popular students and teachers don't seem to take online issues seriously.",
    category: "cyberbullying",
    userId: 2,
    anonymous: false,
    status: "open",
    createdAt: "2025-05-01T11:27:00Z",
    updatedAt: "2025-05-01T11:27:00Z",
  },
];

// Mock data for replies
const mockReplies: Record<number, Reply[]> = {
  1: [
    {
      id: 101,
      reportId: 1,
      userId: 2,
      content: "I'm sorry you're going through this. Document every instance with dates and exact wording if possible. Check if your company has an anonymous ethics hotline instead of going directly to HR. If you have trusted colleagues, ask if they've witnessed these behaviors as potential witnesses.",
      username: "helper_jane",
      role: "helper",
      upvotes: 4,
      createdAt: "2025-04-25T15:45:00Z",
      isHelper: true,
      isOP: false
    },
    {
      id: 102,
      reportId: 1,
      userId: 5,
      content: "As someone who works in HR, I recommend checking your employee handbook for reporting procedures. Many companies have alternative reporting channels specifically for situations involving managers or influential employees. Also, keep all communication on company platforms where it can be verified later if needed.",
      username: "hr_advisor",
      role: "helper",
      upvotes: 7,
      createdAt: "2025-04-26T09:12:00Z",
      isHelper: true,
      isOP: false
    }
  ],
  2: [
    {
      id: 201,
      reportId: 2,
      userId: 4,
      content: "Don't pay the blackmailer - it often leads to more demands, not resolution. This is extortion and a criminal offense. Take screenshots of all communications without responding further. Contact local police cybercrime unit immediately. Change all your passwords and enable two-factor authentication on your accounts.",
      username: "security_expert",
      role: "helper",
      upvotes: 5,
      createdAt: "2025-04-28T10:32:00Z",
      isHelper: true,
      isOP: false
    }
  ]
};

// Mock emergency contacts
export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: 1,
    name: "National Sexual Assault Hotline",
    phone: "1-800-656-HOPE (4673)",
    hours: "24/7",
    description: "Connects you with a trained staff member from a sexual assault service provider in your area.",
    category: "assault"
  },
  {
    id: 2,
    name: "National Suicide Prevention Lifeline",
    phone: "1-800-273-8255",
    hours: "24/7",
    description: "Provides free and confidential support for people in distress, prevention and crisis resources.",
    category: "crisis"
  },
  {
    id: 3,
    name: "National Domestic Violence Hotline",
    phone: "1-800-799-7233",
    hours: "24/7",
    description: "Highly trained advocates available to talk confidentially with anyone experiencing domestic violence.",
    category: "violence"
  },
  {
    id: 4,
    name: "Cyber Civil Rights Initiative Crisis Helpline",
    phone: "1-844-878-2274",
    hours: "24/7",
    description: "Support for victims of non-consensual pornography and online harassment.",
    category: "cybercrime",
    website: "https://www.cybercivilrights.org"
  }
];

// Mock legal resources
export const mockLegalResources: LegalResource[] = [
  {
    id: 1,
    title: "Workplace Harassment Legal Guide",
    description: "Comprehensive guide to understanding workplace harassment laws, your rights, and how to file formal complaints with the EEOC.",
    url: "https://www.eeoc.gov/harassment",
    category: "harassment"
  },
  {
    id: 2,
    title: "Cybercrime Victim Resources",
    description: "Federal resources for victims of cybercrime, including blackmail and extortion through electronic means.",
    url: "https://www.ic3.gov/Home/ComplaintChoice",
    category: "cybercrime"
  },
  {
    id: 3,
    title: "Legal Aid Directory",
    description: "Find pro bono legal assistance in your area for issues related to harassment, discrimination, and cybercrime.",
    url: "https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help",
    category: "general"
  }
];

// API functions
export const api = {
  reports: {
    getAll: async (): Promise<Report[]> => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockReports;
    },
    getById: async (id: number): Promise<Report> => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const report = mockReports.find(r => r.id === id);
      if (!report) {
        throw new Error("Report not found");
      }
      return report;
    },
    create: async (data: Omit<Report, "id" | "createdAt" | "updatedAt" | "status" | "userId">): Promise<Report> => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const auth = useAuth.getState();
      if (!auth.isAuthenticated) {
        throw new Error("You must be logged in to create a report");
      }
      
      const newReport: Report = {
        ...data,
        id: Math.floor(Math.random() * 10000),
        userId: auth.user?.id || 0,
        status: "open",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      mockReports.push(newReport);
      
      toast({
        title: "Report submitted",
        description: "Your report has been submitted successfully.",
      });
      
      return newReport;
    }
  },
  
  replies: {
    getByReportId: async (reportId: number): Promise<Reply[]> => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockReplies[reportId] || [];
    },
    create: async (reportId: number, content: string): Promise<Reply> => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const auth = useAuth.getState();
      if (!auth.isAuthenticated) {
        throw new Error("You must be logged in to reply");
      }
      
      const report = mockReports.find(r => r.id === reportId);
      if (!report) {
        throw new Error("Report not found");
      }
      
      const newReply: Reply = {
        id: Math.floor(Math.random() * 10000),
        reportId,
        userId: auth.user?.id || 0,
        content,
        username: auth.user?.username || "anonymous",
        role: auth.user?.role || "user",
        upvotes: 0,
        createdAt: new Date().toISOString(),
        isHelper: auth.user?.role === "helper",
        isOP: String(auth.user?.id) === String(report.userId)
      };
      
      if (!mockReplies[reportId]) {
        mockReplies[reportId] = [];
      }
      
      mockReplies[reportId].push(newReply);
      
      toast({
        title: "Reply posted",
        description: "Your response has been posted successfully.",
      });
      
      return newReply;
    },
    upvote: async (reportId: number, replyId: number): Promise<Reply> => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const auth = useAuth.getState();
      if (!auth.isAuthenticated) {
        throw new Error("You must be logged in to upvote");
      }
      
      if (!mockReplies[reportId]) {
        throw new Error("Report not found");
      }
      
      const replyIndex = mockReplies[reportId].findIndex(r => r.id === replyId);
      if (replyIndex === -1) {
        throw new Error("Reply not found");
      }
      
      // Check if user is allowed to upvote (only original poster or verified helpers)
      const report = mockReports.find(r => r.id === reportId);
      const isOP = report && String(auth.user?.id) === String(report.userId);
      const isHelper = auth.user?.role === "helper" && auth.user?.isVerified;
      
      if (!isOP && !isHelper) {
        throw new Error("Only the original poster or verified helpers can upvote replies");
      }
      
      // Update upvote
      mockReplies[reportId][replyIndex].upvotes += 1;
      
      return mockReplies[reportId][replyIndex];
    }
  },
  
  helpline: {
    getEmergencyContacts: async (): Promise<EmergencyContact[]> => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockEmergencyContacts;
    },
    getLegalResources: async (): Promise<LegalResource[]> => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockLegalResources;
    }
  }
};
