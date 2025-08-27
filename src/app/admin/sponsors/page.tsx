'use client';

import { useState, useEffect } from 'react';

interface SponsorData {
  clusterId: string;
  country: string;
  stripeCustomerId: string;
  ratePerView: number;
  active: boolean;
  createdAt: number;
  lastBilled?: number;
}

interface SponsorWithMeta {
  clusterId: string;
  country: string;
  sponsor: SponsorData;
}

interface AnalyticsData {
  clusterId: string;
  country: string;
  views: number;
}

export default function SponsorsAdminPage() {
  const [sponsors, setSponsors] = useState<SponsorWithMeta[]>([]);
  const [newSponsor, setNewSponsor] = useState({
    clusterId: '',
    country: '',
    stripeCustomerId: '',
    ratePerView: 0.30
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().substring(0, 7));
  const [monthlyAnalytics, setMonthlyAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all sponsors
  const fetchSponsors = async () => {
    try {
      const response = await fetch('/api/sponsors');
      if (response.ok) {
        const data = await response.json();
        setSponsors(data);
      }
    } catch (error) {
      console.error('Failed to fetch sponsors:', error);
    }
  };

  // Fetch monthly analytics
  const fetchMonthlyAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?type=monthly-billing&month=${selectedMonth}`);
      if (response.ok) {
        const data = await response.json();
        setMonthlyAnalytics(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  };

  // Add new sponsor
  const addSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/sponsors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSponsor)
      });

      if (response.ok) {
        setNewSponsor({ clusterId: '', country: '', stripeCustomerId: '', ratePerView: 0.30 });
        await fetchSponsors(); // Refresh list
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Failed to add sponsor:', error);
      alert('Failed to add sponsor');
    }

    setLoading(false);
  };

  // Calculate billing amount for a sponsor
  const calculateBilling = (sponsor: SponsorData, views: number) => {
    return (views * sponsor.ratePerView).toFixed(2);
  };

  // Get analytics for a specific sponsor
  const getAnalyticsForSponsor = (clusterId: string, country: string) => {
    return monthlyAnalytics.find(a => a.clusterId === clusterId && a.country === country)?.views || 0;
  };

  useEffect(() => {
    fetchSponsors();
    fetchMonthlyAnalytics();
  }, [selectedMonth]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sponsor Management Dashboard</h1>

        {/* Add New Sponsor */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Sponsor</h2>
          <form onSubmit={addSponsor} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Cluster ID (e.g., coffee-machine-risk-assessment)"
              value={newSponsor.clusterId}
              onChange={(e) => setNewSponsor({...newSponsor, clusterId: e.target.value})}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Country (e.g., GB, US)"
              value={newSponsor.country}
              onChange={(e) => setNewSponsor({...newSponsor, country: e.target.value.toUpperCase()})}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Stripe Customer ID"
              value={newSponsor.stripeCustomerId}
              onChange={(e) => setNewSponsor({...newSponsor, stripeCustomerId: e.target.value})}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Rate per view (£0.30)"
              value={newSponsor.ratePerView}
              onChange={(e) => setNewSponsor({...newSponsor, ratePerView: parseFloat(e.target.value)})}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Sponsor'}
            </button>
          </form>
        </div>

        {/* Monthly Analytics */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Monthly Analytics</h2>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-medium text-blue-900">Total Clusters with Views</h3>
              <p className="text-2xl font-bold text-blue-600">{monthlyAnalytics.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-medium text-green-900">Total Views</h3>
              <p className="text-2xl font-bold text-green-600">
                {monthlyAnalytics.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <h3 className="font-medium text-purple-900">Active Sponsors</h3>
              <p className="text-2xl font-bold text-purple-600">
                {sponsors.filter(s => s.sponsor.active).length}
              </p>
            </div>
          </div>
        </div>

        {/* Sponsors List with Billing */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Active Sponsors & Billing</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Cluster</th>
                  <th className="px-4 py-2 text-left">Country</th>
                  <th className="px-4 py-2 text-left">Stripe Customer</th>
                  <th className="px-4 py-2 text-left">Rate/View</th>
                  <th className="px-4 py-2 text-left">Views ({selectedMonth})</th>
                  <th className="px-4 py-2 text-left">Amount Due</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {sponsors.map((item, index) => {
                  const views = getAnalyticsForSponsor(item.clusterId, item.country);
                  const amountDue = calculateBilling(item.sponsor, views);
                  
                  return (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{item.clusterId}</td>
                      <td className="px-4 py-2">
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {item.country}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-mono text-sm">{item.sponsor.stripeCustomerId}</td>
                      <td className="px-4 py-2">£{item.sponsor.ratePerView.toFixed(2)}</td>
                      <td className="px-4 py-2">{views.toLocaleString()}</td>
                      <td className="px-4 py-2 font-semibold">£{amountDue}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-block text-xs px-2 py-1 rounded ${
                          item.sponsor.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.sponsor.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {sponsors.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No sponsors added yet. Add your first sponsor above.
              </div>
            )}
          </div>
        </div>

        {/* Total Billing Summary */}
        {sponsors.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Billing Summary for {selectedMonth}</h2>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">
                £{sponsors.reduce((total, item) => {
                  const views = getAnalyticsForSponsor(item.clusterId, item.country);
                  return total + (views * item.sponsor.ratePerView);
                }, 0).toFixed(2)}
              </p>
              <p className="text-gray-600">Total revenue from {sponsors.filter(s => s.sponsor.active).length} active sponsors</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}