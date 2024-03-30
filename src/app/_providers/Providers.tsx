import ConvexClientProvider from "@/app/_providers/ConvexClientProvider";
import ThemeProviderTravis from "@/app/_providers/ThemeProviderTravis";
import InternationalizationProvider from "@/app/_providers/InternationalizationProvider";
import AuthProvider from "@/app/_providers/AuthProvider";
import React from "react";
import { NextAuthProvider } from "@/app/_providers/NextAuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ConvexClientProvider>
        <ThemeProviderTravis>
          <InternationalizationProvider>
            <AuthProvider>{children}</AuthProvider>
          </InternationalizationProvider>
        </ThemeProviderTravis>
      </ConvexClientProvider>
    </NextAuthProvider>
  );
}
