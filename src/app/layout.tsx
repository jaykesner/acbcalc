import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ACB Calculator",
    template: "%s · ACB Calculator",
  },
  description:
    "Clinician tool to calculate anticholinergic burden, rank contributing medicines, and review lower-burden alternatives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <div className="site-shell flex min-h-screen flex-col py-6 sm:py-8">
          <SiteHeader />
          <main className="flex-1 py-6 sm:py-8">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
