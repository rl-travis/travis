export type i18nType = {
  id: number;
  slug: string;
  name: string;
  chat: {
    placeholder: string;
  };
  changeProfile: {
    create: string;
    change: string;
    btn: string;
    name: string;
    about: string;
    username: string;
    rules: string[];
    language: string;
    crop: string;
  };
  profile: {
    createTitle: string;
    changeTitle: string;
    check: string;
    busy: string;
    free: string;
    name: string;
    about: string;
    username: string;
    usernameRules: string;
    usernameLength: string;
    usernameSymbols: string[];
    lang: string;
    createButton: string;
    changeButton: string;
    and: string;
  };
  settings: {
    profile: string;
    language: string;
    theme: string;
  };
  language: {
    ru: string;
    en: string;
  };
};

export type InternationalizationContextType = {
  id: number;
  setId: (id: number) => void;
};
