import { Result, Variant, Vec, ic, query, text } from "azle/experimental";
import { UserProfile, profileStore } from "../models/user_profile_model";

const GetMyProfileResponse = Variant({
  Ok: UserProfile,
  Err: text,
});

const GetProfilesByLinkResponse = Variant({
  Ok: Vec(UserProfile),
  Err: text,
});


export type GetMyProfileResponse = typeof GetMyProfileResponse.tsType;
export type GetProfilesByLinkResponse = typeof GetProfilesByLinkResponse.tsType;


export const get_my_profile = query(
  [],
  GetMyProfileResponse,
  (): GetMyProfileResponse => {
    const callerAddress = ic.caller().toString(); 
    const profileOption = profileStore.get(callerAddress);
    
    if (profileOption === null) {
      return { Err: `Not Found` };
    }
    
    return { Ok: profileOption }; 
  }
);



export const getProfilesByLink = query(
  [text],
  GetProfilesByLinkResponse,
  (linkType: string): GetProfilesByLinkResponse => {
    
    const keys = profileStore.keys();

    const filteredProfiles = keys.reduce((acc, key) => {
      const profile = profileStore.get(key);

      if (profile !== null && profile.link === linkType) {
        acc.push(profile); 
      }

      return acc;
    }, [] as UserProfile[]);

    if (filteredProfiles.length > 0) {
      return { Ok: filteredProfiles };
    }

    return { Err: `No profiles found with link type: ${linkType}` };
  }
);