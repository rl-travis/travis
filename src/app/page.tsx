"use client";

import UploadWrapper from "@/components/Upload/UploadWrapper";
import { useMutation, useQuery } from "convex/react";
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
      {userId ? <Main /> : <NewUser />}
      {/*<UploadWrapper*/}
      {/*  onUpload={(s) => console.log(s)}*/}
      {/*  loading={<div>идет загрузка</div>}*/}
      {/*  multiple*/}
      {/*>*/}
      {/*  <div>123</div>*/}
      {/*</UploadWrapper>*/}
    </>
  );
}
