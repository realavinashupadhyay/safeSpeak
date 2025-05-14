
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ReportCard from '@/components/reports/ReportCard';
import { Button } from '@/components/ui/button';
import { api, Report } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth';
import { Loader2, PlusCircle, Search } from 'lucide-react';

const Dashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await api.reports.getAll();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReports();
  }, []);
  
  const filteredReports = reports.filter((report) => {
    // Filter by tab
    if (activeTab === 'open' && report.status !== 'open') return false;
    if (activeTab === 'in_progress' && report.status !== 'in_progress') return false;
    if (activeTab === 'resolved' && report.status !== 'resolved') return false;
    
    // Filter by category
    if (category !== 'all' && report.category !== category) return false;
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        report.title.toLowerCase().includes(query) ||
        report.content.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Community Reports</h1>
            <p className="text-gray-600 mt-2">Browse issues and provide support</p>
          </div>
          
          {isAuthenticated && (
            <Link to="/report/new">
              <Button className="mt-4 md:mt-0 bg-safespeak-primary hover:bg-safespeak-secondary">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Report
              </Button>
            </Link>
          )}
        </div>
        
        <div className="mb-6">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reports..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select onValueChange={setCategory} defaultValue="all">
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="cyberbullying">Cyberbullying</SelectItem>
              <SelectItem value="blackmail">Blackmail</SelectItem>
              <SelectItem value="discrimination">Discrimination</SelectItem>
              <SelectItem value="stalking">Stalking</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-safespeak-primary animate-spin" />
          </div>
        ) : (
          <>
            {filteredReports.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredReports.map((report) => (
                  <ReportCard key={report.id} report={report} replies={Math.floor(Math.random() * 5)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium">No reports found</h3>
                <p className="text-gray-500 mt-1">
                  {searchQuery 
                    ? "No reports match your search criteria" 
                    : "Be the first to create a report in this category"}
                </p>
                
                {isAuthenticated && (
                  <Link to="/report/new">
                    <Button className="mt-4 bg-safespeak-primary hover:bg-safespeak-secondary">
                      Create New Report
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
