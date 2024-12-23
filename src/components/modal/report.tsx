import React from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  reportReason: string;
  setReportReason: (reason: string) => void;
  userName: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit, reportReason, setReportReason, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Report {userName}</h3>
        <p className="mb-2">Why are you reporting this user?</p>
        <textarea
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Enter your reason here..."
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onSubmit}
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
