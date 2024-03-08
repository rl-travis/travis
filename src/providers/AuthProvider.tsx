"use client";
import React from "react";
import { useConvexAuth } from "convex/react";
import Auth from "@/components/Auth/Auth";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useConvexAuth();
  console.log(isAuthenticated);
  return <>{isAuthenticated ? <>{children}</> : <Auth />}</>;
}
