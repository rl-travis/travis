"use client";
import React from "react";
import Auth from "@/components/Auth/Auth";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading/Loading";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  if (data === undefined) {
    return <Loading />;
  } else if (data === null) {
    return <Auth />;
  } else {
    return <>{children}</>;
  }
}
