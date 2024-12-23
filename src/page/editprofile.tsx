import React, { useEffect, useState } from "react";
import Navbar from "../components/header/nav";
import AuthWallet from "../components/auth/auth";
import { useActor } from "../ic/Actors";
import UsernameForm from "../components/form/formUsername";
import EditProfile from "../components/form/formEditProfile";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useIsAuthenticated, useAuthType } from "../components/auth/authguard";


import Section from "../components/section/SectionDiscover";

import FormAddSocialMedia from "../components/form/formAddSocialMedia";
import FormAddButton from "../components/form/formAddButton";
import PreviewMobile from "../components/preview/MobilePreviewFrame";

// Definisikan tipe untuk data profil
interface Profile {
    address: string;
    name: string;
    avatar_url: string;
    typechain: string;
    link?: string; // Properti opsional
}



export default function LandingPage() {
    const { actor } = useActor();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLinkFound, setIsLinkFound] = useState(false);

    const isAuthenticated = useIsAuthenticated();

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         if (!actor) return;

    //         try {
    //             const response = await actor.get_my_profile();

    //             // Memeriksa apakah response adalah tipe { Ok: ProfileData }
    //             if ('Ok' in response) {
    //                 const profileData = response.Ok;
    //                 setProfile(profileData);

    //                 // Memeriksa apakah profileData memiliki link
    //                 const linkExists = !!profileData.link && profileData.link.trim() !== "";
    //                 setIsLinkFound(linkExists);
    //             } else if ('Err' in response) {
    //                 // Menangani kasus error jika ada
    //                 console.error("Error:", response.Err);
    //                 setIsLinkFound(false);
    //                 setIsLoading(false);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching profile:", error);
    //             setIsLinkFound(false);
    //             setIsLoading(false);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchProfile();
    // }, [actor]);



    const [isModalOpenProfile, setIsModalOpenProfile] = useState(false);

    // Define the closeModalProfile function
    const closeModalProfile = () => {
        setIsModalOpenProfile(false);
    };

    const openProfile = () => {
        setIsModalOpenProfile(true);
    };

    const page = {
        bgType: "color",
        bgColor: "#ccd5ff",
        bgImage: "",
        avatar: "data:image/jpeg;base64,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",
        displayName: "",
        location: "",
        bio: "",
        tags: [],
    };

    const saveBaseSettings = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted!");
    };

    const user = { id: 1, name: "John Doe" }; 
    const pageData = {
        buttons: {
            email: "test@example.com",
            mobile: "+46 123 123 123",
        },
    };

    const pages = { links: [] };
    const userr = { id: "user1", name: "John Doe" };


    const [isOpenAccordianTweet, setIsOpenACcordianTweet] = useState(false);
    const toggleAccordion = () => {
        setIsOpenACcordianTweet(!isOpenAccordianTweet);
    };



    return (
        <div>
            <Helmet>
                <title>Landing Page | My App</title>
                <meta name="description" content="Welcome to the Landing Page of My App." />
                {/* Open Graph meta tags */}
                <meta property="og:title" content="Landing Page | My App" />
                <meta property="og:description" content="Welcome to the landing page of My App, a platform that offers exciting features." />
                <meta property="og:image" content="https://example.com/your-image.jpg" />  {/* Ganti dengan URL gambar */}
                <meta property="og:url" content="https://yourwebsite.com" />
                {/* Twitter meta tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Landing Page | My App" />
                <meta name="twitter:description" content="Welcome to the landing page of My App." />
                <meta name="twitter:image" content="https://example.com/your-image.jpg" />
            </Helmet>

            <Navbar /> {/* Komponen Navbar */}
            <main
                style={{
                    backgroundColor: "#f0f8ff",
                    minHeight: "100vh",
                    padding: "20px",
                }}
            >


                <div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Form Add Button */}
                            <div className="flex-1 p-6 sm:p-8">
                                <EditProfile page={page} saveBaseSettings={saveBaseSettings} />
                            </div>

                            {/* Form Add Social Media */}
                            <div className="flex-1 p-6 sm:p-8">
                                <div className="mt-6 flex flex-col gap-4 items-center pt-5 pb-0 lg:pt-2 max-w-sm">
                                    <button
                                        type="button"
                                        onClick={toggleAccordion}
                                        className="w-full text-gray-900 bg-white hover:bg-indigo-100 border border-indigo-200 focus:ring-4 focus:outline-none focus:ring-indigo-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-indigo-600 dark:bg-indigo-800 dark:border-indigo-700 dark:text-white dark:hover:bg-indigo-700 transform hover:scale-105 transition-transform duration-200"
                                    >
                                        Preview Mobile
                                    </button>

                                </div>

                                {isOpenAccordianTweet && (
                                    <div>
                                        <div className="mt-6 flex flex-col gap-4 items-center pt-5 pb-0 lg:pt-2 max-w-sm">
                                            <button
                                                type="button"
                                                onClick={toggleAccordion}
                                                className="w-full text-gray-900 bg-white hover:bg-indigo-100 border border-indigo-200 focus:ring-4 focus:outline-none focus:ring-indigo-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-start dark:focus:ring-indigo-600 dark:bg-indigo-800 dark:border-indigo-700 dark:text-white dark:hover:bg-indigo-700 transform hover:scale-105 transition-transform duration-200"
                                            >
                                                See Preview Link
                                            </button>

                                        </div>
                                        <PreviewMobile />
                                    </div>

                                )}


                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Form Add Button */}
                            <div className="flex-1 p-6 sm:p-8">
                                <FormAddButton page={pages} user={userr} />
                            </div>

                            {/* Form Add Social Media */}
                            <div className="flex-1 p-6 sm:p-8">
                                <FormAddSocialMedia user={user} page={pageData} />
                            </div>
                        </div>
                    </div>

                </div>





            </main>
        </div>
    );
}
