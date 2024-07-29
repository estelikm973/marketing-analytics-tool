import TopNav from "@/components/Layout/TopNav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-[#E8E8E8]">
      <div className="flex-1">
        <TopNav />
        {children}
      </div>
    </div>
  );
}
