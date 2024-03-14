"use client";
import styles from "./NewUser.module.scss";
import ChangeProfile from "@/components/ChangeProfile/ChangeProfile";
import { ChangeProfileType } from "@/types/ChangeProfileType";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import React from "react";
import Loading from "@/components/Loading/Loading";

export default function NewUser() {
  const [loading, setLoading] = React.useState(false);
  const createUser = useMutation(api.user.create);
  const uploadAvatar = useMutation(api.user_avatar.add);
  const router = useRouter();
  async function onDone(info: ChangeProfileType) {
    setLoading(true);
    const user_id = await createUser({
      name: info.name,
      locales: info.locales,
      about: info.about,
      username: info.username,
    });

    if (info.avatar_id) {
      await uploadAvatar({
        image_id: info.avatar_id,
        user_id,
      });
    }

    router.push("/");
  }

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loading />
      ) : (
        <ChangeProfile
          username=""
          avatar=""
          name=""
          about=""
          isCreate={true}
          onDone={onDone}
        />
      )}
    </div>
  );
}
