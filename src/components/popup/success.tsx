import React, { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface PopupProps {
    isVisible: boolean;
    onClose: () => void;
    txHash: string;
    tokenNames: string;
    name: string;
    amountDonation: number;
}

const Popup: React.FC<PopupProps> = ({
    isVisible,
    onClose,
    txHash,
    tokenNames,
    name,
    amountDonation,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsLoading(true);
            setIsSuccess(false);

            const loadingTimeout = setTimeout(() => {
                setIsLoading(false);
                setIsSuccess(true);
            }, 2000);

            return () => clearTimeout(loadingTimeout);
        } else {
            setIsLoading(false);
            setIsSuccess(false);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const handleCopyClick = () => {
        navigator.clipboard.writeText(txHash);
    };

    const thankYouMessage = (
        <div className="text-gray-700 mt-2 space-y-2">
            <p>
                Thank you{" "}
                <span className="font-semibold text-indigo-600">{name}</span> for your support!
            </p>
            <p>Amazing! You chose to donate with</p>
            <p className="font-medium text-indigo-500">{tokenNames}</p>
            <p>
                Donation amount:{" "}
                <span className="font-semibold text-green-500">
                    {amountDonation} tokens
                </span>.
            </p>
        </div>
    );

    return (
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 animate-fade"
            style={{ animationDelay: "200ms" }}
        >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                {isLoading && (
                    <>
                        <DotLottieReact
                            src="https://lottie.host/59ab056d-3871-4819-b2b3-178d8eb66cec/OnhcUQjkIZ.lottie"
                            loop
                            autoplay
                        />
                        <h2 className="text-2xl font-bold text-blue-600 mt-4">
                            Confirming Transaction
                        </h2>
                    </>
                )}

                {isSuccess && (
                    <DotLottieReact
                        src="https://lottie.host/efcfdc78-bd97-4519-880a-20d643115423/2ZGcqoFILK.lottie"
                        loop
                        autoplay
                    />
                )}

                {isSuccess && (
                    <>
                        <h2 className="text-xl font-bold mt-4 text-indigo-600">Success!</h2>

                        {thankYouMessage}

                        <div className="mt-4 space-y-2">
                            <p className="text-sm text-gray-500">
                                TX Hash:{" "}
                                <span
                                    className="text-indigo-600 cursor-pointer underline"
                                    onClick={handleCopyClick}
                                >
                                    {txHash}
                                </span>
                            </p>

                            <button
                                onClick={onClose}
                                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
                            >
                                Close
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Popup;
