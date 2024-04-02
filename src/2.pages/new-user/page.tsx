import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";

import { NewUser } from "@/3.widgets";

export function NewUserPage({
  email,
  setUser,
}: {
  email: string;
  setUser: (user: Doc<"user"> | null) => void;
}) {
  return <NewUser email={email} setUser={setUser} />;
}
