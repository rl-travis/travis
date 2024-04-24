import { i18nType } from "../types";

export const en: i18nType = {
  id: 0,
  slug: "en",
  name: "English",
  chat: {
    placeholder: "Message...",
  },
  changeProfile: {
    crop: "Crop Avatar",
    create: "Create Profile",
    change: "Change Profile",
    btn: "Save",
    name: "Name*",
    about: "About",
    username: "Username*",
    rules: [
      "You can use symbols ",
      "a-z",
      ", ",
      "0-9",
      " and ",
      "underlines",
      "Minimum length is 5 symbols",
    ],
    language: "Language",
  },
  profile: {
    createTitle: "Create Profile",
    changeTitle: "Change Profile",
    name: "Name",
    about: "About",
    username: "Username",
    usernameRules: "You can use symbols",
    usernameLength: "Minimum length is 5 symbols",
    usernameSymbols: ["a-z", "0-9", "underlines"],
    and: "and",
    check: "checking",
    busy: "busy",
    free: "free",
    lang: "Language",
    createButton: "Next",
    changeButton: "Save",
  },
  settings: {
    profile: "My profile",
    language: "Language",
  },
  language: {
    ru: "Russian",
    en: "English",
  },
};
