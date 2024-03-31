import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { NewUser } from "@/3.widgets";

export function NewUserPage({
  email,
  setUser,
}: {
  email: string;
  setUser: React.Dispatch<React.SetStateAction<Doc<"user"> | null>>;
}) {
  return <NewUser email={email} setUser={setUser}></NewUser>;
}
