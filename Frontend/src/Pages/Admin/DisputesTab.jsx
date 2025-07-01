import React, { useEffect, useState } from "react";
import "../../css/LostItempage.css";

const DisputesTab = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolutionComments, setResolutionComments] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setDisputes([
        {
          id: '1',
          itemName: 'MacBook Pro 2021',
          itemImage: '/MacBook.jpeg',
          claimantName: 'Zakayo Juma',
          claimantEmail: 'zakayo@email.com',
          disputeReason: 'Original owner verification failed',
          evidenceText: 'I have the original receipt and can provide serial number verification. The laptop has my personal files and development environment setup.',
          status: 'Open',
          dateOpened: '2025-01-17',
        },
        {
          id: '2',
          itemName: 'Wireless Earbuds',
          itemImage: '/Airpods.jpeg',
          claimantName: 'Dismus Mwangi',
          claimantEmail: 'dismus@email.com',
          disputeReason: 'Multiple claimants for same item',
          evidenceText: 'These are my AirPods Pro. I can show the pairing history with my iPhone and have the original packaging at home.',
          status: 'Open',
          dateOpened: '2025-01-16',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleResolve = (disputeId, resolution) => {
    setDisputes(disputes.map(dispute =>
      dispute.id === disputeId ? { ...dispute, status: 'Resolved' } : dispute
    ));
    setResolutionComments(prev => ({ ...prev, [disputeId]: '' }));
  };

  const updateComment = (disputeId, comment) => {
    setResolutionComments(prev => ({ ...prev, [disputeId]: comment }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="lost-items-container">
      <div className="results-header">
        <h2>
          Disputes <span>{disputes.length} items</span>
        </h2>
        <div className="sorted-by">Sorted by: Newest First</div>
      </div>
      <div className="items-grid" style={{gap: '32px'}}>
        {disputes.map((dispute) => (
          <div
            key={dispute.id}
            className="dispute-card bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-shadow duration-200"
            style={{ minHeight: 340, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)' }}
          >
            <div>
              <div className="flex items-center gap-5 mb-4">
                <img
                  src={dispute.itemImage}
                  alt={dispute.itemName}
                  className="w-20 h-20 object-cover rounded-xl border border-gray-200 shadow-sm"
                  style={{ background: '#f3f4f6' }}
                />
                <div className="flex-1">
                  <div className="text-xl font-bold text-gray-800 mb-1">{dispute.itemName}</div>
                  <p className="text-xs text-gray-400">
                    Disputed on {new Date(dispute.dateOpened).toLocaleDateString()}
                  </p>
                </div>
                <span className={
                  dispute.status === 'Resolved'
                    ? 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold ml-auto'
                    : 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold ml-auto'
                }>
                  {dispute.status}
                </span>
              </div>
              <div className="mb-3 text-sm flex flex-col gap-1">
                <span className="font-semibold text-gray-700">Claimant:</span>
                <span className="text-gray-600 pl-2">{dispute.claimantName} ({dispute.claimantEmail})</span>
              </div>
              <div className="mb-3 text-sm flex flex-col gap-1">
                <span className="font-semibold text-gray-700">Dispute Reason:</span>
                <span className="text-red-600 pl-2">{dispute.disputeReason}</span>
              </div>
              <div className="mb-3 text-sm flex flex-col gap-1">
                <span className="font-semibold text-gray-700">Evidence:</span>
                <span className="text-gray-600 pl-2">{dispute.evidenceText}</span>
              </div>
            </div>
            {dispute.status === 'Open' && (
              <div className="border-t pt-4 mt-4 flex flex-col gap-3">
                <textarea
                  placeholder="Add your resolution comment..."
                  value={resolutionComments[dispute.id] || ''}
                  onChange={(e) => updateComment(dispute.id, e.target.value)}
                  className="mb-2 w-full border border-gray-200 rounded-xl p-3 text-base bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all duration-150 resize-none placeholder-gray-400"
                  rows={3}
                />
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={() => handleResolve(dispute.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-sm transition-all duration-150"
                  >
                    Approve Claim
                  </button>
                  <button
                    onClick={() => handleResolve(dispute.id, 'rejected')}
                    className="text-red-600 border border-red-200 hover:bg-red-50 px-6 py-3 text-lg font-semibold rounded-lg shadow-sm transition-all duration-150"
                  >
                    Reject Claim
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisputesTab;
