import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';
import { Badge } from '../../Components/ui/badge';
import { Check, X, MapPin, Calendar } from 'lucide-react';

// No TypeScript interfaces, just JSDoc for clarity
/**
 * @typedef {Object} FoundItem
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} location
 * @property {string} imageUrl
 * @property {('Pending'|'Approved'|'Rejected')} status
 * @property {string} dateFound
 * @property {string} reportedBy
 */

const FoundItemsTab = () => {
  /** @type {[FoundItem[], Function]} */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    setTimeout(() => {
      setItems([
        {
          id: '1',
          name: 'iPhone 13 Pro',
          description: 'Black iPhone 13 Pro found in the library study area',
          location: 'Main Library, 2nd Floor',
          imageUrl: '/blackiphone.jpg',
          status: 'Pending',
          dateFound: '2025-01-15',
          reportedBy: 'Wekesa Mmoja',
        },
        {
          id: '2',
          name: 'Blue Backpack',
          description: 'Nike blue backpack with laptop compartment',
          location: 'Student Center',
          imageUrl: '/nike.jpg',
          status: 'Approved',
          dateFound: '2025-01-14',
          reportedBy: 'Mike Lorch',
        },
        {
          id: '3',
          name: 'Car Keys',
          description: 'Toyota car keys with silver keychain',
          location: 'Near Gate E',
          imageUrl: '/toyota.jpeg',
          status: 'Pending',
          dateFound: '2025-01-13',
          reportedBy: 'Mike Johnson',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = async (itemId) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, status: 'Approved' } : item
    ));
  };

  const handleReject = async (itemId) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, status: 'Rejected' } : item
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9fb] w-full">
      <div className="mb-8 max-w-7xl mx-auto pt-8">
        <h1 className="text-3xl font-bold text-gray-900">Found Items</h1>
        <p className="text-gray-600 mt-2">Manage reported found items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pb-12 mt-8">
        {items.map((item, idx) => (
          <div
            className="flex"
            key={item.id}
            style={{ minHeight: '440px' }}
          >
            <Card className="flex flex-col w-full h-full p-4 m-2 bg-white rounded-xl shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="p-0 mb-2">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-56 object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent className="flex flex-col flex-1 p-0">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">{item.description}</p>
                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(item.dateFound).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-4">
                  Reported by: {item.reportedBy}
                </div>
                <div className="mt-auto pt-2 flex space-x-2">
                  <Button
                    onClick={() => handleApprove(item.id)}
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={item.status === 'Approved'}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(item.id)}
                    size="sm"
                    variant="destructive"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white border-none"
                    disabled={item.status === 'Rejected'}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoundItemsTab;
