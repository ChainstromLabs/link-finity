import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../../assets/linkfintyasset/logo.png";

import Flag from 'react-world-flags'
import countries from "world-countries";

import SocialMedia from "../social/socialMedia";

import TagButton from "../tags/tags";
import SupportModal from '../modal/tipsupport';

import Approve from '../modal/approve';
import Popup from "../popup/success"
import ReportModal from '../modal/report';
import Report from "../popup/report"

import NFTModal from '../modal/getallNFT';

import TeamMember from '../modal/teamMembers';

import GetTransaction from '../modal/getTransaction';

import TwitterTimeline from '../embed/twitter';

import EffectParticel from '../effect/particel';

import YoutubeEmbed from '../embed/youtube';

import SpotifyEmbed from '../embed/spotify';

import WebsiteIframe from '../embed/website';


interface Profile {
    bio: string;
    media_social: {
        platform: string
        link: string

    }[];
    tags: {
        icon: string;
        text: string;
        color: string;
    }[];
    avatar_url: string;
    banner_url: string;
    name: string;
    address: string;
    typechain: string;
    countryCode: string;
    link: string;
}

const Preview: React.FC = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState<Profile | null>(null);


    const getCountryName = (code: string) => {
        const country = countries.find((c) => c.cca2 === code || c.cca3 === code);
        return country ? country.name.common : "Unknown Country";
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

    const tokenNames: { [key: string]: string } = {
        ckbtc: "CKBTC",
        cketh: "CKETH",
        ckusdc: "CKUSDC",
        usdc: "USDC",
        usdt: "USDT",
        JUP: "JUP",
        HONEY: "HONEY",
        HNT: "HNT",
    };

    const handleTipSubmit = (supportName: string, supportMessage: string, selectedToken: string, donationAmount: number) => {
        if (!supportName || !supportMessage || !selectedToken || !donationAmount) {
            alert("Semua field harus diisi!");
            return;
        }

        const fullTokenName = tokenNames[selectedToken] || "Unknown Token";

        setTxHash("f23a1239...2fa2as8fa6e41f0d");
        setSupportNames(supportName);
        setTokenName(fullTokenName);
        setDonationAmt(donationAmount);
        setApprovePopup(true);
    };


    const suksesApprove = () => {

        setApprovePopup(false)
        setPopupVisible(true);
        handleCloseTip();
    }


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

    const [isModalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("tab1");

    const [isModalOpenTeam, setIsModalOpenTeam] = useState(false);

    const openModalTeam = () => setIsModalOpenTeam(true);
    const closeModal = () => setIsModalOpenTeam(false);

    const [activeTabTransaction, setActiveTabTransasction] = useState("tab1");
    const [isModalOpenTransaction, setModalOpenTransaction] = useState(false);


    const usernameTimeline = "dfinity";
    const urlVideoTwitter = "https://twitter.com/dominic_w/status/1793391153326285102";
    const urlPinnedTwitter = "https://twitter.com/dfinity/status/1864719054658842947";
    const urlYoutube = "https://www.youtube.com/embed/2s2amSYj26U";
    const urlYoutubePlaylist = "https://www.youtube.com/embed/videoseries?list=PLuhDt1vhGcrfQty7Vwt0mwBpndTC2pGEH";
    const uriTrack = "https://open.spotify.com/album/06a7H7nusNMvM7yL8m3fy1";


    const [isOpenAccordianTweet, setIsOpenACcordianTweet] = useState(false);
    const toggleAccordion = () => {
        setIsOpenACcordianTweet(!isOpenAccordianTweet);
    };


    ///WEB
    const [websiteContent, setWebsiteContent] = useState({
        url: "http://localhost:3000/app",
        modal: false, 
    });
    const toggleModal = () => {
        setWebsiteContent((prevContent) => ({
            ...prevContent,
            modal: !prevContent.modal,
        }));
    };



    return (
        <div>
            <EffectParticel />
            <canvas className="canvasParticel" id="cosmosCanvas"></canvas>
            {profile && (
                <>
                    <div className="flex flex-col justify-center items-center min-h-screen w-full px-50 bg-white dark:bg-[#101419]">


                        <div className="relative flex flex-col items-center rounded-t-[60px] w-full sm:max-w-[1200px] mx-auto bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:bg-[#151920] dark:text-white dark:!shadow-none">

                            {/* Banner */}
                            <div className="relative flex h-[19rem] w-full justify-center bg-cover">

                                                    <img
                                src={profile.banner_url && profile.banner_url.trim() !== "" ? profile.banner_url : ""}
                                className="absolute h-[19rem] w-full rounded-tl-[50px] rounded-tr-[50px] object-cover"
                                alt="Banner"
                                />

                                <div className="group absolute -bottom-16 sm:-bottom-20 md:-bottom-24 lg:-bottom-16 flex h-[150px] w-[150px] sm:h-[160px] sm:w-[160px] items-center justify-center rounded-full border-[6px] border-white bg-pink-400 dark:!border-navy-700">
                                    <img
                                        className="h-full w-full rounded-full border-white glow-avatar-bio"
                                        src={profile ? profile.avatar_url : "https://via.placeholder.com/150"}
                                    />

                                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M8.6 22.5L6.7 19.3L3.1 18.5L3.45 14.8L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45l-3.4 1.45Zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12l3.55 3.55Z"></path>
                                        </svg>
                                    </span>


                                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-7 left-1 bg-yellow-500 text-white text-sm font-bold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        Verified
                                    </div>

                                </div>
                                <div className="absolute bottom-2 right-2 flex gap-4">


                                    <button
                                        className="flex items-center gap-2 bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
                                        title="Report"
                                        onClick={() => handleOpenModal(1)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                        </svg>
                                        Report
                                    </button>

                                </div>

                                <div className="absolute bottom-2 left-2 flex gap-4">

                                    <button
                                        className="flex items-center gap-2 bg-purple-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition-all duration-200"
                                        title="Support User"
                                        onClick={() => handleOpenTip(1)}
                                    >
                                        <i className="fa-solid fa-circle-dollar-to-slot"></i>
                                        Tip Me

                                    </button>
                                </div>

                            </div>



                            {/* User Info */}
                            <div className="mt-20 flex flex-col items-center text-center">
                                <div className="border-2 border-gray-300 dark:border-gray-700 p-6 rounded-lg max-w-5xl w-full">
                                    <div className="flex items-center justify-center space-x-2">
                                        <h4 className="text-2xl sm:text-3xl font-bold text-navy-700 dark:text-white">
                                            {profile.name}
                                        </h4>
                                        <div className="relative group">
                                            {profile.countryCode && (
                                                <Flag
                                                    code={profile.countryCode}
                                                    style={{
                                                        width: '30px',
                                                        height: '25px',
                                                    }}
                                                />
                                            )}
                                            {/* Popup tooltip saat hover */}
                                            <div className="absolute bottom-7 left-1 bg-gray-700 text-white text-sm font-bold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                {getCountryName(profile.countryCode)}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="sm:text-lg text-white">
                                        {profile.bio}
                                    </p>


                                    <div className="mt-2 flex flex-wrap gap-2 justify-center text-center">
                                        {profile?.tags &&
                                            profile.tags.map((tag, index) => (
                                                <TagButton
                                                    key={index}
                                                    icon={tag.icon}
                                                    label={tag.text}
                                                    color={tag.color}
                                                />
                                            ))
                                        }
                                    </div>



                                    {/* Buttons Row */}
                                    <div className="mt-6 flex flex-wrap gap-3 justify-center">
                                        <SocialMedia profile={profile} />
                                    </div>

                                    {/* Stats Untuk Media Social Or Transaction */}
                                    {/* <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                        <div className="flex flex-col items-center">
                                            <p className="text-2xl sm:text-3xl font-bold text-red-500 dark:text-red-400">434</p>
                                            <p className="text-base font-normal text-gray-600 dark:text-gray-300">Following</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <p className="text-2xl sm:text-3xl font-bold text-red-500 dark:text-red-400">9.7K</p>
                                            <p className="text-base font-normal text-gray-600 dark:text-gray-300">Followers</p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="mt-6 w-full ">
                                <SpotifyEmbed uriTrack={uriTrack} />
                            </div>



                            {/* Buttons Column */}
                            <div className="mt-3 flex flex-col gap-4 items-center pt-5 pb-0 lg:pt-2 max-w-5xl">
                                <button
                                    type="button"
                                    className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 transform hover:scale-105 transition-transform duration-200"
                                >
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">This Example Link Href</span>
                                    <div>
                                        <i className="fa-solid fa-link"></i>
                                    </div>
                                </button>

                                <button
                                    onClick={toggleModal}
                                    type="button"
                                    className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 transform hover:scale-105 transition-transform duration-200"
                                >
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">See My Website</span>
                                    <div>
                                        <i className="fa-solid fa-link"></i>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsModalOpenTeam(true)}
                                    className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 transform hover:scale-105 transition-transform duration-200"
                                >
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">See ALL Team Members</span>
                                    <div>
                                        <i className="fa-solid fa-link"></i>
                                    </div>

                                </button>


                                <button
                                    type="button"
                                    onClick={() => setModalOpenTransaction(true)}
                                    className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 transform hover:scale-105 transition-transform duration-200"
                                >
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">See ALL Transaction</span>
                                    <div>
                                        <i className="fa-solid fa-link"></i>
                                    </div>

                                </button>


                                <button
                                    type="button"
                                    onClick={() => setModalOpen(true)}
                                    className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 transform hover:scale-105 transition-transform duration-200"
                                >
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">See ALL Onchain NFT</span>
                                    <div>
                                        <i className="fa-solid fa-link"></i>
                                    </div>

                                </button>




                            </div>

                            <div className="mt-3 w-full max-w-[728px] h-[90px] bg-gray-300 flex items-center justify-center rounded-lg shadow-lg overflow-hidden group mx-auto">
                                <img
                                    src="https://i.imgur.com/jGsNvV1.png"
                                    alt="Banner Ad 728x90"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="mt-6 w-[300px] h-[250px] bg-gray-300 flex items-center justify-center group">
                                <img
                                    src="https://i.imgur.com/shmz5v0.png"
                                    alt="Rectangle Ad 300x250"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="mt-6 flex flex-col gap-4 items-center pt-5 pb-0 lg:pt-2 max-w-5xl">
                                <button
                                    type="button"
                                    onClick={toggleAccordion}
                                    className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 transform hover:scale-105 transition-transform duration-200"
                                >
                                    <img src={logo} alt="Accordion Logo" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">See Timeline Tweets  <i className={`fa-solid ${isOpenAccordianTweet ? "fa-chevron-up" : "fa-chevron-down"}`}></i></span>

                                </button>

                            </div>

                            {/* Accordion Content */}
                            {isOpenAccordianTweet && (
                                <TwitterTimeline username={usernameTimeline} />
                            )}
                            <div className="flex flex-col items-center max-w-5xl">

                                <TwitterTimeline url={urlVideoTwitter} />
                            </div>

                            <div className="flex flex-col items-center max-w-5xl">

                                <TwitterTimeline pinnedurl={urlPinnedTwitter} />
                            </div>



                            <div className="flex flex-col items-center max-w-5xl">
                                <YoutubeEmbed url={urlYoutube} />
                            </div>
                            <div className="flex flex-col items-center max-w-5xl">
                                <YoutubeEmbed playlist={urlYoutubePlaylist} />
                            </div>



                        </div>
                    </div>



                    <WebsiteIframe
                        url={websiteContent.url}
                        modal={websiteContent.modal}
                        setModal={toggleModal}
                    />

                    <ReportModal
                        isOpen={activeReport === 1}
                        onClose={handleCloseModal}
                        onSubmit={() =>
                            handleSubmitReport(profile.name)
                        }
                        reportReason={reportReason}
                        setReportReason={setReportReason}
                        userName={profile.name}
                    />

                    <SupportModal
                        isActive={isTipActive}
                        itemName={profile.name}
                        onClose={handleCloseTip}
                        onSubmit={handleTipSubmit}
                    />

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

                    <TeamMember isModalOpen={isModalOpenTeam} closeModal={closeModal} />

                    <GetTransaction
                        isModalOpen={isModalOpenTransaction}
                        setModalOpen={setModalOpenTransaction}
                        activeTab={activeTabTransaction}
                        setActiveTab={setActiveTabTransasction}
                    />

                    <NFTModal
                        isModalOpen={isModalOpen}
                        setModalOpen={setModalOpen}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />


                </>
            )}


        </div>

    );
};

export default Preview;
