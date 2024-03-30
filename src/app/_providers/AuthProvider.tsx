"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Loading } from "@/6.shared";
import { AuthPage } from "@/2.pages";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  if (data === undefined) {
    return <Loading />;
  } else if (data === null) {
    return <AuthPage />;
  } else {
    return <>{children}</>;
  }
}
