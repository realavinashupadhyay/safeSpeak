
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { checkSession, isLoading } = useAuth();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-safespeak-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pb-16 sm:pb-0">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
