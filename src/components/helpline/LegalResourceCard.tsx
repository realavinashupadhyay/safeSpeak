
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LegalResource } from '@/lib/api';
import { ExternalLink, FileText } from 'lucide-react';

interface LegalResourceCardProps {
  resource: LegalResource;
}

const LegalResourceCard: React.FC<LegalResourceCardProps> = ({ resource }) => {
  return (
    <Card className="h-full safe-shadow hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-2">
          <FileText className="h-5 w-5 text-safespeak-primary mt-1" />
          <div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs text-safespeak-primary border-safespeak-primary">
                {resource.category}
              </Badge>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{resource.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          size="sm" 
          className="w-full bg-safespeak-primary hover:bg-safespeak-secondary"
          onClick={() => window.open(resource.url, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Access Resource
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LegalResourceCard;
