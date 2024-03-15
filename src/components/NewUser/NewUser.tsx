"use client";
import React from "react";
import styles from "./NewUser.module.scss";
import ChangeProfile from "@/components/ChangeProfile/ChangeProfile";
import { useInter } from "@/hooks/useInter";
import { ChangeProfileType } from "@/types/ChangeProfileType";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";

export default function NewUser({ email }: { email: string }) {
  const { i18n } = useInter();
  const [loading, setLoading] = React.useState(false);
  const createUser = useMutation(api.user.create);
  const addAvatar = useMutation(api.user_avatar.add);
  const router = useRouter();
  const onDone = async (p: ChangeProfileType) => {
    setLoading(true);
    const user_id = await createUser({
      username: p.username,
      email,
      name: p.name,
      about: p.about,
      locales: i18n.id,
    });

    if (p.avatarDoc) {
      await addAvatar({
        image_id: p.avatarDoc._id,
        user_id,
      });
    }
    router.refresh();
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.wrapper}>
      <ChangeProfile done={onDone} title={i18n.changeProfile.create} />
    </div>
  );
}
