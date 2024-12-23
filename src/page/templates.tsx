import React, { useEffect, useState } from "react";
import Navbar from "../components/header/nav";
import AuthWallet from "../components/auth/auth";
import { useActor } from "../ic/Actors";
// import UsernameForm from "../components/form/formUsername";
// import EditProfile from "../components/form/formEditProfile";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useIsAuthenticated, useAuthType } from "../components/auth/authguard";


import Section from "../components/section/SectionTemplate";


export default function TemplateNFT() {
    const { actor } = useActor();

    const [isLoading, setIsLoading] = useState(true);
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
                    // minHeight: "100vh",
                    // padding: "20px",
                }}
            >

                <Section /> 


        {/* <button
                onClick={openModalChain}
                className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 text-sm font-medium w-full sm:w-auto"
            >
                testttaadwadawdwad
            </button> 
            <AuthWallet isModalOpenProfile={isModalOpenProfile}  setIsModalOpenProfile={setIsModalOpenProfile} /> */}
                
                {/* <AuthWallet />
                {isAuthenticated ? (
                    isLoading ? (
                        <p>Loading...</p> // Menampilkan pesan loading selama proses fetch
                    ) : !isLinkFound ? (
                        <UsernameForm />
                    ) : (
                        <EditProfile /> 
                    )
                ) : (
                    null
                )} */}






            </main>
        </div>
    );
}
