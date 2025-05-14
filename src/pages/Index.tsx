
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Shield, MessageCircle, HeartHandshake, UserCheck, LockKeyhole } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="gradient-text">Safe, anonymous support</span> when you need it most
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                SafeSpeak provides a secure platform where you can anonymously report sensitive issues and receive support from verified helpers.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/register">
                  <Button className="bg-safespeak-primary hover:bg-safespeak-secondary text-white px-8 py-6 rounded-lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/helpline">
                  <Button variant="outline" className="border-safespeak-primary text-safespeak-primary hover:bg-safespeak-soft-gray px-8 py-6 rounded-lg">
                    Emergency Resources
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-safespeak-primary to-safespeak-secondary opacity-30 blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=1470" 
                  alt="People supporting each other" 
                  className="relative rounded-2xl shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-safespeak-soft-gray px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How SafeSpeak Works</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to create a secure environment where people can share sensitive issues and receive valuable support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:safe-shadow transition-shadow">
              <div className="h-12 w-12 rounded-full bg-safespeak-soft-gray flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-safespeak-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Anonymous Reporting</h3>
              <p className="text-gray-600">
                Share your situation without revealing your identity, ensuring your privacy and safety.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:safe-shadow transition-shadow">
              <div className="h-12 w-12 rounded-full bg-safespeak-soft-gray flex items-center justify-center mb-4">
                <UserCheck className="h-6 w-6 text-safespeak-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Helpers</h3>
              <p className="text-gray-600">
                Receive advice from community members who've been verified for their expertise and supportive approach.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:safe-shadow transition-shadow">
              <div className="h-12 w-12 rounded-full bg-safespeak-soft-gray flex items-center justify-center mb-4">
                <HeartHandshake className="h-6 w-6 text-safespeak-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Support</h3>
              <p className="text-gray-600">
                Build a reputation by providing helpful advice and recognize valuable responses with upvotes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-safespeak-primary to-safespeak-secondary rounded-2xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to speak up safely?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join our community today and get the support you need in a secure, anonymous environment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-safespeak-primary hover:bg-gray-100 px-8 py-6">
                Create an Account
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6">
                Browse Reports
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Your Safety Is Our Priority</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-safespeak-soft-gray flex items-center justify-center flex-shrink-0 mt-1">
                    <LockKeyhole className="h-4 w-4 text-safespeak-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">End-to-End Privacy</h3>
                    <p className="text-gray-600 mt-1">
                      All reports can be made completely anonymously, with no tracking or identifiable information stored.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-safespeak-soft-gray flex items-center justify-center flex-shrink-0 mt-1">
                    <UserCheck className="h-4 w-4 text-safespeak-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Verified Support Network</h3>
                    <p className="text-gray-600 mt-1">
                      Our helpers undergo verification to ensure you receive reliable advice from qualified individuals.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-safespeak-soft-gray flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="h-4 w-4 text-safespeak-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Moderated Conversations</h3>
                    <p className="text-gray-600 mt-1">
                      All discussions are monitored to maintain a respectful, supportive environment free from harmful content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-safespeak-primary to-safespeak-secondary opacity-30 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1470" 
                alt="Safe communication" 
                className="relative rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
