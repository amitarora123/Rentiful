"use client";
import React, { useEffect, useRef, useState } from "react";
import { UserSidebar } from "@/components/User-Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { Menu } from "lucide-react";
import { useGetAuthUserQuery } from "@/store/api";
import { usePathname, useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const { isLoading: authLoading, data: authUser } = useGetAuthUserQuery();
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();

      if (userRole === "manager" && pathname.startsWith("/tenant")) {
        router.replace("/manager/properties");
      } else if (userRole === "tenant" && pathname.startsWith("/manager")) {
        router.replace("/tenant/favorites");
      } else {
        setIsLoading(false);
      }
    }
  }, [isLoading, authLoading, authUser, router, pathname]);

  if (isLoading || authLoading) {
    return <div>Loading.....</div>;
  }
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Header>
        <div className="z-50 md:hidden" onClick={() => ref.current?.click()}>
          <Menu className="text-primary-400" />
          <SidebarTrigger className="hidden" ref={ref} />
        </div>
      </Header>
      <UserSidebar />
      <SidebarInset>
        <div className="mt-15" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
