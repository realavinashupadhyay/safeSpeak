
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reply } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import { ThumbsUp, AlertCircle, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ReplyCardProps {
  reply: Reply;
  reportId: number;
}

const ReplyCard: React.FC<ReplyCardProps> = ({ reply, reportId }) => {
  const { user, isAuthenticated } = useAuth();
  const [upvotes, setUpvotes] = useState(reply.upvotes);
  const [isUpvoting, setIsUpvoting] = useState(false);
  
  const isOP = reply.isOP;
  const isHelper = reply.isHelper;
  
  const handleUpvote = async () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You need to login to upvote responses."
      });
      return;
    }
    
    // Check if user is allowed to upvote
    const canUpvote = user?.role === 'helper' || user?.id === String(reportId);
    if (!canUpvote) {
      toast({
        variant: "destructive",
        title: "Not allowed",
        description: "Only original posters or verified helpers can upvote responses."
      });
      return;
    }
    
    try {
      setIsUpvoting(true);
      const updatedReply = await api.replies.upvote(reportId, reply.id);
      setUpvotes(updatedReply.upvotes);
      toast({
        title: "Upvoted successfully",
        description: "Thank you for recognizing helpful content."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upvote failed",
        description: error instanceof Error ? error.message : "Failed to upvote the reply."
      });
    } finally {
      setIsUpvoting(false);
    }
  };

  return (
    <Card className={cn(
      "transition-all",
      isHelper ? "border-l-4 border-l-safespeak-primary" : "",
      upvotes > 5 ? "bg-safespeak-soft-gray" : ""
    )}>
      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{reply.username}</span>
            {isHelper && (
              <span className="bg-safespeak-soft-gray text-safespeak-primary px-2 py-0.5 rounded-full text-xs flex items-center">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Helper
              </span>
            )}
            {isOP && (
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                Original Poster
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
          </span>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="text-gray-700 text-sm whitespace-pre-wrap">{reply.content}</div>
      </CardContent>
      <CardFooter className="pt-1 pb-3">
        <Button
          size="sm"
          variant="ghost"
          className="text-gray-500 hover:text-safespeak-primary gap-1.5"
          onClick={handleUpvote}
          disabled={isUpvoting}
        >
          <ThumbsUp className={cn(
            "h-4 w-4",
            upvotes > 0 ? "text-safespeak-primary fill-safespeak-primary" : ""
          )} />
          <span className={cn(
            "text-sm",
            upvotes > 0 ? "text-safespeak-primary font-medium" : ""
          )}>{upvotes}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReplyCard;
