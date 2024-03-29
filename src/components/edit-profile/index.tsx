import { ChangeProfileType } from "@/types/ChangeProfileType";
import styles from "./index.module.scss";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Textarea from "@/components/edit-profile/textarea";
import Rules from "@/components/edit-profile/rules";
import Checking from "@/components/edit-profile/checking";
import Switch from "@/components/edit-profile/switch";
import Avatar from "@/components/edit-profile/avatar";
import { useInter } from "@/6.shared";

export interface FormInterface {
  name: string;
  about: string;
  username: string;
  busy: boolean;
  avatar: string;
}

export default function EditProfile({
  username = "",
  about = "",
  name = "",
  avatar = "https://i.ibb.co/XbKhr5X/avatar.jpg",
  title,
  done,
}: {
  done: (profile: ChangeProfileType) => void;
  username?: string;
  name?: string;
  about?: string;
  avatar?: string;
  title: string;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<FormInterface>({
    defaultValues: {
      username,
      name,
      about,
      busy: !!username,
      avatar,
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
        <Switch />
        <input
          tabIndex={2}
          type="submit"
          value={i18n.changeProfile.btn}
          className={styles.submit}
          disabled={!isValid || watch("busy")}
        />
      </form>
    </section>
  );
}
