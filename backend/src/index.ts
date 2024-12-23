import { Canister, Variant, Vec, Principal, query, text, nat8, ic } from "azle/experimental";
import { SIWE_PROVIDER_CANISTER, SIWS_PROVIDER_CANISTER } from "./provider/provider";

// Definisikan tipe Address
const Address = text;

// Response untuk get_address dari SIWE
const GetAddressResponseSiwe = Variant({
  Ok: Address,
  Err: text,
});

// Response untuk get_address dari SIWS
const GetAddressResponseSiws = Variant({
  Ok: Address,
  Err: text,
});


import { get_my_profile, getProfilesByLink } from "./service/get_my_profile";
import { list_profiles } from "./service/list_profiles";
import { save_my_profile } from "./service/save_my_profile";


async function getStatusProvider() {
  if (!SIWE_PROVIDER_CANISTER || !SIWS_PROVIDER_CANISTER) {
    return "One or more provider canisters are not initialized!";
  }

  return "Both provider canisters are initialized and ready!";
}


export default Canister({

  getStatusProvider: query([], text, async () => {
    try {
      const status = await getStatusProvider(); 
      return status; 
    } catch (error) {
      return `Error`;
    }
  }),

  // get_my_profile,
  // getProfilesByLink,
  save_my_profile,
  // list_profiles,
});

