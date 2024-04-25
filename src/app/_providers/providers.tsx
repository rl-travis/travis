import React from "react";

import { ConvexClientProvider } from "./convex-client-provider";
import { InternationalizationProvider } from "./internationalization-provider";
import { NextAuthProvider } from "./next-auth-provider";
import { ThemeProviderTravis } from "./theme-provider-travis";

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
