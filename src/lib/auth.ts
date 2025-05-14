import { create } from 'zustand';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

// Define the user type
export interface AppUser {
  id: string;
  email: string | undefined;
  username: string | undefined;
  role: string;
  isVerified: boolean;
}

// Define the auth store type
interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AppUser | null;
  session: Session | null;
  
  // Auth methods
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  updateProfile: (data: Partial<AppUser>) => Promise<void>;
}

// Create the auth store
export const useAuth = create<AuthState>((set, get) => ({
  isLoading: true,
  isAuthenticated: false,
  user: null,
  session: null,
  
  // Login method
  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      const { user, session } = data;
      
      if (!user || !session) {
        throw new Error('Authentication failed');
      }
      
      // Get the user's profile from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileError) {
        console.error('Error fetching profile:', profileError);
      }
      
      const appUser: AppUser = {
        id: user.id,
        email: user.email,
        username: profile?.username || user.email?.split('@')[0] || 'User',
        role: profile?.role || 'user',
        isVerified: profile?.is_verified || false
      };
      
      set({ 
        isAuthenticated: true,
        user: appUser,
        session: session
      });
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${appUser.username}!`,
      });
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
      throw error;
    }
  },
  
  // Register method
  register: async (email: string, password: string, username: string) => {
    try {
      // Sign up with email and password
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: 'Registration successful',
        description: 'Your account has been created. Please check your email to confirm your account.',
      });
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
      throw error;
    }
  },
  
  // Logout method
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      set({ 
        isAuthenticated: false,
        user: null,
        session: null
      });
      
      toast({
        title: 'Logout successful',
        description: 'You have been logged out.',
      });
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  },
  
  // Check session method
  checkSession: async () => {
    try {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        set({ 
          isLoading: false,
          isAuthenticated: false,
          user: null,
          session: null
        });
        return;
      }
      
      // Get the user's profile from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.session.user.id)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      }
      
      const appUser: AppUser = {
        id: data.session.user.id,
        email: data.session.user.email,
        username: profile?.username || data.session.user.email?.split('@')[0] || 'User',
        role: profile?.role || 'user',
        isVerified: profile?.is_verified || false
      };
      
      set({ 
        isLoading: false,
        isAuthenticated: true,
        user: appUser,
        session: data.session
      });
      
    } catch (error) {
      console.error('Session check error:', error);
      set({ 
        isLoading: false,
        isAuthenticated: false,
        user: null,
        session: null
      });
    }
  },
  
  // Update profile method
  updateProfile: async (data: Partial<AppUser>) => {
    const { user } = get();
    
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not authenticated',
        description: 'You must be logged in to update your profile.',
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      set({ 
        user: {
          ...user,
          ...data
        }
      });
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Profile update failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  }
}));

// Initialize the auth store by checking the session
useAuth.getState().checkSession();
