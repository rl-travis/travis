"use client";

import React, { useEffect, useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { useSession } from "next-auth/react";
import { Loading } from "@/6.shared";
import { useUser } from "@/5.entities";
import { MainPage, NewUserPage } from "@/2.pages";

export default function Home() {
  const { data } = useSession();
  const { store: getUser } = useUser();
  const [user, setUser] = useState<Doc<"user"> | null>(null);
  const [loading, setLoading] = useState(true);

  const asyncGetUser = async () => {
    const user = await getUser({ email: data!.user!.email! });
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    if (data?.user?.email) {
      asyncGetUser();
    }
  }, [data]);

  if (user) {
    return <MainPage user={user} />;
  } else if (data?.user?.email && !loading) {
    return <NewUserPage email={data.user.email} setUser={setUser} />;
  } else {
    return <Loading />;
  }
}
