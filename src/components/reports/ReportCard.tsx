
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Report } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReportCardProps {
  report: Report;
  replies?: number;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, replies = 0 }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'harassment':
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const formatReportContent = (content: string) => {
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  };

  return (
    <Card className="safe-shadow hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{report.title}</CardTitle>
          <Badge className={`${getStatusColor(report.status)} capitalize`}>
            {report.status.replace('_', ' ')}
          </Badge>
        </div>
        <CardDescription className="flex items-center text-xs">
          <span>
            Posted {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
          </span>
          {report.anonymous && (
            <span className="ml-2 px-1 bg-gray-100 rounded text-gray-600">Anonymous</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">{formatReportContent(report.content)}</p>
        
        <div className="flex mt-3">
          <Badge variant="outline" className="text-xs flex items-center mr-2">
            {getCategoryIcon(report.category)}
            {report.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="text-sm text-gray-500 flex items-center">
          <MessageCircle className="h-4 w-4 mr-1" />
          {replies} {replies === 1 ? 'reply' : 'replies'}
        </div>
        <Link to={`/report/${report.id}`}>
          <Button size="sm" variant="outline" className="text-safespeak-primary hover:text-safespeak-secondary border-safespeak-primary hover:border-safespeak-secondary">
            View Discussion
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
