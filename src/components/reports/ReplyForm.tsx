
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface ReplyFormProps {
  reportId: number;
  onReplySubmitted: () => void;
}

interface FormData {
  content: string;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ reportId, onReplySubmitted }) => {
  const { user, isAuthenticated } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await api.replies.create(reportId, data.content);
      reset();
      onReplySubmitted();
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="p-4 text-center bg-muted/50">
        <p className="text-sm text-gray-600">
          Please sign in to provide support or advice.
        </p>
        <Button
          variant="link"
          className="text-safespeak-primary mt-2"
          onClick={() => window.location.href = '/login'}
        >
          Sign in
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="Share advice or support in a respectful manner..."
              {...register('content', {
                required: 'Please enter a response',
                minLength: {
                  value: 20,
                  message: 'Response should be at least 20 characters long'
                }
              })}
              className={`min-h-[120px] ${errors.content ? 'border-red-500' : ''}`}
            />
            {errors.content && (
              <span className="text-red-500 text-xs">{errors.content.message}</span>
            )}
          </div>
          
          {user?.role === 'helper' && (
            <div className="bg-safespeak-soft-gray p-3 rounded-md mt-3 text-xs text-gray-700">
              <span className="text-safespeak-primary font-medium">Helper Note:</span> Your response will be marked as coming from a verified helper. Remember to provide thoughtful, supportive advice.
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-safespeak-primary hover:bg-safespeak-secondary"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Response'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReplyForm;
