"use client";

import Test from "@/components/Test";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Main from "@/components/Main/Main";
import { useEffect, useState } from "react";
import NewUser from "@/components/NewUser/NewUser";
import { Id } from "../../convex/_generated/dataModel";

export default function Home() {
  const userIdMutation = useMutation(api.user.store);

  const [userId, setUserId] = useState<Id<"user"> | null>();

  useEffect(() => {
    const getUserId = async () => {
      setUserId(await userIdMutation());
    };
    getUserId();
  }, [userIdMutation]);

  return (
    <>
      {userId ? (
        <Main />
      ) : (
        <>
          {/*<NewUser />*/}
          <Test />
        </>
      )}
    </>
  );
}
