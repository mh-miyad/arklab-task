"use client";

import {
  ThemeProvider as NextThemesProvider,
  type Attribute,
} from "next-themes";

export default function ThemeProvider({
  children,
  attribute,
  defaultTheme,
  enableSystem,
  disableTransitionOnChange,
}: {
  children: React.ReactNode;
  attribute: Attribute | Attribute[] | undefined;
  defaultTheme: string;
  enableSystem: boolean;
  disableTransitionOnChange: boolean;
}) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  );
}
