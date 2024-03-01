"use client";
import React from "react";
import { useConvexAuth } from "convex/react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useConvexAuth();
  return <>{isAuthenticated ? <>{children}</> : <div></div>}</>;
}
