import { useState } from "react";


import walleticp from '../../assets/linkfintyasset/icpwallet.png';
import walleteth from '../../assets/linkfintyasset/walleteth.png';
import solana from '../../assets/linkfintyasset/solana.png';

interface getAllCoin {
    name: string;
    symbol: string;
    color: string;
    change: number;
    img: string;
    timestamp: string;
    status: string;
}

interface getTransaction {
    isModalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}


const getTransaction: React.FC<getTransaction> = ({ isModalOpen, setModalOpen, activeTab, setActiveTab }) => {

    const getAllCoin: getAllCoin[];

    const getAllCoinEVM: getAllCoin[];
    
    const getAllCoinSOLANA: getAllCoin[];

    const getTimeAgo = (timestamp: string) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - new Date(timestamp).getTime()) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);
      
        if (diffInYears > 0) {
            return `${diffInYears} years ago`;
          } else if (diffInMonths > 0) {
            return `${diffInMonths} months ago`;
          } else if (diffInDays > 0) {
            return `${diffInDays} days ago`;
          } else if (diffInHours > 0) {
            return `${diffInHours} hours ago`;
          } else if (diffInMinutes > 0) {
            return `${diffInMinutes} minutes ago`;
          } else {
            return `${diffInSeconds} seconds ago`;
          }
          
      };

    return (
        <>
            {/* Modal */}

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300">
                                <div className="p-6">
         
                                    <h2 className="text-2xl font-bold text-indigo-800 dark:text-white mb-4">Transactions</h2>
                                    
                                    <div className="space-y-4 max-h-[50vh] overflow-y-auto p-4 dark:bg-gray-700 rounded-lg">
                                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                        <div className="flex flex-col items-center">
                                            <p className="text-2xl sm:text-3xl font-bold  text-green-500">434</p>
                                            <p className="text-base font-normal text-gray-600 dark:text-gray-300">24 Hours</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-2xl sm:text-3xl font-bold  text-green-500">9.7K</p>
                                            <p className="text-base font-normal text-gray-600 dark:text-gray-300">This Week</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-2xl sm:text-3xl font-bold text-green-500">9.7K</p>
                                            <p className="text-base font-normal text-gray-600 dark:text-gray-300">All-Time</p>
                                        </div>
                                    </div>

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

                                        {activeTab === "tab1" && (
                                            <ul className="space-y-2">
                                                {getAllCoin.map((coin, index) => (
                                                    <li
                                                        key={index}
                                                        className="dark:bg-gray-800 p-4 shadow-lg rounded cursor-pointer transition-colors border-b-2 border-transparent hover:border-pink-500"
                                                    >
                                                        <div className="flex items-center">
                                                            {/* Coin Icon */}
                                                            <div className="w-12 text-3xl leading-none" >
                                                                <img
                                                                    src={coin.img}
                                                                    alt={`${coin.name} Logo`}
                                                                    className="w-10 h-10 rounded-full mr-4"
                                                                />
                                                            </div>



                                                            {/* Coin Name and Symbol */}
                                                            <div className="flex-grow">

                                                                <div className="text-white font-semibold">
                                                                    {coin.name}
                                                                    <span className="ml-3 text-gray-400">{coin.symbol}</span>
                                                                </div>

                                                                {/* Tanggal */}
                                                                <div className="text-gray-400 text-sm mt-1">
                                                                    {getTimeAgo(coin.timestamp)}
                                                                </div>


                                                            </div>


                                                            {/* Amount */}
                                                            <div
                                                                className={`font-semibold ${coin.change > 0 ? "text-green-500" : "text-red-500"
                                                                    }`}
                                                            >
                                                                {coin.change > 0 ? `+${coin.change}` : `${coin.change}`}
                                                                <div
  className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold text-white uppercase rounded-md select-none whitespace-nowrap 
  ${coin.status === "transfer" ? "bg-red-600 text-gray-900" : 
   coin.status === "confirmed" ? "bg-green-600 text-blue-900" :
   "bg-gray-500/20 text-gray-900"}`}
>
  <span>{coin.status}</span>
</div>

                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>


                                        )}


                                        {activeTab === "tab2" && (
                                            <ul className="space-y-2">
                                          {getAllCoinEVM.map((coin, index) => (
                                                    <li
                                                        key={index}
                                                        className="dark:bg-gray-800 p-4 shadow-lg rounded cursor-pointer transition-colors border-b-2 border-transparent hover:border-pink-500"
                                                    >
                                                        <div className="flex items-center">
                                                            {/* Coin Icon */}
                                                            <div className="w-12 text-3xl leading-none" >
                                                                <img
                                                                    src={coin.img}
                                                                    alt={`${coin.name} Logo`}
                                                                    className="w-10 h-10 rounded-full mr-4"
                                                                />
                                                            </div>



                                                            {/* Coin Name and Symbol */}
                                                            <div className="flex-grow">

                                                                <div className="text-white font-semibold">
                                                                    {coin.name}
                                                                    <span className="ml-3 text-gray-400">{coin.symbol}</span>
                                                                </div>

                                                                {/* Tanggal */}
                                                                <div className="text-gray-400 text-sm mt-1">
                                                                    {getTimeAgo(coin.timestamp)}
                                                                    (ARB)
                                                                </div>


                                                            </div>


                                                            {/* Amount */}
                                                            <div
                                                                className={`font-semibold ${coin.change > 0 ? "text-green-500" : "text-red-500"
                                                                    }`}
                                                            >
                                                                {coin.change > 0 ? `+${coin.change}` : `${coin.change}`}
                                                                <div
  className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold text-white uppercase rounded-md select-none whitespace-nowrap 
  ${coin.status === "transfer" ? "bg-red-600 text-gray-900" : 
   coin.status === "confirmed" ? "bg-green-600 text-blue-900" :
   "bg-gray-500/20 text-gray-900"}`}
>
  <span>{coin.status}</span>
</div>

                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>



                                        )}


                                        {activeTab === "tab3" && (
                                            <ul className="space-y-2">
                                         {getAllCoinSOLANA.map((coin, index) => (
                                                    <li
                                                        key={index}
                                                        className="dark:bg-gray-800 p-4 shadow-lg rounded cursor-pointer transition-colors border-b-2 border-transparent hover:border-pink-500"
                                                    >
                                                        <div className="flex items-center">
                                                            {/* Coin Icon */}
                                                            <div className="w-12 text-3xl leading-none" >
                                                                <img
                                                                    src={coin.img}
                                                                    alt={`${coin.name} Logo`}
                                                                    className="w-10 h-10 rounded-full mr-4"
                                                                />
                                                            </div>



                                                            {/* Coin Name and Symbol */}
                                                            <div className="flex-grow">

                                                                <div className="text-white font-semibold">
                                                                    {coin.name}
                                                                    <span className="ml-3 text-gray-400">{coin.symbol}</span>
                                                                </div>

                                                                {/* Tanggal */}
                                                                <div className="text-gray-400 text-sm mt-1">
                                                                    {getTimeAgo(coin.timestamp)}
                                                                </div>


                                                            </div>


                                                            {/* Amount */}
                                                            <div
                                                                className={`font-semibold ${coin.change > 0 ? "text-green-500" : "text-red-500"
                                                                    }`}
                                                            >
                                                                {coin.change > 0 ? `+${coin.change}` : `${coin.change}`}
                                                                <div
  className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold text-white uppercase rounded-md select-none whitespace-nowrap 
  ${coin.status === "transfer" ? "bg-red-600 text-gray-900" : 
   coin.status === "confirmed" ? "bg-green-600 text-blue-900" :
   "bg-gray-500/20 text-gray-900"}`}
>
  <span>{coin.status}</span>
</div>

                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}


                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end p-4">
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer flex items-center"
                                    >
                                        <i className="fas fa-times mr-2"></i> Close
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
        </>
    );
};

export default getTransaction;
