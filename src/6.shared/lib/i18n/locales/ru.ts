import { i18nType } from "../types";
export const ru: i18nType = {
  id: 1,
  slug: "ru",
  name: "Русский",
  chat: {
    placeholder: "Сообщение...",
  },
  changeProfile: {
    crop: "Кадрировать Аватарку",
    create: "Создать Профиль",
    change: "Изменить Профиль",
    btn: "Сохранить",
    name: "Имя*",
    about: "О себе",
    username: "Имя пользователя*",
    rules: [
      "Вы можете использовать символы ",
      "a-z",
      ", ",
      "0-9",
      " и ",
      "подчеркивания",
      "Минимальная длина - 5 символов",
    ],
    language: "Язык",
  },
  profile: {
    createTitle: "Создание профиля",
    changeTitle: "Изменение профиля",
    name: "Имя",
    about: "О себе",
    username: "Имя пользователя",
    usernameRules: "Вы можете использовать",
    and: "и",
    check: "проверка",
    busy: "занят",
    free: "свободен",
    usernameSymbols: ["a-z", "0-9", "подчеркивания"],
    usernameLength: "Минимальная длина 5 символов",
    lang: "Язык",
    createButton: "Далее",
    changeButton: "Сохранить",
  },
  settings: {
    profile: "Мой профиль",
    language: "Язык",
  },
  language: {
    ru: "Русский",
    en: "Английский",
  },
};
