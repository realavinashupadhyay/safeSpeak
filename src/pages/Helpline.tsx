
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api, EmergencyContact, LegalResource } from '@/lib/api';
import EmergencyContactCard from '@/components/helpline/EmergencyContactCard';
import LegalResourceCard from '@/components/helpline/LegalResourceCard';
import { Phone, Scale, AlertOctagon, Loader2 } from 'lucide-react';

const Helpline = () => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [legalResources, setLegalResources] = useState<LegalResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const [contactsData, resourcesData] = await Promise.all([
          api.helpline.getEmergencyContacts(),
          api.helpline.getLegalResources(),
        ]);
        
        setEmergencyContacts(contactsData);
        setLegalResources(resourcesData);
      } catch (error) {
        console.error('Error fetching helpline resources:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResources();
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Emergency & Support Resources</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              If you're in immediate danger, please contact your local emergency services directly by calling 911 or your country's emergency number.
            </p>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-10 flex items-start">
            <AlertOctagon className="text-red-500 h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-800">Important Notice</h3>
              <p className="text-sm text-red-700 mt-1">
                SafeSpeak is not a substitute for emergency services. In dangerous situations or if you need immediate help, always contact professional services first.
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="emergency-contacts">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="emergency-contacts" className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Contacts
              </TabsTrigger>
              <TabsTrigger value="legal-resources" className="flex items-center">
                <Scale className="h-4 w-4 mr-2" />
                Legal Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="emergency-contacts">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 text-safespeak-primary animate-spin" />
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {emergencyContacts.map((contact) => (
                    <EmergencyContactCard key={contact.id} contact={contact} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="legal-resources">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 text-safespeak-primary animate-spin" />
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {legalResources.map((resource) => (
                    <LegalResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Helpline;
