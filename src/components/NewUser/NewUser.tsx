import React from "react";
import styles from "./NewUser.module.scss";
import ChangeProfile from "@/components/ChangeProfile/ChangeProfile";
import { useInter } from "@/hooks/useInter";
import { ChangeProfileType } from "@/types/ChangeProfileType";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Loading from "@/components/Loading/Loading";
import { Doc } from "../../../convex/_generated/dataModel";
import DevUsers from "@/components/DevUsers/DevUsers";

export default function NewUser({
  email,
  setUser,
}: {
  email: string;
  setUser: React.Dispatch<React.SetStateAction<Doc<"user"> | null>>;
}) {
  const { i18n } = useInter();
  const [loading, setLoading] = React.useState(false);
  const createUser = useMutation(api.user.create);
  const addAvatar = useMutation(api.user_avatar.add);
  const getUser = useMutation(api.user.store);
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
    const user = await getUser({ email });
    setUser(user);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.wrapper}>
      <ChangeProfile done={onDone} title={i18n.changeProfile.create} />
      <DevUsers />
    </div>
  );
}
