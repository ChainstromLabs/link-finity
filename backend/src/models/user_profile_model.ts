import { bool, Record, StableBTreeMap, text, Vec } from "azle/experimental";

const UserKey = text;

type UserKey = typeof UserKey.tsType;

export const SocialMedia = Record({
  platform: text,
  link: text
});

export const Tags = Record({
  icon: text,
  tags: text
});

export const Button = Record({
  name: text,
  icon: text,
  type_button: text,
  setting: bool,
  link: text,
});

export const UserProfile = Record({
  address: text,
  name: text,
  avatar_url: text,
  banner_url: text,
  typechain: text,
  link: text,
  bio: text,
  created_at: text,
  country: text,
  verified: bool,
  user_banned: bool,
  media_social: Vec(SocialMedia),
  button: Vec(Button),
  tags: Vec(Tags),

});

export type SocialMedia = typeof SocialMedia.tsType;

export type Button = typeof Button.tsType;

export type Tags = typeof Tags.tsType;

export type UserProfile = typeof UserProfile.tsType;

export let profileStore = StableBTreeMap<UserKey, UserProfile>(0);
