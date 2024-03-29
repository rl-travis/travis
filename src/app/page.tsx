"use client";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Main from "@/components/Main/Main";
import React, { useEffect, useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading/Loading";
import NewUser from "@/components/NewUser/NewUser";

export default function Home() {
  const { data } = useSession();
  const getUser = useMutation(api.user.store);
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
  if (!data || loading) {
    return <Loading />;
  } else if (user) {
    return <Main user={user} />;
  } else {
    return <NewUser email={data.user!.email!} setUser={setUser} />;
  }
}
