import type { Metadata } from "next";
import { Roboto_Mono, Shippori_Mincho } from "next/font/google";
import { TogglePageBar } from "@/components/layouts/TogglePageBar";
import "./globals.css";

const shipporiMincho = Shippori_Mincho({
  weight: "600",
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  weight: "400",
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rikuto Kanzaki | Portfolio",
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
      className={`${shipporiMincho.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-dvh w-full">
        <div
          className="mx-auto min-h-dvh w-full"
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
