"use client";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Main from "@/components/Main/Main";
import React, { useEffect, useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import NewUser from "@/components/NewUser/NewUser";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  const getUser = useMutation(api.user.store);
  const [userId, setUserId] = useState<Doc<"user"> | null>(null);

  const asyncGetUser = async () => {
    setUserId(await getUser({ email: data!.user!.email! }));
  };

  useEffect(() => {
    if (data?.user?.email) {
      asyncGetUser();
    }
  }, [data]);
  console.log(data);
  if (data && userId) {
    return <Main />;
  } else {
    return <NewUser />;
  }
}
