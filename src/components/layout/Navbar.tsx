
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { Shield, MessageCircle, Phone, LogOut, User, UserPlus, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Reports', href: '/dashboard', icon: MessageCircle },
    { name: 'Helpline', href: '/helpline', icon: Phone },
  ];
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-safespeak-primary" />
              <span className="ml-2 text-xl font-bold text-safespeak-dark">
                Safe<span className="text-safespeak-primary">Speak</span>
              </span>
            </Link>
            
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === item.href
                      ? 'border-safespeak-primary text-safespeak-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700">
                  {user?.role === 'helper' && (
                    <span className="bg-safespeak-soft-gray text-safespeak-secondary px-2 py-1 rounded-md text-xs mr-2">
                      Helper
                    </span>
                  )}
                  {user?.username}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-safespeak-primary hover:bg-safespeak-secondary text-white">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu - only show navigation icons */}
      <div className="sm:hidden border-t border-gray-200 bg-white fixed bottom-0 left-0 right-0 z-10 shadow-lg">
        <div className="flex justify-around py-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`inline-flex flex-col items-center justify-center text-xs font-medium ${
                location.pathname === item.href
                  ? 'text-safespeak-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              {item.name}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="inline-flex flex-col items-center justify-center text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-6 w-6 mb-1" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex flex-col items-center justify-center text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              <User className="h-6 w-6 mb-1" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
