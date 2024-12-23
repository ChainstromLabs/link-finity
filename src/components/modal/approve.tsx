import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PopupProps {
    isVisible: boolean;
    qty: number;
    onApprove: () => void;
    onClose: () => void;
}

const ApproveTransactionPopup: React.FC<PopupProps> = ({ isVisible, qty, onApprove, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 animate-fade" style={{ animationDelay: `200ms` }}>
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
                <DotLottieReact
                    src="https://lottie.host/9df17ca1-2481-4ab3-8ace-ee87c2dd2d5f/WqLAYHAFUQ.lottie"
                    loop
                    autoplay
                />
                <h2 className="text-lg font-bold mt-4 text-indigo-600">Approve Transaction</h2>
                <p className="text-gray-600 mt-2">Do you want to approve this transaction? Please confirm your choice.</p>
                <span className="font-semibold text-green-500">
                    Quantity: {qty}
                </span>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        Close
                    </button>
                    <button
                        onClick={onApprove}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApproveTransactionPopup;
