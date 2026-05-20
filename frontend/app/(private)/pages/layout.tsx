import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SidebarHeaderBar from "@/components/sidebar-header-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Navbar />
      <SidebarInset className="flex flex-col">
        <SidebarHeaderBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
