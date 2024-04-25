"use client";

import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { AuthPage, MainPage, NewUserPage } from "@/2.pages";

import { useUser } from "@/5.entities";

import { Loading, useInter, useUserStore } from "@/6.shared";

export default function Home() {
  const { data } = useSession();
  const { store: getUser } = useUser();

  const { user, setUser } = useUserStore();
  const { switchLang } = useInter();
  const [loading, setLoading] = useState(true);

  const asyncGetUser = async () => {
    const user = await getUser({ email: data!.user!.email! });
    if (user) switchLang(user.locales);
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    if (data === undefined) {
      setLoading(true);
    } else if (data === null) {
      setLoading(false);
    } else {
      asyncGetUser();
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (data === null) {
    return <AuthPage setLoading={setLoading} />;
  }

  if (user === null) {
    return <NewUserPage email={data.user!.email!} />;
  }

  if (user) {
    return <MainPage user={user} />;
  }
}
