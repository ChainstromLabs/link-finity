import { Canister, Variant, Vec, Principal, query, text, nat8 } from "azle/experimental";

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

// Canister untuk SIWE Provider
export const SiweProviderCanister = Canister({
  get_address: query([Vec(nat8)], GetAddressResponseSiwe),
});

// Canister untuk SIWS Provider
export const SiwsProviderCanister = Canister({
  get_address: query([Vec(nat8)], GetAddressResponseSiws),
});

// Inisialisasi Canister dengan Principal
export const SIWE_PROVIDER_CANISTER = SiweProviderCanister(
  Principal.fromText("be2us-64aaa-aaaaa-qaabq-cai")
);

export const SIWS_PROVIDER_CANISTER = SiwsProviderCanister(
  Principal.fromText("br5f7-7uaaa-aaaaa-qaaca-cai")
);

