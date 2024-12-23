import React, { useState, useEffect, useCallback } from "react";

import Flag from 'react-world-flags'
import countries from "world-countries";

import Popup from "../popup/success"
import Report from "../popup/report"
import Ai from "../ai/ai"
import Typechain from '../badge/typechain';
import ReportModal from '../modal/report';
import SupportModal from '../modal/tipsupport';
import Approve from '../modal/approve';

interface TrendingCardProps {
    title: string;
    data: Array<{
        coverImage: string;
        avatar: string;
        countryCode: string;
        tag1: string;
        tag2: string;
        tag3: string;
        tag4: string;
        name: string;
        username: string;
        bio: string;
        typechain: string;
        profileLink: string;
    }>;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ title, data }) => {


    const [visibleData, setVisibleData] = useState(data.slice(0, 4));
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);


    const [activeReport, setActiveReport] = useState<number | null>(null);
    const [reportReason, setReportReason] = useState("");

    const handleOpenModal = (id: number) => {
        setActiveReport(id);
        setReportReason("");
    };

    const handleCloseModal = () => {
        setActiveReport(null);
        setReportReason("");
    };

    const [isPopupVisibleReport, setPopupVisibleReport] = useState(false);

    const handleSubmitReport = (itemName: string) => {
        if (!reportReason.trim()) {
            alert("Please provide a reason for reporting.");
            return;
        }
        setPopupVisibleReport(true)
        handleCloseModal();
    };

    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    const getCountryName = (code: string) => {
        const country = countries.find((c) => c.cca2 === code || c.cca3 === code);
        return country ? country.name.common : "Unknown Country";
    };

    useEffect(() => {
        if (searchKeyword.trim() === "") {
            setFilteredData(data);
            setVisibleData(data.slice(0, 4));
            setHasMoreData(data.length > 4);
        } else {
            const filtered = data.filter((item) => {

                const countryName = getCountryName(item.countryCode);
                const searchLowerCase = searchKeyword.toLowerCase();

                return (
                    item.name.toLowerCase().includes(searchLowerCase) ||
                    item.username.toLowerCase().includes(searchLowerCase) ||
                    item.tag1.toLowerCase().includes(searchLowerCase) ||
                    item.tag2.toLowerCase().includes(searchLowerCase) ||
                    item.tag3.toLowerCase().includes(searchLowerCase) ||
                    item.tag4.toLowerCase().includes(searchLowerCase) ||
                    countryName.toLowerCase().includes(searchLowerCase) ||
                    item.typechain.toLowerCase().includes(searchLowerCase) ||
                    item.countryCode.toLowerCase().includes(searchLowerCase)
                );
            });
            setFilteredData(filtered);
            setVisibleData(filtered.slice(0, 4));
            setHasMoreData(filtered.length > 4);
        }
    }, [searchKeyword, data]);


    const loadMoreData = useCallback(() => {
        if (loadingProfile || !hasMoreData) return;

        setLoadingProfile(true);

        setTimeout(() => {
            const nextData = filteredData.slice(
                visibleData.length,
                visibleData.length + 4
            );
            if (nextData.length === 0) {
                setHasMoreData(false);
            } else {
                setVisibleData((prevData) => [...prevData, ...nextData]);
            }
            setLoadingProfile(false);
        }, 1000);
    }, [loadingProfile, hasMoreData, visibleData, filteredData]);


    useEffect(() => {
        const handleScroll = () => {
            const bottom =
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight;
            if (bottom) {
                loadMoreData();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loadMoreData]);


    const SkeletonLoader = () => {
        return (
            <div className="animate-pulse col-span-1">
                <div className="bg-gray-300 h-40 rounded-lg mb-4"></div>
                <div className="h-24 w-24 mx-auto bg-gray-300 rounded-full mb-4"></div>
                <div className="bg-gray-300 h-6 mb-2 w-1/2 mx-auto"></div>
                <div className="bg-gray-300 h-4 mb-2 w-3/4 mx-auto"></div>
                <div className="bg-gray-300 h-4 w-1/2 mx-auto"></div>
            </div>
        );
    };

    const [isTipActive, setIsTipActive] = useState(false);
    const [activeTipIndex, setActiveTipIndex] = useState<number | null>(null);

    const handleOpenTip = (index: number) => {
        setActiveTipIndex(index);
        setIsTipActive(true);
    };

    const handleCloseTip = () => {
        setActiveTipIndex(null);
        setIsTipActive(false);
    };

    ///Aprove 
    const [isApprovePopup, setApprovePopup] = useState(false);

    ////for service coming soon tip support
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [supportNames, setSupportNames] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [donationAmt, setDonationAmt] = useState<number>(0);


    const handleTipSubmit = (supportName: string, supportMessage: string, selectedToken: string, donationAmount: number) => {
        if (!supportName || !supportMessage || !selectedToken || !donationAmount) {
            alert("Semua field harus diisi!");
            return;
        }

    };


    const suksesApprove = () => {

        setApprovePopup(false)
        setPopupVisible(true);
        handleCloseTip();
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center mb-6 md:mb-8">
                <div className="flex flex-wrap justify-center items-center gap-4 w-full max-w-4xl px-4">
                    <div className="relative w-full md:w-2/5">
                        <input
                            className="appearance-none border-2 pl-10 border-indigo-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 focus:shadow-outline text-sm"
                            type="text"
                            placeholder="Search by chain, name, country & tag"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <div className="absolute right-0 inset-y-0 flex items-center pr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={() => setSearchKeyword('')}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-400 hover:text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="relative w-full md:w-1/4">
                        <select
                            className="appearance-none border-2 border-indigo-300 rounded-md py-2 px-3 pr-10 text-gray-800 leading-tight focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 focus:shadow-outline text-sm bg-white w-full"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        >
                            <option value="">🌍 All Tags</option>
                            <option value="influencer">📢 Influencer</option>
                            <option value="kol">👑 KOL</option>
                            <option value="hub">🔗 HUB</option>
                            <option value="defi">💸 DeFi</option>
                            <option value="dao">🏛️ DAO</option>
                            <option value="security">🛡️ Security</option>
                            <option value="meme">😂 Meme</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 9.707a1 1 0 010-1.414L9.586 4l4.293 4.293a1 1 0 11-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="relative w-full md:w-1/5">
                        <button onClick={handleAIButtonClick} className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-indigo-600 w-full">
                            <i className="fas fa-robot"></i> ASK AI
                        </button>
                    </div>
                </div>

                <Ai
                    searchKeyword={searchKeyword}
                    showArticle={showArticle}
                    articleContent={articleContent}
                    displayedWords={displayedWords}
                    setDisplayedWords={setDisplayedWords}
                    index={index}
                    setIndex={setIndex}
                />


            </div>


            <Approve
                isVisible={isApprovePopup}
                qty={donationAmt}
                onApprove={suksesApprove}
                onClose={() => setApprovePopup(false)}
            />


            <Popup isVisible={isPopupVisible} onClose={() => setPopupVisible(false)}

                txHash={txHash}
                tokenNames={tokenName}
                name={supportNames}
                amountDonation={donationAmt}

            />
            <Report isVisible={isPopupVisibleReport} onClose={() => setPopupVisibleReport(false)} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleData.map((item, index) => (
                    <div
                        key={index}
                        className={`animate-fade max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform scale-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-indigo-400`}
                        style={{ animationDelay: `${index * 20}ms` }}
                    >
                        <div className="relative h-40">
                            <img
                                src={item.coverImage}
                                alt="Cover Image"
                                className="w-full h-full object-cover"
                            />

                            {item.tag1 && (
                                <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
                                    {item.tag1}
                                </span>
                            )}
                            {item.tag2 && (
                                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
                                    {item.tag2}
                                </span>
                            )}
                            {item.tag3 && (
                                <span className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
                                    {item.tag3}
                                </span>
                            )}
                            {item.tag4 && (
                                <span className="absolute bottom-2 left-2 bg-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
                                    {item.tag4}
                                </span>
                            )}

                        </div>
                        <div className="relative -mt-12 flex justify-center group">
                            {/* Avatar */}
                            <img
                                src={item.avatar}
                                alt="Avatar"
                                className="w-24 h-24 rounded-full border-4 border-white glow-avatar"
                            />

                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M8.6 22.5L6.7 19.3L3.1 18.5L3.45 14.8L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"></path>
                                </svg>
                            </span>

                            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-5 bg-yellow-500 text-white text-sm font-bold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                                User has been verified
                            </div>
                        </div>


                        <div className="px-6 py-4 text-center">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center relative group">
                                <Flag code={item.countryCode} style={{ width: '30px', height: '25px', marginRight: '8px' }} />
                                {item.name}

                                {/* Tooltip */}
                                <div className="absolute bottom-7 left-1 bg-gray-700 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {getCountryName(item.countryCode)}
                                </div>
                            </h2>

                            <p className="text-sm text-gray-600 flex items-center justify-center">
                                @{item.username}
                                <button
                                    className="ml-2 text-red-500 hover:text-red-700"
                                    title="Report user"
                                    onClick={() => handleOpenModal(index)}
                                >
                                    <i className="fas fa-exclamation-triangle"></i>
                                </button>
                            </p>
                            <p className="mt-2 text-gray-700">
                                {item.bio.length > 120 ? `${item.bio.slice(0, 117)}...` : item.bio}
                            </p>
                        </div>

                        <ReportModal
                            isOpen={activeReport === index}
                            onClose={handleCloseModal}
                            onSubmit={() =>
                                activeReport === index && handleSubmitReport(item.name)
                            }
                            reportReason={reportReason}
                            setReportReason={setReportReason}
                            userName={item.name}
                        />

                        <div className="px-6 py-2 text-center">
                            <Typechain item={item} />
                        </div>

                        <div className="px-6 py-4 text-center">

                            <a
                                href={item.profileLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-indigo-500 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-indigo-600 mr-2"
                            >
                                <i className="fas fa-user mr-2"></i>
                                Visit Profile
                            </a>

                            <a
                                onClick={() => handleOpenTip(index)}
                                rel="noopener noreferrer"
                                className="cursor-pointer inline-flex items-center bg-red-500 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-red-600"
                            >
                                <i className="fas fa-donate mr-2"></i>
                                Send Support
                            </a>

                            <SupportModal
                                isActive={isTipActive && activeTipIndex === index}
                                itemName={item.name}
                                onClose={handleCloseTip}
                                onSubmit={handleTipSubmit}
                            />

                        </div>


                    </div>


                ))}

                {loadingProfile && hasMoreData && <SkeletonLoader />}

            </div>
        </div>
    );
};

export default TrendingCard;
