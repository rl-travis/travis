import React from "react";
import { NextAuthProvider } from "./next-auth-provider";
import { ConvexClientProvider } from "./convex-client-provider";
import { ThemeProviderTravis } from "./theme-provider-travis";
import { InternationalizationProvider } from "./internationalization-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ConvexClientProvider>
        <ThemeProviderTravis>
          <InternationalizationProvider>{children}</InternationalizationProvider>
        </ThemeProviderTravis>
      </ConvexClientProvider>
    </NextAuthProvider>
  );
}
