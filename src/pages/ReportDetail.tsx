
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ReplyCard from '@/components/reports/ReplyCard';
import ReplyForm from '@/components/reports/ReplyForm';
import { api, Report, Reply } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReportAndReplies = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const reportId = parseInt(id);
        const [reportData, repliesData] = await Promise.all([
          api.reports.getById(reportId),
          api.replies.getByReportId(reportId),
        ]);
        
        setReport(reportData);
        setReplies(repliesData);
      } catch (error) {
        console.error('Error fetching report details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReportAndReplies();
  }, [id]);
  
  const handleReplySubmitted = async () => {
    if (!id) return;
    
    try {
      const reportId = parseInt(id);
      const repliesData = await api.replies.getByReportId(reportId);
      setReplies(repliesData);
    } catch (error) {
      console.error('Error refreshing replies:', error);
    }
  };
  
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

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-safespeak-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!report) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Report Not Found</h1>
          <p className="text-gray-600 mb-6">The report you're looking for doesn't exist or has been removed.</p>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-safespeak-primary mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{report.title}</h1>
            <Badge className={`${getStatusColor(report.status)} capitalize`}>
              {report.status.replace('_', ' ')}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>Posted {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}</span>
            {report.anonymous && (
              <span className="ml-2 px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 text-xs">Anonymous</span>
            )}
            
            <Badge variant="outline" className="ml-3 flex items-center text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {report.category}
            </Badge>
          </div>
          
          <div className="prose max-w-none text-gray-800 whitespace-pre-wrap">
            {report.content}
          </div>
        </div>
        
        <div className="mt-10 mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-safespeak-primary" />
            Responses ({replies.length})
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Helpful advice from the community
          </p>
        </div>
        
        {replies.length > 0 ? (
          <div className="space-y-4 mb-8">
            {replies.map((reply) => (
              <ReplyCard key={reply.id} reply={reply} reportId={report.id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 mb-8 bg-gray-50 rounded-lg">
            <MessageCircle className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-700">No responses yet</h3>
            <p className="text-gray-500 mt-1 max-w-md mx-auto">
              Be the first to provide helpful advice or support for this report.
            </p>
          </div>
        )}
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Leave a Response</h3>
          <ReplyForm reportId={report.id} onReplySubmitted={handleReplySubmitted} />
        </div>
      </div>
    </Layout>
  );
};

export default ReportDetail;
