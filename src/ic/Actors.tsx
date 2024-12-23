import { ActorProvider, InterceptorErrorData, InterceptorRequestData, createActorContext, createUseActorHook, isIdentityExpiredError } from "ic-use-actor";
import { canisterId, idlFactory } from "../declarations/backend/index";
import { act, ReactNode, useEffect, useState } from "react";
import { _SERVICE } from "../declarations/backend/backend.did";
import { toast } from "react-toastify";
import { useSiweIdentity } from "ic-use-siwe-identity";
import { useSiwsIdentity } from "ic-use-siws-identity";
import { AuthClient } from '@dfinity/auth-client';

const actorContext = createActorContext<_SERVICE>();
export const useActor = createUseActorHook<_SERVICE>(actorContext);

export default function Actors({ children }: { children: ReactNode }) {

  // Fetch Siwe and Siws identities from respective hooks
  const { identity, clear } = useSiweIdentity();
  const { identity: siwsIdentityData, clear: siwsClear } = useSiwsIdentity();

  // State for storing ICP identity
  const [identityICP, setIdentityICP] = useState<any>(null); // State to hold ICP identity

    useEffect(() => {
        // Function to initialize the authentication state
        const initializeAuthState = async () => {
            try {
                // Create an AuthClient instance
                const client = await AuthClient.create();
                // Check if the user is authenticated with ICP
                const isAuthenticatedICP = await client.isAuthenticated();
                if (isAuthenticatedICP) {
                    const identity = await client.getIdentity();
                    const principal = identity.getPrincipal();
                    setIdentityICP(identity); 
                    // console.log(`Authenticated Identity : ${principal.toText()} `, identity);
                } else {
                    // console.log("User is not authenticated with ICP.");
                }
            } catch (error) {
                console.error("Error initializing authentication state:", error);
            }
        };
        initializeAuthState();
    }, []); 


  // Error handling function for toasts
  const errorToast = (error: unknown) => {
    if (typeof error === "object" && error !== null && "message" in error) {
      toast.error((error as any).message);
    }
  };

  // Handle response errors (e.g., expired identity)
  const handleResponseError = (data: InterceptorErrorData) => {
    console.error("onResponseError", data.error);
    if (isIdentityExpiredError(data.error)) {
      toast.error("Login expired.");
      setTimeout(() => {
        clear(); 
        siwsClear(); 
        window.location.reload();
      }, 1000);
      return;
    }

    if (typeof data === "object" && data !== null && "message" in data) {
      errorToast(data); // Show toast error for other types of errors
    }
  };

  // Handle request before sending (optional)
  const handleRequest = (data: InterceptorRequestData) => {
    console.log("onRequest", data.args, data.methodName);
    return data.args;
  };

  return (
    <ActorProvider<_SERVICE>
      canisterId={canisterId}
      context={actorContext}
      identity={identity || siwsIdentityData || identityICP }
      idlFactory={idlFactory}
      onRequest={handleRequest}
      onRequestError={(error) => errorToast(error)}
      onResponseError={handleResponseError}
    >
      {children}
    </ActorProvider>
  );
}
