import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const SalikDashboard = () => {
  return (
    <>
      <div className="container mx-auto py-6 bg-salik-beige min-h-[calc(100vh-4.1rem)]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Salik Souq Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome to your Salik Souq account. Manage your tolls and payments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/cost-estimator"
                  className="text-salik-blue hover:underline"
                >
                  Estimate monthly costs
                </Link>
              </li>
              <li>
                <Link to="/salik-dashboard" className="text-salik-blue hover:underline">
                  View toll gate map
                </Link>
              </li>
              <li>
                <Link to="/salik-dashboard" className="text-salik-blue hover:underline">
                  Make a payment
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-600">No recent toll activity to display.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
            <p className="text-2xl font-bold text-themeDark">AED 0.00</p>
            <p className="text-sm text-gray-500 mt-1">Last updated: Today</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Salik Cost Estimator</h2>
          <p className="text-gray-600 mb-4">
            Plan your budget by estimating your monthly Salik toll expenses
            based on your commute patterns. Our advanced calculator helps you
            understand your potential costs.
          </p>
          <Link
            to="/cost-estimator"
            // className="inline-block bg-salik-blue hover:bg-salik-darkblue text-white px-4 py-2 rounded-md transition-colors"
          >
            <Button variant="primary">Try Cost Estimator</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SalikDashboard;
