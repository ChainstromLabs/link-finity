// NFTModal.tsx
import React from 'react';

import walleticp from '../../assets/linkfintyasset/icpwallet.png';
import walleteth from '../../assets/linkfintyasset/walleteth.png';
import solana from '../../assets/linkfintyasset/solana.png';

interface NFTModalProps {
    isModalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

function getRandomBgColor() {
    const colors = [
        "bg-indigo-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-red-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-teal-500",
        "bg-orange-500",
        "bg-gray-500"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}


const NFTModal: React.FC<NFTModalProps> = ({ isModalOpen, setModalOpen, activeTab, setActiveTab }) => {
    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="dark:bg-gray-800 w-full h-full max-w-3xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center dark:bg-gray-700 text-white p-4">
                            <div className="flex items-center">
                                {activeTab === "tab1" && (
                                    <>
                                        <img
                                            src={walleticp}
                                            alt="ICP Logo"
                                            className="w-8 h-8 mr-2"
                                        />
                                        <h2 className="text-xl font-bold">ICP Collection</h2>
                                    </>
                                )}
                                {activeTab === "tab2" && (
                                    <>
                                        <img
                                            src={walleteth}
                                            alt="ETH Logo"
                                            className="w-8 h-8 mr-2"
                                        />
                                        <h2 className="text-xl font-bold">EVM Collection</h2>
                                    </>
                                )}
                                {activeTab === "tab3" && (
                                    <>
                                        <img
                                            src={solana}
                                            alt="Solana Logo"
                                            className="w-8 h-8 mr-2"
                                        />
                                        <h2 className="text-xl font-bold">SOL Collection</h2>
                                    </>
                                )}
                            </div>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-2xl font-bold hover:text-gray-300"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex dark:bg-gray-700">
                            <button
                                onClick={() => setActiveTab("tab1")}
                                className={`
            flex-1 text-center py-2 font-semibold 
            ${activeTab === "tab1"
                                        ? "text-gray-100 border-b-2 border-gray-100"
                                        : "text-gray-400 hover:text-gray-100"}
        `}
                            >
                                <img
                                    src={walleticp}
                                    alt="ICP Logo"
                                    className="inline w-6 h-6 mr-1"
                                />
                                ICP
                            </button>

                            <button
                                onClick={() => setActiveTab("tab2")}
                                className={`
            flex-1 text-center py-2 font-semibold 
            ${activeTab === "tab2"
                                        ? "text-gray-100 border-b-2 border-gray-100"
                                        : "text-gray-400 hover:text-gray-100"}
        `}
                            >
                                <img
                                    src={walleteth}
                                    alt="ETH Logo"
                                    className="inline w-6 h-6 mr-1"
                                />
                                EVM
                            </button>

                            <button
                                onClick={() => setActiveTab("tab3")}
                                className={`
            flex-1 text-center py-2 font-semibold 
            ${activeTab === "tab3"
                                        ? "text-gray-100 border-b-2 border-gray-100"
                                        : "text-gray-400 hover:text-gray-100"}
        `}
                            >
                                <img
                                    src={solana}
                                    alt="Solana Logo"
                                    className="inline w-6 h-6 mr-1"
                                />
                                SOL
                            </button>
                        </div>

                        {/* Tabs Content */}
                        <div className="p-6 max-h-[90vh] overflow-y-auto">
                            {activeTab === "tab1" && (
                                <div>
                                    <div className="p-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                    </div>
                                </div>



                            )}
                            {activeTab === "tab2" && (
                                <div>
                                    <div className="p-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       
                                    </div>
                                </div>

                            )}
                            {activeTab === "tab3" && (
                <div>
                <div className="p-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
   
                </div>
            </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default NFTModal;
