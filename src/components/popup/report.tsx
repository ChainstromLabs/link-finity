import React from "react";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const Report: React.FC<PopupProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 animate-fade" style={{ animationDelay: `200ms` }}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
        <DotLottieReact
          src="https://lottie.host/096ff352-3856-4ca9-8aa7-13d0157040a3/0J70C3ph7k.lottie"
          loop
          autoplay
        />
        <h2 className="text-lg font-bold mt-4 text-indigo-600">Report Successful!</h2>
        <p className="text-gray-600 mt-2">Your report has been received and is being processed. Thank you for helping us maintain the community.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Report;
