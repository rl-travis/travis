import React from "react";
import styles from "./component.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

import { FormInterface } from "../lib";
import { Checking } from "./checking";
import { Rules } from "./rules";
import { Switch } from "./switch";
import { Textarea } from "./textarea";

import { Avatar, EditProfileType } from "@/4.features";
import { useInter, useStore } from "@/6.shared";
export function EditProfile({
  username = "",
  about = "",
  name = "",
  avatar = "https://i.ibb.co/XbKhr5X/avatar.jpg",
  title,
  showLanguage,
  done,
}: {
  done: (profile: EditProfileType) => void;
  username?: string;
  name?: string;
  about?: string;
  avatar?: string;
  title: string;
  showLanguage?: boolean;
}) {
  const { user } = useStore();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<FormInterface>({
    defaultValues: {
      username: user ? user.username : "",
      name: user ? user.name : "",
      about: user ? user.about : "",
      busy: !!username,
      avatar: user ? user.avatar_url : "https://i.ibb.co/XbKhr5X/avatar.jpg",
    },
  });
  const { i18n } = useInter();

  const onSubmit: SubmitHandler<FormInterface> = (data) => {
    done({
      username: data.username,
      name: data.name,
      avatar: data.avatar,
      about: data.about,
    });
  };

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <Avatar avatar={avatar} setValue={setValue} i18n={i18n} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          title={i18n.changeProfile.name}
          label={"name"}
          register={register}
          maxLength={70}
          required={true}
          watch={watch}
        />
        <Textarea
          title={i18n.changeProfile.about}
          label={"about"}
          register={register}
          maxLength={52}
          watch={watch}
        />
        <div className={styles.username}>
          <Textarea
            minLength={5}
            title={i18n.changeProfile.username}
            label={"username"}
            register={register}
            maxLength={70}
            pattern={/^[a-z0-9_]*$/i}
            setValue={setValue}
            required={true}
            watch={watch}
          />
          <Checking watch={watch} username={username} i18n={i18n} setValue={setValue} />
          <Rules i18n={i18n} />
        </div>
        {showLanguage && <Switch />}

        <input
          type="submit"
          value={i18n.changeProfile.btn}
          className={styles.submit}
          disabled={!isValid || watch("busy")}
        />
      </form>
    </section>
  );
}
