import ConvexClientProvider from "@/app/_providers/convex-client-provider";
import ThemeProviderTravis from "@/app/_providers/theme-provider-travis";
import InternationalizationProvider from "@/app/_providers/internationalization-provider";
import { NextAuthProvider } from "@/app/_providers/next-auth-provider";

import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
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
