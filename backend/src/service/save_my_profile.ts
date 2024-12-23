import { UserProfile, profileStore, SocialMedia, Button, Tags } from "../models/user_profile_model";
import { Variant, ic, text, update, Vec } from "azle/experimental";
import { resolveAddress } from "./auth";

const SaveMyProfileResponse = Variant({
    Ok: UserProfile,
    Err: text,
});

export type SaveMyProfileResponse = typeof SaveMyProfileResponse.tsType;

function validateParameters(typechain: string, link: string): string | null {
    
    if (!typechain) {
        return "Missing required parameters: name, avatar_url, or typechain.";
    }

    const invalidLinkPattern = /[^a-z0-9]/;

    if (invalidLinkPattern.test(link)) {
        return "The link contains invalid characters. Only lowercase letters and numbers are allowed.";
    }

    if (link !== link.toLowerCase()) {
        return "The link must be in lowercase letters.";
    }

    return null;
}

function findExistingProfile(link: string, address: string | null) {
    return profileStore.values().find(
        (profile) => profile.link === link || profile.address === address
    );
}

function createProfile(address: string, fields: Omit<UserProfile, "address">): UserProfile {
    return { address, ...fields };
}

function updateExistingProfile(existingProfile: UserProfile, fields: Partial<UserProfile>): UserProfile {
    return { ...existingProfile, ...fields };
}

const MIN_BUTTON_COUNT = 15;
const MIN_MEDIA_SOCIAL_COUNT = 10;
const MIN_TAGS_COUNT = 4;

const rateLimitMap = new Map<string, number>();

function isRateLimited(caller: string): boolean {
    const now = Date.now();
    const lastCall = rateLimitMap.get(caller) || 0;
    if (now - lastCall < 60000) {  
        return true;
    }
    rateLimitMap.set(caller, now);
    return false;
}

export const save_my_profile = update(
    [text, text, text, text, text, text, text, text, Vec(Button), Vec(SocialMedia), Vec(Tags)],
    SaveMyProfileResponse,
    async (
        name, avatar_url, banner_url, typechain, link, bio, country, media_social_json, button_json, tags_json
    ): Promise<SaveMyProfileResponse> => {
        try {

            if (isRateLimited(ic.caller().toString())) {
                return { Err: "Rate limit exceeded. Please wait before retrying." };
            }

            const error = validateParameters(typechain, link);
            if (error) return { Err: error };

            const media_social: SocialMedia[] = typeof media_social_json === 'string' ? JSON.parse(media_social_json) : media_social_json;
            const button: Button[] = typeof button_json === 'string' ? JSON.parse(button_json) : button_json;
            const tags: Tags[] = typeof tags_json === 'string' ? JSON.parse(tags_json) : tags_json;

            if (button.length < MIN_BUTTON_COUNT) {
                return { Err: `The 'button' array must contain at least ${MIN_BUTTON_COUNT} items.` };
            }
            if (media_social.length < MIN_MEDIA_SOCIAL_COUNT) {
                return { Err: `The 'media_social' array must contain at least ${MIN_MEDIA_SOCIAL_COUNT} items.` };
            }
            if (tags.length < MIN_TAGS_COUNT) {
                return { Err: `The 'tags' array must contain at least ${MIN_TAGS_COUNT} items.` };
            }

            const address = await resolveAddress(typechain);
            const existingProfile = findExistingProfile(link, address);
            const currentTimestamp = new Date().toISOString();
            
            if (existingProfile) {
                const updatedProfile = updateExistingProfile(existingProfile, {
                    name,
                    avatar_url,
                    banner_url,
                    typechain,
                    link,
                    bio,
                    created_at: existingProfile.created_at,
                    country,
                    verified: existingProfile.verified,
                    user_banned: existingProfile.user_banned,
                    media_social,
                    button,
                    tags
                });

                profileStore.insert(ic.caller().toString(), updatedProfile);
                return { Ok: updatedProfile };
            }

            const profile = createProfile(address!, {
                name,
                avatar_url,
                banner_url,
                typechain,
                link,
                bio,
                created_at: currentTimestamp, 
                country,
                verified: false,
                user_banned: false,
                media_social,
                button,
                tags
            });

            profileStore.insert(ic.caller().toString(), profile);
            return { Ok: profile };
        } catch (error) {
            console.error("Error in save_my_profile:", error);
            return { Err: error instanceof Error ? error.message : "An unknown error occurred while saving profile." };
        }
    }
);



// const mediaSocial = JSON.stringify([
//     { platform: "facebook", link: "https://facebook.com/johndoe" },
//     { platform: "twitter", link: "https://twitter.com/johndoe" },
//     { platform: "instagram", link: "https://instagram.com/johndoe" }
// ]);

// await save_my_profile(name, avatar_url, banner_url, typechain, link, bio, mediaSocial);

