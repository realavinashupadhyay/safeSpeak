
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Shield } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-12">
        <div className="max-w-md text-center">
          <Shield className="mx-auto h-16 w-16 text-safespeak-primary mb-4" />
          <h2 className="mb-8 font-extrabold text-6xl text-safespeak-dark">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold mb-4">Page Not Found</p>
          <p className="mt-4 mb-8 text-gray-600">
            We're sorry, the page you requested could not be found or may have been moved.
          </p>
          <Link to="/">
            <Button className="bg-safespeak-primary hover:bg-safespeak-secondary">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
