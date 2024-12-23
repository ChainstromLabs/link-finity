import { Tuple, Variant, Vec, nat8, query, text } from "azle/experimental";
import { UserProfile, profileStore } from "../models/user_profile_model";

export const ListProfilesResponse = Variant({
  Ok: Vec(Tuple(text, UserProfile)),
  Err: text,
});

export type ListProfilesResponse = typeof ListProfilesResponse.tsType;

export const list_profiles = query(
  [],
  ListProfilesResponse,
  (): ListProfilesResponse => {
    return { Ok: profileStore.items() };
  }
);
