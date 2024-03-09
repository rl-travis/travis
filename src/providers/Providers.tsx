import ConvexClientProvider from "@/providers/ConvexClientProvider";
import ThemeProviderTravis from "@/providers/ThemeProviderTravis";
import InternationalizationProvider from "@/providers/InternationalizationProvider";
import AuthProvider from "@/providers/AuthProvider";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <ThemeProviderTravis>
        <InternationalizationProvider>
          <AuthProvider>{children}</AuthProvider>
        </InternationalizationProvider>
      </ThemeProviderTravis>
    </ConvexClientProvider>
  );
}
