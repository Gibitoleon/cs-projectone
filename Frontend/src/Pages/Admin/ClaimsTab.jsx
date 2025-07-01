// ClaimsTab.jsx - Modernized Claims Tab UI with custom UI components (JSX version)
import { useEffect, useState } from 'react';
import { Button } from '../../Components/ui/button';
import { Badge } from '../../Components/ui/badge';
import { Check, X, AlertTriangle, User, MessageSquare } from 'lucide-react';

const ClaimsTab = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setClaims([
        {
          id: '1',
          itemName: 'iPhone 13 Pro',
          itemImage: '/Iphone13promax.jpg',
          claimantName: 'Gabu Wilson',
          claimantEmail: 'gabu@email.com',
          verificationQuestion: 'What was the last app you used on this phone?',
          verificationAnswer: 'Instagram',
          additionalInfo: 'I lost it while studying in the library yesterday evening around 8 PM.',
          status: 'Pending',
          dateSubmitted: '2024-01-16',
        },
        {
          id: '2',
          itemName: 'Blue Backpack',
          itemImage: '/bluebag.jpg',
          claimantName: 'Alex Wantam',
          claimantEmail: 'alex@email.com',
          verificationQuestion: 'What items were inside the main compartment?',
          verificationAnswer: 'MacBook Pro, charger, and a statistics textbook',
          additionalInfo: 'Left it in the student center while getting food.',
          status: 'Pending',
          dateSubmitted: '2024-01-15',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = async (claimId) => {
    console.log('Approving claim:', claimId);
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: 'Approved' } : claim
    ));
  };

  const handleReject = async (claimId) => {
    console.log('Rejecting claim:', claimId);
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: 'Rejected' } : claim
    ));
  };

  const handleEscalate = async (claimId) => {
    console.log('Escalating claim to dispute:', claimId);
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: 'Disputed' } : claim
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Disputed':
        return 'bg-orange-100 text-orange-700 border-orange-200';
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
    <div className="min-h-screen bg-gray-50 py-10 px-2">
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Claims</h1>
        <p className="text-gray-600 text-lg">Review and manage item claims</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {claims.map((claim) => (
          <div key={claim.id} className="relative rounded-2xl shadow-md p-6 bg-white flex flex-col min-h-[420px]">
            {/* Pending badge */}
            {claim.status === 'Pending' && (
              <span className="absolute top-5 right-5 bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold shadow-sm z-10">
                Pending
              </span>
            )}
            {/* Card content */}
            <div className="flex items-center gap-5 mb-4">
              <img
                src={claim.itemImage}
                alt={claim.itemName}
                className="w-20 h-20 object-cover rounded-xl border border-gray-200 shadow-sm"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{claim.itemName}</h2>
                <p className="text-sm text-gray-500">Claimed on {new Date(claim.dateSubmitted).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mb-3">
              <h4 className="font-semibold text-gray-800 mb-1 flex items-center gap-2 text-base">
                <User className="h-4 w-4" /> Claimant Information
              </h4>
              <div className="text-sm text-gray-700 ml-6">
                <p><span className="font-medium">Name:</span> {claim.claimantName}</p>
                <p><span className="font-medium">Email:</span> {claim.claimantEmail}</p>
              </div>
            </div>
            <div className="mb-3">
              <h4 className="font-semibold text-gray-800 mb-1 flex items-center gap-2 text-base">
                <MessageSquare className="h-4 w-4" /> Verification
              </h4>
              <div className="text-sm text-gray-700 ml-6">
                <p><span className="font-medium">Question:</span> {claim.verificationQuestion}</p>
                <p><span className="font-medium">Answer:</span> {claim.verificationAnswer}</p>
              </div>
            </div>
            <div className="mb-5">
              <h4 className="font-semibold text-gray-800 mb-1 text-base">Additional Information</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg ml-1">
                {claim.additionalInfo}
              </p>
            </div>
            {/* Action buttons */}
            {claim.status === 'Pending' && (
              <div className="flex flex-col md:flex-row gap-3 mt-auto">
                <Button
                  onClick={() => handleApprove(claim.id)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-md w-full md:w-auto"
                >
                  <Check className="h-5 w-5 mr-2" /> Approve Claim
                </Button>
                <Button
                  onClick={() => handleReject(claim.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-md w-full md:w-auto"
                >
                  <X className="h-5 w-5 mr-2" /> Reject Claim
                </Button>
                <Button
                  onClick={() => handleEscalate(claim.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded shadow-md w-full md:w-auto"
                >
                  <AlertTriangle className="h-5 w-5 mr-2" /> Escalate to Dispute
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimsTab;
