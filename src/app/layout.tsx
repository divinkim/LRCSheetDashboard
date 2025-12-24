import "@/css/satoshi.css";
import "@/css/style.css";
// import "./globals.css";
import "./fontawesome"; // 

import { Sidebar } from "@/components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "LRCSheet Admin",
  },
  description:
    "Tableau de bord administrateur",
  icons: {
    icon: "/images/logo/logo.png",
    shortcut: "/images/logo/logo.png",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen">
            {/* <Sidebar /> */}

            <div className="w-full h-full bg-gray-2 dark:bg-[#020d1a]">
              {/* <Header /> */}
              <main className="">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
