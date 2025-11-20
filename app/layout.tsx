import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edit-Comp",
  description: "Edit and export component",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} relative antialiased overflow-x-hidden`}
      >
        <Suspense fallback={<Loading />}>
          <Providers>
            <main className="h-full">{children}</main>
          </Providers>
        </Suspense>
        <Toaster closeButton richColors />
      </body>
    </html>
  );
}
