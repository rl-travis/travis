import React from "react";

import styles from "./component.module.scss";

import { EditProfile, EditProfileType } from "@/4.features";

import { useUser, useUserAvatar } from "@/5.entities";

import { Loading, useInter, useUserStore } from "@/6.shared";

export function NewUser({ email }: { email: string }) {
  const { i18n } = useInter();
  const [loading, setLoading] = React.useState(false);

  const { create: createUser, store: getUser } = useUser();
  const { add: addAvatar } = useUserAvatar();

  const { setUser } = useUserStore();
  const onDone = async (p: EditProfileType) => {
    setLoading(true);
    const user_id = await createUser({
      username: p.username,
      email,
      name: p.name,
      about: p.about,
      locales: i18n.id,
    });

    await addAvatar({
      url: p.avatar,
      user_id,
    });
    const user = await getUser({ email });
    setUser(user);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapper}>
      <EditProfile done={onDone} title={i18n.changeProfile.create} />
    </div>
  );
}
