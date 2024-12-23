//validate
import { ic } from "azle/experimental";
import { SIWE_PROVIDER_CANISTER, SIWS_PROVIDER_CANISTER } from "../provider/provider";

///GET ADDRRES SIWE
async function get_address_siwe() {
    if (!SIWE_PROVIDER_CANISTER) {
        throw new Error("SIWE_PROVIDER_CANISTER is not initialized");
    }

    const response = await ic.call(SIWE_PROVIDER_CANISTER.get_address, {
        args: [ic.caller().toUint8Array()],
    });

    if (response.Err) throw new Error(response.Err);
    if (!response.Ok) throw new Error("Failed to get the caller address");
    return response.Ok;
}

///GET ADDRRES SIWS
async function get_address_siws() {
    if (!SIWS_PROVIDER_CANISTER) {
        throw new Error("SIWS_PROVIDER_CANISTER is not initialized");
    }

    const response = await ic.call(SIWS_PROVIDER_CANISTER.get_address, {
        args: [ic.caller().toUint8Array()],
    });

    if (response.Err) throw new Error(response.Err);
    if (!response.Ok) throw new Error("Failed to get the caller address");
    return response.Ok;
}

// Function to resolve the address based on the typechain
export async function resolveAddress(typechain: string): Promise<string | null> {
    let address: string | null = null;
    // Cek jenis typechain
    if (typechain === "EVM") {
        address = await get_address_siwe();
    } else if (typechain === "SOLANA") {
        address = await get_address_siws();
    } else if (typechain === "ICP") {
        address = ic.caller().toString(); 
    } else {
        throw new Error(`Unsupported typechain: ${typechain}`);
    }
    if (!address) {
        throw new Error("Address resolution failed: Wallet address not found.");
    }
    return address;
}
