"use client";
import React from "react";
import { useConvexAuth } from "convex/react";
import Auth from "@/components/Auth/Auth";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useConvexAuth();
  console.log(isAuthenticated);
  return (
    <>
      {!isLoading && isAuthenticated && <>{children}</>}
      {!isLoading && !isAuthenticated && <Auth />}
    </>
  );
}
