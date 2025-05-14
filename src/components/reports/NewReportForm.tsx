
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Loader2, Shield } from 'lucide-react';

interface FormData {
  title: string;
  content: string;
  category: string;
  anonymous: boolean;
}

const NewReportForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<FormData>({
    defaultValues: {
      anonymous: true,
      category: 'harassment'
    }
  });
  
  const navigate = useNavigate();
  const anonymous = watch('anonymous');
  
  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.reports.create({
        title: data.title,
        content: data.content,
        category: data.category,
        anonymous: data.anonymous
      });
      
      navigate(`/report/${response.id}`);
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Submit a New Report</CardTitle>
        <CardDescription>
          Share your situation in a safe, anonymous space to receive support and advice
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Brief summary of your situation"
              {...register('title', { required: 'Title is required' })}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <span className="text-red-500 text-xs">{errors.title.message}</span>
            )}
          </div>
          
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              onValueChange={(value) => setValue('category', value)} 
              defaultValue="harassment"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="cyberbullying">Cyberbullying</SelectItem>
                <SelectItem value="blackmail">Blackmail/Extortion</SelectItem>
                <SelectItem value="assault">Assault</SelectItem>
                <SelectItem value="discrimination">Discrimination</SelectItem>
                <SelectItem value="stalking">Stalking</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="content">Your Situation</Label>
            <Textarea
              id="content"
              placeholder="Describe your situation in detail. The more information you provide, the better advice you'll receive."
              {...register('content', { 
                required: 'Content is required',
                minLength: { 
                  value: 50, 
                  message: 'Please provide more details (at least 50 characters)'
                }
              })}
              className={`min-h-[200px] ${errors.content ? 'border-red-500' : ''}`}
            />
            {errors.content && (
              <span className="text-red-500 text-xs">{errors.content.message}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="anonymous" 
              checked={anonymous}
              onCheckedChange={(checked) => setValue('anonymous', checked as boolean)} 
            />
            <Label htmlFor="anonymous" className="text-sm text-gray-700 cursor-pointer">
              Submit anonymously (recommended for sensitive issues)
            </Label>
          </div>
          
          <div className="bg-safespeak-soft-gray p-3 rounded-md flex items-start space-x-3">
            <Shield className="h-5 w-5 text-safespeak-primary mt-0.5" />
            <div className="text-xs text-gray-700">
              <p className="font-medium text-safespeak-secondary">Your safety is our priority</p>
              <p className="mt-1">
                We recommend keeping your report anonymous for sensitive issues. Only verified helpers can respond with advice. Our platform never shares your personal data.
              </p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="outline" 
          className="mr-2"
          onClick={() => navigate('/dashboard')} 
          disabled={isSubmitting}
        >
          Cancel
        </Button>
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
            'Submit Report'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewReportForm;
