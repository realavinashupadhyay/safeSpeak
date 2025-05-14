
import React from 'react';
import Layout from '@/components/layout/Layout';
import NewReportForm from '@/components/reports/NewReportForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

const NewReport = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <NewReportForm />
      </div>
    </Layout>
  );
};

export default NewReport;
