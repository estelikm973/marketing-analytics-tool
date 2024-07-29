import SideNav from "@/components/Layout/SideNav";
import TopNav from "@/components/Layout/TopNav";
import { GlobalProvider } from "../GlobalProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProvider>
      <div className="flex bg-[#E8E8E8]">
        <SideNav />
        <div className="flex-1">
          <TopNav />
          {children}
        </div>
      </div>
    </GlobalProvider>
  );
}
