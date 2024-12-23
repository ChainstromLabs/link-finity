import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import logo from '../assets/linkfintyasset/logo.png';

import { useQueryCall } from '@ic-reactor/react';

interface Profile {
    bio: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    youtube: string;
    avatar_url: string;
    banner_url: string;
    name: string;
    address: string;
    facebook: string;
    typechain: string;
    link: string;
}

interface ProfileResponse {
    Ok: Profile[]; // Sesuaikan dengan respons API Anda
}

const LinkBio: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLinkFound, setIsLinkFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Query to get the profile data
    const { data, loading, error } = useQueryCall({
        functionName: "getProfilesByLink",
        args: [username],
    });

    useEffect(() => {
        if (data) {
            const profiles = (data as ProfileResponse).Ok;
            if (profiles.length > 0) {
                setProfile(profiles[0]); // Set profile data
                setIsLinkFound(true);
            } else {
                setProfile(null);
                setIsLinkFound(false);
            }
        }
        setIsLoading(loading);
    }, [data, loading]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile</div>;

    return (
        <div>
            {profile && (
                <>
                    <Helmet>
                        <title>{username}'s Profile Page</title>
                        <meta
                            name="description"
                            content={`Welcome to ${username}'s custom profile page. Explore their bio and more!`}
                        />
                    </Helmet>
                    <div className="flex flex-col justify-center items-center min-h-screen w-full px-50 bg-white dark:bg-[#101419]">
                        <div className="relative flex flex-col items-center rounded-[60px] w-full sm:max-w-[1200px] mx-auto bg-black bg-clip-border shadow-3xl shadow-shadow-500 dark:bg-[#151920] dark:text-white dark:!shadow-none">
                            {/* Banner */}
                            <div className="relative flex h-48 w-full justify-center bg-cover">
                                <img
                                    src={profile.banner_url && profile.banner_url.trim() !== "" ? profile.banner_url : ""}
                                    className="absolute flex h-48 w-full justify-center rounded-tl-[50px] rounded-tr-[50px] bg-cover"
                                    alt="Banner"
                                />
                                
                                <div className="absolute -bottom-16 sm:-bottom-20 md:-bottom-24 lg:-bottom-16 flex h-[100px] w-[100px] sm:h-[160px] sm:w-[160px] items-center justify-center rounded-full border-[6px] border-white bg-pink-400 dark:!border-navy-700">
                                    <img
                                        className="h-full w-full rounded-full"
                                        src={profile ? profile.avatar_url : "https://via.placeholder.com/150"}
                                    />
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="mt-20 flex flex-col items-center text-center">
                                <div className="border-2 border-gray-300 dark:border-gray-700 p-6 rounded-lg max-w-5xl w-full">
                                    <h4 className="text-2xl sm:text-3xl font-bold text-navy-700 dark:text-white">{profile.name}</h4>
                                    <p className="sm:text-lg text-white">
                                        {profile.bio}
                                    </p>

                                    {/* Buttons Row */}
                                    <div className="mt-6 flex flex-wrap gap-3 justify-center">
                                        {profile.linkedin && profile.linkedin.trim() !== "" && (
                                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                                                <button className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-[10px] hover:bg-indigo-700 flex items-center">
                                                    <i className="fab fa-linkedin-in text-xl"></i>
                                                </button>
                                            </a>
                                        )}
                                        {profile.twitter && profile.twitter.trim() !== "" && (
                                            <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                                                <button className="px-3 py-1 text-sm text-white bg-blue-400 rounded-[10px] hover:bg-blue-500 flex items-center">
                                                    <i className="fab fa-twitter text-xl"></i>
                                                </button>
                                            </a>
                                        )}
                                        {profile.instagram && profile.instagram.trim() !== "" && (
                                            <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                                                <button className="px-3 py-1 text-sm text-white bg-pink-600 rounded-[10px] hover:bg-pink-700 flex items-center">
                                                    <i className="fab fa-instagram text-xl"></i>
                                                </button>
                                            </a>
                                        )}
                                        {profile.youtube && profile.youtube.trim() !== "" && (
                                            <a href={profile.youtube} target="_blank" rel="noopener noreferrer">
                                                <button className="px-3 py-1 text-sm text-white bg-red-600 rounded-[10px] hover:bg-red-700 flex items-center">
                                                    <i className="fab fa-youtube text-xl"></i>
                                                </button>
                                            </a>
                                        )}
                                        {profile.facebook && profile.facebook.trim() !== "" && (
                                            <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
                                                <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded-[10px] hover:bg-blue-700 flex items-center">
                                                    <i className="fab fa-facebook-f text-xl"></i>
                                                </button>
                                            </a>
                                        )}
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

                            {/* Buttons Column */}
                            <div className="mt-6 flex flex-col gap-4 items-center pt-5 pb-10 lg:pt-2 max-w-5xl">
                                <button type="button" className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">Sample Button 1</span>
                                </button>
                                <button type="button" className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">Sample Button 2</span>
                                </button>
                                <button type="button" className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">Sample Button 3</span>
                                </button>
                                <button type="button" className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">Sample Button 3</span>
                                </button>
                                <button type="button" className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">Sample Button 4</span>
                                </button>
                                <button type="button" className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">Sample Button 5</span>
                                </button>
                                <button type="button" className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">Sample Button 6</span>
                                </button>
                                <button type="button" className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">Sample Button 7</span>
                                </button>
                                <button type="button" className="w-full sm:w-[700px] text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                                    <img src={logo} alt="Button Image 1" className="w-10 h-auto me-2 -ms-1" />
                                    <span className="flex-grow text-center">Sample Button 8</span>
                                </button>
                            </div>
                        </div>
                    </div>


                </>
            )}

            {!isLinkFound && (
                <div className="text-white text-center">
                    No profile not found for this.
                </div>
            )}

        </div>
    );
};

export default LinkBio;
