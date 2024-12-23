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



                {isAuthenticated ? (
                    isLoading ? (
                        <p>Loading...</p>
                    ) : !isLinkFound ? (
                        <div className="fixed w-screen h-screen bg-[url('')] bg-center bg-cover relative ">
                            <div className="relative z-10 flex items-center justify-center">
                                <UsernameForm />
                            </div>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )
                ) : (
                    <Section />
                )}
                
            </main>
        </div>
    );
}
