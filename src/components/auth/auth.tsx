import React, { useState, useEffect, useRef } from 'react';
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { AuthClient } from '@dfinity/auth-client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from './authguard';
import { useAccount, useDisconnect, useChainId } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSiweIdentity } from "ic-use-siwe-identity";
import { useSiwsIdentity } from "ic-use-siws-identity";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


// Gambar aset
import walleticp from '../../assets/linkfintyasset/icpwallet.png';
import walleteth from '../../assets/linkfintyasset/walleteth.png';
import solana from '../../assets/linkfintyasset/solana.png';

import { ConnectWallet, useAuth as useIdentityKitAuth } from "@nfid/identitykit/react"

import "@nfid/identitykit/react/styles.css"


function arrayBufferToHex(arrayBuffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(arrayBuffer);
    return Array.from(byteArray, (byte) =>
        byte.toString(16).padStart(2, "0")
    ).join("");
}



interface AuthModalConnect {
    isModalOpenProfile: boolean;
    setIsModalOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
}


const AuthWallet: React.FC<AuthModalConnect> = ({ isModalOpenProfile, setIsModalOpenProfile }) => {

    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();

    const { login, isLoggingIn, isPreparingLogin, clear, identity, delegationChain, identityAddress } = useSiweIdentity();
    const {
        prepareLogin: siwsPrepareLogin,
        isPrepareLoginIdle: siwsIsPrepareLoginIdle,
        prepareLoginError: siwsPrepareLoginError,
        loginError: siwsLoginError,
        identity: siwsIdentityData,
        isLoggingIn: siwsIsLoggingin,
        clear: siwsClear,
        isPreparingLogin: siwsIsPreparingLogin,
        delegationChain: swisdelegationChain,
        login: siwsLogin,
    } = useSiwsIdentity();

    // Solana modal
    const { connecting, connected, publicKey, disconnect: solanaDisconnect } = useWallet();
    const [isAuthenticatedSolana, setIsAuthenticatedSolana] = useState(false);

    const { setVisible } = useWalletModal();

    const text = () => {
        if (siwsIsLoggingin) {
            return "Login";
        }
        if (siwsIsPreparingLogin) {
            return "Logging in..";
        }
        return "Login";
    };

    const handleLoginSolana = async () => {
        if (!publicKey) {
            console.error("Wallet is not connected.");
            return;
        }

        try {
            const handlelogin = await siwsLogin();

            if (handlelogin === undefined || handlelogin === null) {
                toast.error("Error.");
                return;
            }
        } catch (error) {
            toast.success("Logout dari Solana berhasil!");
        }
    };


    const soalanalogin = async () => {
        if (connecting) return;
        setVisible(true);
        // setAuthType('SOLANA');
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (connected && publicKey) {
            setIsAuthenticatedSolana(true);
            setAuthType('SOLANA');
        } else {
            setIsAuthenticatedSolana(false);
        }
    }, [connected, publicKey]);


    const handleLogoutSolana = () => {
        solanaDisconnect();
        setIsAuthenticatedSolana(false);
        setAuthType(null);

        localStorage.removeItem('solanaAuthData');
        sessionStorage.removeItem('solanaSession');

        siwsClear();
        toast.success("Logout dari Solana berhasil!");
    };

    const { isConnected, address, status } = useAccount();

    // const { data: ensName, isLoading: isEnsLoading } = useEnsName({ address });

    // If the user switches to a different address, clear the session.
    useEffect(() => {
        if (identityAddress && address && address !== identityAddress) {
            clear();
        }
    }, [address, clear, identityAddress]);

    const isLoading = status === 'connecting' || status === 'reconnecting';


    const chainId = useChainId();
    const { disconnect } = useDisconnect(); // Destructure disconnect from wagmi

    const handleDisconnect = () => {

        disconnect();
        clear();
        setIsAuthenticatedOtherchain(false);
        setAuthType(null);

        setIsAuthenticated(false);
        setUserPrincipal(null);
        setAuthState({
            isAuthenticated: false,
            authType: null,
        })


        toast.success("Logout dari EVM berhasil!");

    };

    const [authClient, setAuthClient] = useState<AuthClient | null>(null);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAuthenticatedOtherchain, setIsAuthenticatedOtherchain] = useState<boolean>(false);
    const [authType, setAuthType] = useState<'ICP' | 'EVM' | 'SOLANA' | null>(null);

    const [userPrincipal, setUserPrincipal] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);



    // Log status koneksi dan informasi akun
    useEffect(() => {
        setIsAuthenticatedOtherchain(isConnected ?? false);
        setAuthType(isConnected ? 'EVM' : null);
    }, [isConnected, address, chainId]);

    // Initialize AuthClient for ICP authentication
    const [isAuthStateLoading, setIsAuthStateLoading] = useState(true);
    useEffect(() => {
        const initializeAuthState = async () => {
            try {
                // Simulating conditions based on connection and identity
                if (connected && publicKey) {
                    setIsAuthenticatedSolana(true);
                    setAuthType('SOLANA');
                } else if (isConnected) {
                    setIsAuthenticatedOtherchain(true);
                    setAuthType('EVM');
                }
            } catch (error) {
                console.error("Error initializing auth state:", error);
            } finally {
                // Set loading to false after authentication check is completed
                setIsAuthStateLoading(false);
            }
        };

        initializeAuthState();
    }, [isAuthenticated, connected, publicKey, isConnected]); // Re-run on these dependencies

    // Close modal automatically when authenticated
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         setIsModalOpen(false);
    //     }
    // }, [isAuthenticated]);


    // Handle ICP login
    // const handleLoginICP = async () => {
    //     if (!authClient) return;

    //     const days = BigInt(1);
    //     const hours = BigInt(24);
    //     const nanoseconds = BigInt(3600000000000);

    //     try {
    //         await authClient.login({
    //             onSuccess: async () => {
    //                 const identity = await authClient.getIdentity();
    //                 const principal = identity.getPrincipal();

    //                 setIsAuthenticated(true);
    //                 setUserPrincipal(principal.toText());
    //                 setIsModalOpen(false); // Close modal after successful login
    //                 setAuthType('ICP'); // Set authType to 'ICP' after successful login
    //                 toast.success("Login ICP berhasil!");
    //             },
    //             identityProvider: "https://identity.ic0.app/#authorize", /// FOR MAINNET NOT FOR LOCAL
    //             maxTimeToLive: days * hours * nanoseconds,
    //         });
    //     } catch (error) {
    //         console.error('ICP Authentication failed', error);
    //     }
    // };

    // Handle ICP logout
    const handleLogoutICP = async () => {
        setIsAuthenticated(false);
        setUserPrincipal(null);
        setAuthType(null);
    };

    const { user } = useIdentityKitAuth() as any;
    useEffect(() => {
        if (user?.principal) {
            setIsAuthenticated(true);
            setUserPrincipal(user.principal.toText());
            setIsModalOpen(false);
            setAuthType('ICP');
        } else {

            if (setIsAuthenticatedOtherchain) {
                setIsAuthenticatedOtherchain(true);
                setAuthType('EVM');
                // console.log("test")
                return; // Exit early if authType is 'EVM'
            }

            if (setIsAuthenticatedSolana) {
                setIsAuthenticatedSolana(true);
                setAuthType('SOLANA');
                // console.log("test2")
                return; // Exit early if authType is 'SOL'
            }

            setIsAuthenticated(false);
            setUserPrincipal(null);
            setAuthType(null);
            setAuthState({
                isAuthenticated: false,
                authType: null,
            })
            console.warn("No user connected.");
        }
    }, [user]);

    // Modal Toggle
    const toggleModal = () => setIsModalOpen(!isModalOpen);


    /////////HANDLE BUGG
    const { setAuthState } = useAuth();
    const previousAuthStateRef = useRef<{ isAuthenticated: boolean; authType: 'ICP' | 'EVM' | 'SOLANA' | null }>({
        isAuthenticated: false,
        authType: null
    });

    useEffect(() => {
        if (identity || siwsIdentityData || isAuthenticated) {
            const newIsAuthenticated = isAuthenticated || isAuthenticatedOtherchain || isAuthenticatedSolana;

            // Only update state if there is a change
            if (newIsAuthenticated !== previousAuthStateRef.current.isAuthenticated || authType !== previousAuthStateRef.current.authType) {
                setAuthState({
                    isAuthenticated: newIsAuthenticated,
                    authType: authType,
                });

                // Update the ref to the current state
                previousAuthStateRef.current = { isAuthenticated: newIsAuthenticated, authType: authType };
            }
        } else {
            // If no authentication, reset state
            //   setAuthState({
            //     isAuthenticated: false,
            //     authType: null,
            //   });
            previousAuthStateRef.current = { isAuthenticated: false, authType: null }; 
        }
    }, [identity, isAuthenticated, isAuthenticatedOtherchain, authType, setAuthState, siwsIdentityData]);



    const handleLogin = async () => {
        try {
            await login();
            toast.success("Login Berhasil!");
        } catch (error) {
            toast.success("Gagal Login!");
        }
    };

    useEffect(() => {

        // if (isAuthenticatedSolana && (isAuthenticated || isAuthenticatedOtherchain)) {
        //     solanaDisconnect();
        //     setIsAuthenticatedSolana(false);
        // }

        if (isAuthenticated && (isAuthenticatedSolana || isAuthenticatedOtherchain)) {
            authClient?.logout();
            setIsAuthenticated(false);
            // siwsClear();
            setUserPrincipal(null);
        }

        if (isAuthenticatedOtherchain && (isAuthenticated || isAuthenticatedSolana)) {
            disconnect();
            // clear();
        }
    }, [isAuthenticated, isAuthenticatedSolana, isAuthenticatedOtherchain]);


    const [isModalOpenChain, setIsModalOpenChain] = useState<boolean>(false);

    const openModalChain = () => {
        setIsModalOpenChain(true);
    };


    const truncateAddress = (address: string) => {
        if (!address) return '';
        if (address && address.length > 10) {
            return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
        }
        return address;
    };



    if (isAuthStateLoading) {
        return
    }


    return (

        <div className="">


            {
                !isAuthenticated && !isAuthStateLoading && !isAuthenticatedSolana && !openAccountModal ? (
                    <div className="px-4 py-2">
                        <button
                            onClick={toggleModal}
                            className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-3 py-2 text-sm font-medium w-full sm:w-auto"
                        >
                            <i className="fas fa-wallet"></i> Connect Wallet
                        </button>
                    </div>
                ) : isAuthenticated ? (
                    <div className="w-full">
                        {/* My Profile Button */}
                        <div className="px-4 py-2">
                            <button
                                onClick={openModalChain}
                                className="w-full rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-medium py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                <i className="fas fa-user mr-2"></i> My Profile
                            </button>
                        </div>

                        {/* Edit Profile Button */}
                        <div className="px-4 py-2">
                            <button
                                onClick={() => console.log("Edit Profile clicked")}
                                className="w-full rounded-md bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                <i className="fas fa-edit mr-2"></i> Edit Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    (isAuthenticatedOtherchain || isAuthenticatedSolana) && (isAuthenticated) ? (
                        <div>
                        </div>
                    ) : (
                        <div>
                            {authType === 'EVM' && !identity ? (
                                // EVM login button
                                <button
                                    onClick={openModalChain}
                                    className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-3 py-2 text-sm font-medium w-full sm:w-auto"
                                >
                                    <i className="fa-solid fa-right-to-bracket"></i> {isLoggingIn ? "Logging in..." : "Login"}
                                </button>
                            ) : authType === 'SOLANA' && !siwsIdentityData ? (
                                // Solana login button
                                <button
                                    onClick={openModalChain}
                                    className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-3 py-2 text-sm font-medium w-full sm:w-auto"
                                >
                                    <i className="fa-solid fa-right-to-bracket"></i> {isLoggingIn ? "Logging in..." : "Login"}
                                </button>
                            ) : (
                                <div className="w-full">
                                    {/* My Profile Button */}
                                    <div className="px-4 py-2">
                                        <button
                                            onClick={openModalChain}
                                            className="w-full rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-medium py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
                                        >
                                            <i className="fas fa-user mr-2"></i> My Profile
                                        </button>
                                    </div>

                                    {/* Edit Profile Button */}
                                    <div className="px-4 py-2">
                                        <button
                                            onClick={() => console.log("Edit Profile clicked")}
                                            className="w-full rounded-md bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105"
                                        >
                                            <i className="fas fa-edit mr-2"></i> Edit Profile
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                )
            }




            {/* <button
                onClick={openModalChain}
                className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 text-sm font-medium w-full sm:w-auto"
            >
                testttaadwadawdwad
            </button> */}

            {(isModalOpenProfile || isModalOpenChain) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4 md:max-w-md lg:max-w-lg"> {/* Smaller max-width */}
                        <div>
                            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
                                {authType === 'ICP' ? "Login With NFID Identity Kit" : (isAuthenticatedSolana ? "Login With Solana" : "Login With Ethereum (EVM)")}
                            </h2>


                            {/* Logo */}
                            <div className="flex justify-center mb-4">
                                <DotLottieReact
                                    src="https://lottie.host/52b06de0-bc5e-4fdd-a4ee-2453232aeab6/FyEsRVx5dK.lottie"
                                    loop
                                    autoplay
                                    onLoad={() => console.log("Animation loaded successfully!")}
                                    onError={(error) => console.error("Error loading animation:", error)}
                                />

                            </div>

                            <ConnectButton.Custom>
                                {({
                                    account,
                                    chain,
                                    openChainModal,
                                    authenticationStatus,
                                    mounted,
                                    openConnectModal,
                                }) => {
                                    const ready = mounted && authenticationStatus !== 'loading';
                                    const connected =
                                        ready &&
                                        account &&
                                        chain &&
                                        (!authenticationStatus || authenticationStatus === 'authenticated');

                                    if (!ready) return null;

                                    if (authType === 'ICP') {
                                        return (
                                            <div>
                                                <div className="flex flex-col gap-3">


                                                    <button
                                                        className="flex-1 px-6 py-2 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
                                                        onClick={() => {
                                                            const textToCopy = userPrincipal;
                                                            navigator.clipboard
                                                                .writeText(textToCopy || '')
                                                                .then(() => toast.success("Wallet Copied to clipboard!"))
                                                                .catch((err) => console.error("Failed to copy text: ", err));
                                                        }}
                                                    >
                                                        <i className="fa fa-clipboard"></i> {/* Add clipboard icon */}
                                                        {truncateAddress(userPrincipal ? userPrincipal : "No Address")}
                                                    </button>



                                                    <ConnectWallet
                                                        dropdownMenuComponent={({ connectedAccount, icpBalance, disconnect }) => {
                                                            useEffect(() => {
                                                                if (connectedAccount) {
                                                                    setUserPrincipal(connectedAccount);
                                                                    setIsAuthenticated(true);
                                                                    setIsModalOpen(false);
                                                                    setAuthType('ICP');

                                                                }
                                                            }, [connectedAccount]);
                                                            return (
                                                                <button
                                                                    onClick={() => {
                                                                        handleLogoutICP();
                                                                        disconnect();
                                                                        setIsModalOpenChain(false);
                                                                        setIsModalOpenProfile(false);
                                                                        setIsAuthenticated(false);
                                                                        setUserPrincipal(null);
                                                                        setAuthType(null);
                                                                    }}
                                                                    className="w-full px-6 py-2 text-lg font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                                                                >
                                                                    <i className="fa fa-sign-out-alt"></i> {/* Add sign-out icon */}
                                                                    Disconnect Wallet
                                                                </button>
                                                            );
                                                        }}
                                                    />


                                                    {/* </IdentityKitProvider> */}




                                                    <button

                                                        onClick={() => {
                                                            setIsModalOpenChain(false);
                                                            setIsModalOpenProfile(false);
                                                        }}
                                                        className="w-full px-6 py-2 text-lg font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                                                    >
                                                        <i className="fa fa-times"></i> {/* Add close icon */}
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }

                                    if (!connected || isAuthenticatedSolana) {
                                        return (
                                            <div className="flex flex-col gap-3">


                                                {!siwsIdentityData ? (
                                                    <button
                                                        onClick={handleLoginSolana}
                                                        className="w-full px-6 py-2 text-lg font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                                                    >
                                                        <i className="fa fa-wallet"></i> {/* Add wallet icon */}
                                                        {text()}
                                                    </button>

                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => {
                                                                const textToCopy = siwsIdentityData.getPrincipal().toString();
                                                                navigator.clipboard.writeText(textToCopy)
                                                                    .then(() => toast.success("Wallet Copied to clipboard!!"))
                                                                    .catch((err) => console.error("Failed to copy text: ", err));
                                                            }}
                                                            className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 text-sm font-medium"
                                                        >

                                                            <i className="fas fa-wallet" style={{ marginRight: '8px' }}></i> Principal:  {truncateAddress(siwsIdentityData.getPrincipal().toString() ? siwsIdentityData.getPrincipal().toString() : "No Address")}

                                                        </button>

                                                        {swisdelegationChain?.delegations.map((delegation) => {
                                                            const pubKey = arrayBufferToHex(delegation.delegation.pubkey);
                                                            const expiration = new Date(Number(delegation.delegation.expiration / 1000000n));
                                                            return (
                                                                <div
                                                                    key={pubKey}
                                                                    className="p-3 bg-white rounded-md shadow-md border border-gray-200 text-left space-y-1"
                                                                >
                                                                    <div className="text-sm font-medium text-gray-700">
                                                                        <span className="font-semibold">Expiration:</span> {expiration.toLocaleDateString()}{" "}
                                                                        {expiration.toLocaleTimeString()}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </>
                                                )}


                                                <button
                                                    className="flex-1 px-6 py-2 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
                                                    onClick={() => {
                                                        const textToCopy = publicKey ? publicKey.toBase58() : "Null";
                                                        navigator.clipboard
                                                            .writeText(textToCopy || '')
                                                            .then(() => toast.success("Wallet Copied to clipboard!"))
                                                            .catch((err) => console.error("Failed to copy text: ", err));
                                                    }}
                                                >
                                                    <i className="fa fa-clipboard"></i> {/* Add clipboard icon */}
                                                    {truncateAddress(publicKey ? publicKey.toBase58() : "No Address")}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleLogoutSolana();
                                                        setIsModalOpenChain(false);
                                                        setIsModalOpenProfile(false);
                                                    }}
                                                    className="w-full px-6 py-2 text-lg font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                                                >
                                                    <i className="fa fa-sign-out-alt"></i> {/* Add sign-out icon */}
                                                    Disconnect Wallet
                                                </button>
                                                <button

                                                    onClick={() => {
                                                        setIsModalOpenChain(false);
                                                        setIsModalOpenProfile(false);
                                                    }}
                                                    className="w-full px-6 py-2 text-lg font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                                                >
                                                    <i className="fa fa-times"></i> {/* Add close icon */}
                                                    Close
                                                </button>
                                            </div>
                                        );
                                    }

                                    if (chain.unsupported) {
                                        return (
                                            <button
                                                onClick={openChainModal}
                                                className="w-full px-6 py-2 text-lg font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                                            >
                                                <i className="fa fa-exclamation-triangle"></i> {/* Add warning icon */}
                                                Wrong Network
                                            </button>
                                        );
                                    }

                                    return (
                                        <div className="flex flex-col gap-4">

                                            {!identity ? (
                                                <button
                                                    onClick={handleLogin}
                                                    disabled={isLoggingIn || isPreparingLogin}
                                                    className="w-full px-6 py-2 text-lg font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                                                >
                                                    <i className="fas fa-wallet" style={{ marginRight: '8px' }}></i> {isLoggingIn ? "Logging in..." : "Login"}
                                                </button>
                                            ) : (


                                                <button
                                                    className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 text-sm font-medium"
                                                    onClick={() => {
                                                        const textToCopy = identity.getPrincipal().toString();
                                                        navigator.clipboard.writeText(textToCopy)
                                                            .then(() => {
                                                                toast.success("Wallet Copied to clipboard!!");
                                                            })
                                                            .catch((err) => {
                                                                console.error("Failed to copy text: ", err);
                                                            });
                                                    }}
                                                >
                                                    <i className="fas fa-wallet" style={{ marginRight: '8px' }}></i> Principal:  {truncateAddress(identity.getPrincipal().toString() ? identity.getPrincipal().toString() : "No Address")}
                                                </button>
                                            )}


                                            {delegationChain?.delegations.map((delegation) => {
                                                const pubKey = arrayBufferToHex(delegation.delegation.pubkey);
                                                const expiration = new Date(Number(delegation.delegation.expiration / 1000000n));

                                                return (
                                                    <div
                                                        key={pubKey}
                                                        className="p-3 bg-white rounded-md shadow-md border border-gray-200"
                                                    >
                                                        <span className="font-semibold">Expiration:</span> {expiration.toLocaleDateString()}{" "}
                                                    </div>
                                                );
                                            })}

                                            <div className="flex flex-wrap items-center gap-3">
                                                <button
                                                    onClick={openChainModal}
                                                    className="flex-1 px-6 py-2 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
                                                >

                                                    {chain.iconUrl && (
                                                        <img
                                                            src={chain.iconUrl}
                                                            alt={`${chain.name} icon`}
                                                            className="w-6 h-6 rounded-full"
                                                        />
                                                    )}
                                                    {chain.name}
                                                </button>

                                                <button
                                                    className="flex-1 px-6 py-2 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
                                                    onClick={() => {
                                                        navigator.clipboard
                                                            .writeText(address || '')
                                                            .then(() => toast.success("Wallet Copied to clipboard!"))
                                                            .catch((err) => console.error("Failed to copy text: ", err));
                                                    }}
                                                >
                                                    <i className="fa fa-clipboard"></i> {/* Add clipboard icon */}
                                                    {truncateAddress(address || '')}
                                                </button>
                                            </div>


                                            <button
                                                onClick={() => {
                                                    handleDisconnect();
                                                    setIsModalOpenChain(false);
                                                    setIsModalOpenProfile(false);
                                                }}
                                                className="w-full px-6 py-2 text-lg font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                                            >
                                                <i className="fa fa-sign-out-alt"></i> {/* Add sign-out icon */}
                                                Disconnect Wallet
                                            </button>
                                            <button

                                                onClick={() => {
                                                    setIsModalOpenChain(false);
                                                    setIsModalOpenProfile(false);
                                                }}
                                                className="w-full px-6 py-2 text-lg font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2"
                                            >
                                                <i className="fa fa-times"></i> {/* Add close icon */}
                                                Close
                                            </button>
                                        </div>
                                    );
                                }}
                            </ConnectButton.Custom>
                        </div>
                    </div>
                </div>
            )}







            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
                            <i className="fas fa-wallet text-indigo-500 text-3xl"></i> {/* Ikon dompet */}
                            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                                Choose Wallet
                            </span>
                        </h2>


                        <ConnectWallet
                            dropdownMenuComponent={({ connectedAccount, icpBalance, disconnect }) => {
                                useEffect(() => {
                                    if (connectedAccount) {
                                        setUserPrincipal(connectedAccount);
                                        setAuthType('ICP');
                                    }
                                }, [connectedAccount]);
                                return (
                                    <div>
                                    </div>
                                );
                            }}
                            connectButtonComponent={({ onClick }) => (
                                <button
                                    onClick={onClick}
                                    className="w-full flex items-center px-4 py-2 text-white bg-gray-900 hover:bg-indigo-500 rounded-lg shadow transition duration-300 mb-4"
                                >
                                    <img
                                        src={walleticp}
                                        alt="ICP Wallet"
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                    Login with ICP Wallet
                                </button>
                            )}
                        />


                        {/* </IdentityKitProvider> */}

                        {/* Solana Wallet Button */}
                        <button
                            onClick={soalanalogin}
                            className="w-full flex items-center px-4 py-2 text-white bg-gray-900 hover:bg-indigo-500 rounded-lg shadow transition duration-300 mb-4"
                        >
                            <img
                                src={solana}
                                alt="Solana Wallet"
                                className="w-8 h-8 rounded-full mr-3"
                            />
                            Login with SOL Wallet
                        </button>

                        {/* Ethereum Wallet Button */}
                        {openConnectModal && (
                            <button
                                onClick={() => {
                                    openConnectModal();
                                    setIsModalOpen(false);
                                }}
                                className="w-full flex items-center px-4 py-2 text-white bg-gray-900 hover:bg-indigo-500 rounded-lg shadow transition duration-300 mb-4"
                            >
                                <img
                                    src={walleteth}
                                    alt="Ethereum Wallet"
                                    className="w-8 h-8 rounded-full mr-3"
                                />
                                Login with ETH Wallet
                            </button>
                        )}

                        {/* Cancel Button */}
                        <button
                            onClick={toggleModal}
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}






        </div>

    );

};

export default AuthWallet;
