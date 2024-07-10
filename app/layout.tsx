import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "@/components/Layout/SideNav";
import TopNav from "@/components/Layout/TopNav";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GlobalProvider } from "./GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketing Analytics Tool",
  description: "Marketing Analytics and Reporting Tool with API Connectors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <div className="flex bg-[#E8E8E8]">
            <SideNav />
            <div className="flex-1">
              <TopNav />
              {children}
            </div>
          </div>
        </GlobalProvider>
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ""} />
    </html>
  );
}
