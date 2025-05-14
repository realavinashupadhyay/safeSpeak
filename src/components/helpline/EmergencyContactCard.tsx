
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmergencyContact } from '@/lib/api';
import { Phone, Globe } from 'lucide-react';

interface EmergencyContactCardProps {
  contact: EmergencyContact;
}

const EmergencyContactCard: React.FC<EmergencyContactCardProps> = ({ contact }) => {
  return (
    <Card className="h-full safe-shadow hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{contact.name}</CardTitle>
        <CardDescription className="flex items-center">
          <Badge variant="outline" className="text-xs text-safespeak-primary border-safespeak-primary">
            {contact.category}
          </Badge>
          <span className="ml-2 text-xs">Available: {contact.hours}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 mb-2">{contact.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start text-safespeak-secondary hover:text-safespeak-primary hover:border-safespeak-primary"
          onClick={() => window.location.href = `tel:${contact.phone}`}
        >
          <Phone className="h-4 w-4 mr-2" />
          {contact.phone}
        </Button>
        
        {contact.website && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start text-safespeak-secondary hover:text-safespeak-primary hover:border-safespeak-primary"
            onClick={() => window.open(contact.website, '_blank')}
          >
            <Globe className="h-4 w-4 mr-2" />
            Visit Website
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EmergencyContactCard;
