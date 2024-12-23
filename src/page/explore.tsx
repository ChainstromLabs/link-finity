import React, { useEffect, useState } from "react";

import Navbar from "../components/header/nav";
import { useActor } from "../ic/Actors";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import TrendingCard from "../components/card/cardProfile";

export default function ExplorePage() {

    const { actor } = useActor();

    const [activeTab, setActiveTab] = useState("Trending");
    const [loading, setLoading] = useState(false);

    const handleTabClick = (tab: string) => {
        if (tab !== activeTab) {
            setLoading(true);
            setTimeout(() => {
                setActiveTab(tab);
                setLoading(false);
            }, 100);
        }
    };


    const renderContent = () => {
        if (loading) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Skeleton Card */}
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
                        >
                            {/* Cover Image */}
                            <div className="relative h-20 bg-gray-300"></div>

                            {/* Avatar */}
                            <div className="relative -mt-12 flex justify-center">
                                <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white"></div>
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gray-300 rounded-full w-8 h-8"></div>
                            </div>

                            {/* Profile Details */}
                            <div className="px-16 py-4 text-center space-y-3">
                                <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                            </div>

                            {/* Stats or Featured Badge */}
                            <div className="px-16 py-2 text-center">
                                <div className="h-6 bg-gray-300 rounded w-32 mx-auto"></div>
                            </div>

                            {/* Action Button */}
                            <div className="px-16 py-4 text-center">
                                <div className="h-10 bg-gray-300 rounded-full w-36 mx-auto"></div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        switch (activeTab) {
            case "Trending":
                return   <TrendingCard title="Popular Cards" data={trendingData} />;
            case "Popular":
                return  <TrendingCard title="Popular Cards" data={popular} />;
            case "Verified":
                return  <TrendingCard title="Popular Cards" data={verfieddata} />;
            case "More":
                return  <TrendingCard title="Popular Cards" data={moredata} />;
            default:
                return null;
        }
    };

    return (
        <div>
            <Helmet>
                <title>Welcome Linkfinity</title>
                <meta
                    name="description"
                    content={`Welcome to custom profile page. Explore their bio and more!`}
                />
            </Helmet>

            <Navbar /> {/* Komponen Navbar */}
            <main
                className="bg-[url('')] bg-center bg-cover relatve"
                style={{
                    backgroundColor: "#f0f8ff",
                    minHeight: "100vh",
                    // padding: "20px",
                }}
            >

                <div className="container mx-auto p-8">
                    <div className="w-full flex justify-center items-center">
                        <div className="sm:w-fit xs:w-[90%] sm:px-4 py-2 rounded-sm flex md:flex-nowrap xs:flex-wrap md:gap-4 xs:gap-1 justify-center text-black cursor-pointer md:text-lg font-semibold xs:text-sm">
                            {["Trending", "Popular", "Verified", "More"].map((tab) => (
                                <div
                                    key={tab}
                                    onClick={() => handleTabClick(tab)}
                                    className={`px-4 py-1 rounded-b-md cursor-pointer border-b-2 ${activeTab === tab
                                        ? "border-indigo-600 text-indigo-600"
                                        : "border-transparent hover:border-indigo-600"
                                        }`}
                                >
                                    {tab}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>{renderContent()}</div>
                </div>


            </main>
        </div>
    );
}
