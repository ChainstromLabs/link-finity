import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import './App.css';
import { ActorProvider, AgentProvider } from '@ic-reactor/react';

import LandingPage from './page/app';  
import TemplateNFT from './page/templates';  
import EditProfile from './page/editprofile';
import AnalyticPage from './page/analytics'; 

import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { config } from './lib/wagmi/wagmiConfig';
import { AuthProvider } from './components/auth/authguard';
import SolanaProviders from "./lib/solana/solanaConfig";


import { WagmiProvider } from "wagmi";


import { _SERVICE } from "./declarations/ic_siwe_provider/ic_siwe_provider.did";
import { idlFactory, canisterId } from './declarations/ic_siwe_provider/index';
import { SiweIdentityProvider } from "ic-use-siwe-identity";

const queryClient = new QueryClient();

import { ToastContainer } from "react-toastify";

import Actors from "./ic/Actors";


//SOLANA PROVIDER SIWS
import { SiwsIdentityProvider } from 'ic-use-siws-identity';
import { _SERVICE as SIWS_SERVICE } from './declarations/ic_siws_provider/ic_siws_provider.did';
import {
  idlFactory as siwsIdlFactory,
  canisterId as siwsCanisterId,
} from './declarations/ic_siws_provider';


import {
  idlFactory as idfacbackend,
  canisterId as idcanisterbackend,
} from './declarations/backend';


import LinkBioPage from "./page/LinkBio";
import PreviewMobile from "./components/preview/previewmobile";
import ExplorePage from "./page/explore";

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { IdentityKitProvider, IdentityKitTheme} from "@nfid/identitykit/react"
import { IdentityKitAuthType } from "@nfid/identitykit"

const Main: React.FC = () => {
  const commonWrapper = (Component: React.ReactNode) => (
    <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
      <WagmiProvider config={config}>
        <SiweIdentityProvider<_SERVICE> canisterId={canisterId} idlFactory={idlFactory}>
          <SolanaProviders>
            <SiwsIdentityProvider<SIWS_SERVICE>
              canisterId={siwsCanisterId}
              idlFactory={siwsIdlFactory}
            >
              <RainbowKitProvider theme={darkTheme()}>
                <AuthProvider>
                  <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeButton={true}
                    rtl={false}
                  />
                  <Actors>
                    <IdentityKitProvider
                      theme={IdentityKitTheme.LIGHT}
                      authType={IdentityKitAuthType.DELEGATION}
                    >
                      <HelmetProvider>{Component}</HelmetProvider>
                    </IdentityKitProvider>
                  </Actors>
                </AuthProvider>
              </RainbowKitProvider>
            </SiwsIdentityProvider>
          </SolanaProviders>
        </SiweIdentityProvider>
      </WagmiProvider>
    </ActorProvider>
  );

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AgentProvider withProcessEnv>
          <Router>
            <Routes>
              <Route path="/" element={<HelmetProvider><App /></HelmetProvider>} />

              <Route
                path="/:username"
                element={
                  <>
                    <ToastContainer
                      position="bottom-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={true}
                      closeButton={true}
                      rtl={false}
                    />
                    <ActorProvider idlFactory={idfacbackend} canisterId={idcanisterbackend}>
                      <HelmetProvider><LinkBioPage /></HelmetProvider>
                    </ActorProvider>
                  </>
                }
              />

              <Route
                path="/preview/:username"
                element={
                  <>
                    <ToastContainer
                      position="bottom-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={true}
                      closeButton={true}
                      rtl={false}
                    />
                    <ActorProvider idlFactory={idfacbackend} canisterId={idcanisterbackend}>
                      <HelmetProvider><PreviewMobile /></HelmetProvider>
                    </ActorProvider>
                  </>
                }
              />

              {[
                { path: "/explore", component: <ExplorePage /> },
                { path: "/app", component: <LandingPage /> },
                { path: "/editprofile", component: <EditProfile /> },
                { path: "/analytics", component: <AnalyticPage /> },
                { path: "/template", component: <TemplateNFT /> },
              ].map(({ path, component }) => (
                <Route key={path} path={path} element={commonWrapper(component)} />
              ))}
            </Routes>
          </Router>
        </AgentProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};




// const Main: React.FC = () => {
//   return (
// <React.StrictMode>
// <QueryClientProvider client={queryClient}>


//   <AgentProvider withProcessEnv>
//     <ActorProvider idlFactory={idfacbackend} canisterId={idcanisterbackend}>
//       <WagmiConfig config={config}>
//         <SiweIdentityProvider<_SERVICE> canisterId={canisterId} idlFactory={idlFactory}>
//           <SolanaProviders>
//             <SiwsIdentityProvider<SIWS_SERVICE>
//               canisterId={siwsCanisterId}
//               idlFactory={siwsIdlFactory}
//             >
//               <RainbowKitProvider theme={darkTheme()}>
//                 <AuthProvider>
//                   <ToastContainer
//                     position="bottom-center"
//                     autoClose={5000}
//                     hideProgressBar={false}
//                     newestOnTop
//                     closeButton
//                     rtl={false}
//                   />
//                   <HelmetProvider>
//                   <Router>
//                     <Routes>
//                       <Route path="/" element={<App />} />
//                       <Route path="/:username" element={<LinkBioPage />} />
//                       <Route path="/preview/:username" element={<PreviewMobile />} />
//                       <Route path="/explore" element={<ExplorePage />} />
//                       <Route path="/app" element={<LandingPage />} />
//                     </Routes>
//                   </Router>
//                   </HelmetProvider>
//                 </AuthProvider>
//               </RainbowKitProvider>
//             </SiwsIdentityProvider>
//           </SolanaProviders>
//         </SiweIdentityProvider>
//       </WagmiConfig>
//     </ActorProvider>
//   </AgentProvider>

// </QueryClientProvider>
// </React.StrictMode>
// );
// };
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Main />);
// ReactDOM.hydrateRoot(document.getElementById("root") as HTMLElement, <Main />);  //SSR