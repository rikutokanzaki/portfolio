import { TogglePageBar } from "@/components/layouts/TogglePageBar";
import type { Metadata } from "next";
import { Cascadia_Code, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  weight: '600',
  variable: '--font-shippori-mincho',
  subsets: ['latin'],
});

const cascadiaCode = Cascadia_Code({
  weight: '400',
  variable: '--font-cascadia-code',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Rikuto Kanzaki - Portfolio",
  description: "Hi there! I'm Rikuto Kanzaki.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${shipporiMincho.variable} ${cascadiaCode.variable} h-full antialiased`}
    >
      <body className="w-full min-h-dvh">
        <div
          className="mx-auto w-full min-h-dvh"
          style={{ paddingBottom: "var(--toggle-page-bar-reserved)" }}
        >
          {children}
        </div>

        <div
          className="fixed inset-x-0 px-2 sm:px-4"
          style={{ bottom: "calc(var(--toggle-page-bar-offset) + var(--toggle-page-bar-safe-area))" }}
        >
          <div className="mx-auto w-full max-w-120">
            <TogglePageBar />
          </div>
        </div>
      </body>
    </html>
  );
}
