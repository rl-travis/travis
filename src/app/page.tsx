"use client";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Main from "@/components/Main/Main";
import React, { useEffect, useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import NewUser from "@/components/NewUser/NewUser";

export default function Home() {
  const userIdMutation = useMutation(api.user.store);

  const [userId, setUserId] = useState<Doc<"user"> | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      setUserId(await userIdMutation());
    };
    getUserId();
  }, [userIdMutation]);

  return <>{userId ? <Main /> : <NewUser />}</>;
}
