"use client";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexProvider, ConvexReactClient } from "convex/react";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export default function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexProvider client={convex}>
      {/*<ConvexProviderWithClerk client={convex} useAuth={useAuth}>*/}
      {children}
      {/*</ConvexProviderWithClerk>*/}
    </ConvexProvider>
  );
}
