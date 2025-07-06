import ReduxProvider from "@/components/providers/ReduxProvider";
import NextAuthSessionProvider from "@/components/providers/SessionProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "ArkLab AI Agents Catalog - Professional AI Solutions",
  description:
    "Discover and explore our comprehensive catalog of AI agents designed to transform your business operations. From customer service to data analysis, find the perfect AI solution for your needs.",
  keywords:
    "AI agents, artificial intelligence, automation, business solutions, customer service, data analysis",
  authors: [{ name: "ArkLab" }],
  openGraph: {
    title: "ArkLab AI Agents Catalog",
    description: "Professional AI Solutions for Modern Business",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkLab AI Agents Catalog",
    description: "Professional AI Solutions for Modern Business",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthSessionProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
